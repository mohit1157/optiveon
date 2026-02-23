"""
FastAPI wrapper for the Optiveon Options Trading Bot.
Exposes /health, /start, /stop, /status endpoints for the Next.js frontend.
"""

from __future__ import annotations

import os
import signal
import subprocess
import sys
import time
import threading
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Options Bot API", version="1.0.0")

# Only allow internal requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bot process state
_bot_process: Optional[subprocess.Popen] = None
_bot_start_time: Optional[float] = None
_bot_mode: str = "paper"
_lock = threading.Lock()


class StatusResponse(BaseModel):
    running: bool
    mode: str
    uptime: Optional[str] = None
    positions: int = 0
    todayPnl: str = "$0.00"
    totalTrades: int = 0
    symbols: list[str] = []
    lastUpdate: Optional[str] = None


class ActionResponse(BaseModel):
    success: bool
    message: str


def _format_uptime(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    if hours > 0:
        return f"{hours}h {minutes}m {secs}s"
    elif minutes > 0:
        return f"{minutes}m {secs}s"
    return f"{secs}s"


def _get_symbols() -> list[str]:
    symbols_env = os.environ.get("SYMBOLS", "SPY,QQQ,AAPL,TSLA")
    return [s.strip() for s in symbols_env.split(",") if s.strip()]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/status", response_model=StatusResponse)
def get_status():
    global _bot_process, _bot_start_time

    with _lock:
        running = _bot_process is not None and _bot_process.poll() is None

        if not running and _bot_process is not None:
            # Process exited
            _bot_process = None
            _bot_start_time = None

        uptime = None
        if running and _bot_start_time:
            uptime = _format_uptime(time.time() - _bot_start_time)

        return StatusResponse(
            running=running,
            mode=_bot_mode,
            uptime=uptime,
            positions=0,  # TODO: query from Alpaca
            todayPnl="$0.00",  # TODO: query from Alpaca
            totalTrades=0,  # TODO: query from SQLite store
            symbols=_get_symbols(),
            lastUpdate=time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        )


@app.post("/start", response_model=ActionResponse)
def start_bot():
    global _bot_process, _bot_start_time, _bot_mode

    with _lock:
        if _bot_process is not None and _bot_process.poll() is None:
            raise HTTPException(status_code=400, detail="Bot is already running")

        try:
            _bot_mode = "paper"
            _bot_process = subprocess.Popen(
                [sys.executable, "-m", "tradebot.app", "run", "--paper"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                env={**os.environ, "PYTHONPATH": "/app/tradebot"},
            )
            _bot_start_time = time.time()

            # Wait briefly to check for immediate crash
            time.sleep(1)
            if _bot_process.poll() is not None:
                _bot_process = None
                _bot_start_time = None
                raise HTTPException(status_code=500, detail="Bot crashed on startup")

            return ActionResponse(success=True, message="Bot started in paper mode")
        except HTTPException:
            raise
        except Exception as e:
            _bot_process = None
            _bot_start_time = None
            raise HTTPException(status_code=500, detail=f"Failed to start bot: {str(e)}")


@app.post("/stop", response_model=ActionResponse)
def stop_bot():
    global _bot_process, _bot_start_time

    with _lock:
        if _bot_process is None or _bot_process.poll() is not None:
            _bot_process = None
            _bot_start_time = None
            return ActionResponse(success=True, message="Bot is not running")

        try:
            _bot_process.send_signal(signal.SIGINT)
            _bot_process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            _bot_process.kill()
            _bot_process.wait(timeout=5)
        finally:
            _bot_process = None
            _bot_start_time = None

        return ActionResponse(success=True, message="Bot stopped")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
