import { Stat } from "@/types";

export const heroStats: Stat[] = [
  { value: "99.9%", label: "System Uptime" },
  { value: "<10ms", label: "Latency" },
  { value: "24/7", label: "Market Coverage" },
];

export const heroCode = `from optiveon import MarketAnalyzer

# Initialize real-time analyzer
analyzer = MarketAnalyzer(
    markets=["futures", "options", "forex"],
    strategy="momentum_alpha"
)

# Generate trading signals
signals = analyzer.get_signals(
    timeframe="1h",
    confidence_threshold=0.85
)

for signal in signals:
    print(f"📊 {signal.asset}: {signal.action}")
    print(f"   Confidence: {signal.score:.2%}")`;

export const interestOptions = [
  { value: "market-research", label: "Market Research Platform" },
  { value: "signal-generation", label: "Signal Generation Suite" },
  { value: "enterprise-api", label: "Enterprise API" },
  { value: "custom-solution", label: "Custom Solution" },
  { value: "general", label: "General Inquiry" },
];

export const companyInfo = {
  name: "Optiveon LLC",
  address: {
    street: "5900 Balcones Drive",
    suite: "Suite 100",
    city: "Austin",
    state: "TX",
    zip: "78731",
    full: "5900 Balcones Drive, Suite 100, Austin, TX 78731",
  },
  email: "info@optiveon.com",
  copyright: `© ${new Date().getFullYear()} Optiveon LLC. All rights reserved.`,
};

export const riskDisclaimer =
  "Trading in financial markets involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. The information provided by Optiveon LLC is for research and educational purposes only and should not be construed as investment advice. Optiveon LLC does not provide investment advisory services. Always consult with a qualified financial advisor before making investment decisions.";
