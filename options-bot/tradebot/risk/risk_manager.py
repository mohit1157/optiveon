from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, date, timezone
from math import floor
from typing import Optional

@dataclass
class RiskManager:
    max_daily_loss_usd: float
    max_position_value_usd: float
    risk_per_trade_pct: float
    stop_loss_pct: float
    take_profit_pct: float
    max_trades_per_day: int = 10
    _daily_start_equity: Optional[float] = field(default=None, init=False, repr=False)
    _daily_start_date: Optional[date] = field(default=None, init=False, repr=False)
    _daily_trade_count: int = field(default=0, init=False, repr=False)
    _daily_trade_count_date: Optional[date] = field(default=None, init=False, repr=False)

    def position_value_ok(self, proposed_value_usd: float) -> bool:
        return proposed_value_usd <= self.max_position_value_usd

    def calc_qty(self, equity_usd: float, price: float) -> float:
        # Risk-based sizing: risk_per_trade_pct of equity / stop distance
        if price <= 0:
            return 0.0
        risk_budget = equity_usd * self.risk_per_trade_pct
        stop_distance = price * self.stop_loss_pct
        if stop_distance <= 0:
            return 0.0
        qty = risk_budget / stop_distance
        # Also cap by max position value
        max_qty_by_value = self.max_position_value_usd / price
        return float(max(0.0, min(qty, max_qty_by_value)))

    def bracket_prices(self, entry_price: float, side: str) -> tuple[float, float]:
        # For buy: SL below, TP above. For sell (short): inverse.
        if side.lower() == "buy":
            sl = entry_price * (1.0 - self.stop_loss_pct)
            tp = entry_price * (1.0 + self.take_profit_pct)
        else:
            sl = entry_price * (1.0 + self.stop_loss_pct)
            tp = entry_price * (1.0 - self.take_profit_pct)
        return (round(sl, 4), round(tp, 4))

    def calc_option_qty(
        self,
        equity_usd: float,
        premium: float,
        *,
        portfolio_pct: Optional[float] = None,
        contract_multiplier: int = 100,
    ) -> int:
        """Calculate options contract quantity based on risk and premium.

        If portfolio_pct is provided, size by that portion of equity.
        Otherwise uses risk_per_trade_pct and max_position_value_usd to cap exposure.
        """
        if premium <= 0 or contract_multiplier <= 0:
            return 0

        if portfolio_pct is not None:
            if portfolio_pct <= 0 or portfolio_pct > 1:
                return 0
            risk_budget = equity_usd * portfolio_pct
        else:
            risk_budget = equity_usd * self.risk_per_trade_pct
        cost_per_contract = premium * contract_multiplier

        if cost_per_contract <= 0:
            return 0

        max_qty_by_risk = risk_budget / cost_per_contract
        if portfolio_pct is not None:
            qty = max_qty_by_risk
        else:
            max_qty_by_value = self.max_position_value_usd / cost_per_contract
            qty = min(max_qty_by_risk, max_qty_by_value)
        return max(0, int(floor(qty)))

    # --- Trade count limiter (#5) ---

    def record_trade(self, now: Optional[datetime] = None) -> None:
        """Record a trade execution for daily counting."""
        if now is None:
            now = datetime.now(timezone.utc)
        today = now.date()
        if self._daily_trade_count_date != today:
            self._daily_trade_count_date = today
            self._daily_trade_count = 0
        self._daily_trade_count += 1

    def max_trades_exceeded(self, now: Optional[datetime] = None) -> bool:
        """Check if the max daily trade limit has been reached."""
        if now is None:
            now = datetime.now(timezone.utc)
        today = now.date()
        if self._daily_trade_count_date != today:
            return False
        return self._daily_trade_count >= self.max_trades_per_day

    # --- Daily loss tracker (#6 — with optional persistence) ---

    def daily_loss_exceeded(
        self,
        current_equity_usd: float,
        now: Optional[datetime] = None,
    ) -> bool:
        """Check if max daily loss has been exceeded.

        Tracks the starting equity for each UTC day and compares against current equity.
        """
        if now is None:
            now = datetime.now(timezone.utc)

        today = now.date()
        if self._daily_start_date != today or self._daily_start_equity is None:
            self._daily_start_date = today
            self._daily_start_equity = current_equity_usd
            return False

        loss = self._daily_start_equity - current_equity_usd
        return loss >= self.max_daily_loss_usd

    def persist_state(self, store) -> None:
        """Persist daily risk state to store so it survives restarts."""
        try:
            store.upsert_calibration(
                strategy="__risk_manager__",
                last_calibrated_at=datetime.now(timezone.utc),
                params={
                    "daily_start_equity": self._daily_start_equity,
                    "daily_start_date": str(self._daily_start_date) if self._daily_start_date else None,
                    "daily_trade_count": self._daily_trade_count,
                    "daily_trade_count_date": str(self._daily_trade_count_date) if self._daily_trade_count_date else None,
                },
            )
        except Exception:
            pass  # Best-effort

    def restore_state(self, store) -> None:
        """Restore daily risk state from store after restart."""
        try:
            data = store.get_last_calibration(strategy="__risk_manager__")
            if data and data.get("params"):
                params = data["params"]
                if params.get("daily_start_date"):
                    self._daily_start_date = date.fromisoformat(params["daily_start_date"])
                    self._daily_start_equity = params.get("daily_start_equity")
                if params.get("daily_trade_count_date"):
                    self._daily_trade_count_date = date.fromisoformat(params["daily_trade_count_date"])
                    self._daily_trade_count = params.get("daily_trade_count", 0)
        except Exception:
            pass  # Best-effort

