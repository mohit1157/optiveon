export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface MarketSnapshot {
  ok: boolean;
  provider: string;
  updatedAt: string;
  items: MarketQuote[];
  error?: string;
}

const DEFAULT_TICKERS = ["SPY", "QQQ", "GLD", "USO"];
const NAME_MAP: Record<string, string> = {
  SPY: "S&P 500 ETF",
  QQQ: "Nasdaq 100 ETF",
  GLD: "Gold",
  USO: "Crude Oil",
};

const CACHE_TTL_MS = 60_000;

function getTickers() {
  const raw = process.env.MARKET_DATA_TICKERS;
  if (!raw) return DEFAULT_TICKERS;
  return raw
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 6);
}

function normalizeName(symbol: string) {
  return NAME_MAP[symbol] || symbol;
}

function createSnapshot(
  provider: string,
  items: MarketQuote[],
  error?: string
): MarketSnapshot {
  return {
    ok: items.length > 0 && !error,
    provider,
    updatedAt: new Date().toISOString(),
    items,
    error,
  };
}

async function fetchAlphaVantageQuote(
  symbol: string,
  apiKey: string
): Promise<MarketQuote | null> {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
    symbol
  )}&apikey=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, { cache: "no-store" });
  const data = (await response.json()) as {
    ["Global Quote"]?: Record<string, string>;
    Note?: string;
    ["Error Message"]?: string;
  };

  if (!data || data.Note || data["Error Message"]) {
    return null;
  }

  const quote = data["Global Quote"];
  if (!quote) return null;

  const price = Number(quote["05. price"]);
  const change = Number(quote["09. change"]);
  const changePercent = Number(
    (quote["10. change percent"] || "0").replace("%", "")
  );

  if (Number.isNaN(price)) return null;

  return {
    symbol,
    name: normalizeName(symbol),
    price,
    change: Number.isNaN(change) ? 0 : change,
    changePercent: Number.isNaN(changePercent) ? 0 : changePercent,
  };
}

async function fetchPolygonQuote(
  symbol: string,
  apiKey: string
): Promise<MarketQuote | null> {
  const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(
    symbol
  )}/prev?adjusted=true&apiKey=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, { cache: "no-store" });
  const data = (await response.json()) as {
    results?: Array<{ c: number; o: number }>;
    status?: string;
    error?: string;
  };

  const result = data.results?.[0];
  if (!result || typeof result.c !== "number" || typeof result.o !== "number") {
    return null;
  }

  const price = result.c;
  const change = result.c - result.o;
  const changePercent = result.o ? (change / result.o) * 100 : 0;

  return {
    symbol,
    name: normalizeName(symbol),
    price,
    change,
    changePercent,
  };
}

export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  const provider =
    (process.env.MARKET_DATA_PROVIDER || "alphavantage").toLowerCase() || "alphavantage";

  const cacheKey = "__market_snapshot_cache__";
  const cached = (globalThis as typeof globalThis & {
    [key: string]: { data: MarketSnapshot; expiresAt: number } | undefined;
  })[cacheKey];

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const tickers = getTickers();

  try {
    let items: MarketQuote[] = [];

    if (provider === "polygon") {
      const apiKey = process.env.POLYGON_API_KEY;
      if (!apiKey) {
        return createSnapshot(provider, [], "Missing POLYGON_API_KEY");
      }

      const results = await Promise.all(
        tickers.map((symbol) => fetchPolygonQuote(symbol, apiKey))
      );
      items = results.filter((item): item is MarketQuote => Boolean(item));
    } else {
      const apiKey = process.env.ALPHAVANTAGE_API_KEY;
      if (!apiKey) {
        return createSnapshot(provider, [], "Missing ALPHAVANTAGE_API_KEY");
      }

      const results = await Promise.all(
        tickers.map((symbol) => fetchAlphaVantageQuote(symbol, apiKey))
      );
      items = results.filter((item): item is MarketQuote => Boolean(item));
    }

    const snapshot = createSnapshot(provider, items);

    (globalThis as typeof globalThis & {
      [key: string]: { data: MarketSnapshot; expiresAt: number } | undefined;
    })[cacheKey] = {
      data: snapshot,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return snapshot;
  } catch (error) {
    const snapshot = createSnapshot(
      provider,
      [],
      error instanceof Error ? error.message : "Market data unavailable"
    );

    (globalThis as typeof globalThis & {
      [key: string]: { data: MarketSnapshot; expiresAt: number } | undefined;
    })[cacheKey] = {
      data: snapshot,
      expiresAt: Date.now() + 15_000,
    };

    return snapshot;
  }
}
