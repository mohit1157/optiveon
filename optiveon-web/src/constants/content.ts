import { Stat } from "@/types";

export const heroStats: Stat[] = [
  { value: "42", label: "Strategies Under Validation" },
  { value: "18", label: "Global Markets & Venues" },
  { value: "<12ms", label: "Median Signal Pipeline Latency" },
];

export const heroCode = `from optiveon import StrategyPipeline

# Build a production-grade research to execution pipeline
pipeline = StrategyPipeline(
    assets=["equities", "futures", "fx", "crypto"],
    regime_model="adaptive_volatility",
    risk_profile="institutional"
)

# Validate before deployment
report = pipeline.validate(
    in_sample="2018-2022",
    out_of_sample="2023-2025",
    max_drawdown=0.08
)

if report.status == "approved":
    deployment = pipeline.deploy(mode="paper_or_live")`;

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
