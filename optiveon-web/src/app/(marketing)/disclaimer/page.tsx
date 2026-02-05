import { Metadata } from "next";
import { companyInfo } from "@/constants/content";

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description:
    "Important risk disclosure for trading in financial markets using Optiveon services.",
};

export default function DisclaimerPage() {
  return (
    <section className="py-[160px] min-h-screen">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-lg">Risk Disclaimer</h1>
        <p className="text-foreground-muted text-sm mb-3xl">
          Last Updated: January 2024
        </p>

        {/* Warning Box */}
        <div className="bg-error/10 border border-error/30 rounded-lg p-xl mb-3xl">
          <h3 className="text-error font-semibold mb-md">
            Important Risk Warning
          </h3>
          <p className="text-foreground leading-relaxed">
            Trading in financial instruments, including futures, options, and
            forex, involves substantial risk of loss and is not suitable for all
            investors. You should carefully consider whether trading is
            appropriate for you in light of your financial condition. The high
            degree of leverage that is often obtainable in trading can work
            against you as well as for you. Past performance is not indicative
            of future results.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <Section title="1. General Risk Disclosure">
            <p>
              The information and tools provided by Optiveon LLC
              (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) are intended for research and educational
              purposes only. Our services include market analysis tools,
              algorithmic research platforms, and signal generation systems
              designed to assist with market research.
            </p>
            <p className="font-semibold mt-md">
              Before using our services or making any investment decisions, you
              should understand the following:
            </p>
          </Section>

          <Section title="2. No Investment Advice">
            <p>
              Optiveon LLC does not provide investment advice, financial advice,
              legal advice, or tax advice. Our services are not intended to be,
              and should not be construed as:
            </p>
            <ul>
              <li>
                A recommendation to buy, sell, or hold any financial instrument
              </li>
              <li>An offer or solicitation to buy or sell securities</li>
              <li>
                Personalized investment advice based on your circumstances
              </li>
              <li>A substitute for professional financial advice</li>
            </ul>
          </Section>

          <Section title="3. Trading Risks">
            <Subsection title="3.1 Risk of Loss">
              <p>
                Trading in futures, options, and forex markets carries a high
                level of risk and may not be suitable for all investors. There
                is a possibility that you could sustain a loss of some or all of
                your initial investment. You should not invest money that you
                cannot afford to lose.
              </p>
            </Subsection>

            <Subsection title="3.2 Leverage Risk">
              <p>
                The use of leverage in trading can magnify both gains and
                losses. While leverage can increase potential returns, it also
                significantly increases risk. A relatively small market movement
                can have a proportionately larger impact on the funds you have
                deposited or will have to deposit.
              </p>
            </Subsection>

            <Subsection title="3.3 Market Risk">
              <p>Financial markets are subject to various risks including:</p>
              <ul>
                <li>Market volatility and rapid price changes</li>
                <li>Liquidity risk, especially in less traded instruments</li>
                <li>
                  Gap risk, where prices can move significantly between market
                  closings and openings
                </li>
                <li>Regulatory changes that may affect market conditions</li>
                <li>
                  Economic and political events that can cause sudden market
                  movements
                </li>
              </ul>
            </Subsection>

            <Subsection title="3.4 Technology Risk">
              <p>
                Electronic trading systems, including algorithmic trading tools,
                are subject to:
              </p>
              <ul>
                <li>System failures, errors, or delays</li>
                <li>Data feed inaccuracies or interruptions</li>
                <li>Communication breakdowns</li>
                <li>Cyber security threats</li>
              </ul>
            </Subsection>
          </Section>

          <Section title="4. Signal Generation Disclaimer">
            <p>
              Our signal generation tools are based on algorithmic analysis and
              historical data patterns. Important considerations:
            </p>
            <ul>
              <li>
                <strong>Past Performance:</strong> Historical performance and
                backtesting results do not guarantee future results
              </li>
              <li>
                <strong>No Guarantees:</strong> We make no guarantees about the
                accuracy, reliability, or profitability of any signals
              </li>
              <li>
                <strong>Hypothetical Results:</strong> Simulated or hypothetical
                trading does not reflect real market conditions and may be
                subject to biases
              </li>
              <li>
                <strong>Independent Verification:</strong> You should
                independently verify any signal before making trading decisions
              </li>
            </ul>
          </Section>

          <Section title="5. Hypothetical Performance Disclaimer">
            <p>
              HYPOTHETICAL PERFORMANCE RESULTS HAVE MANY INHERENT LIMITATIONS,
              SOME OF WHICH ARE DESCRIBED BELOW:
            </p>
            <ul>
              <li>
                No representation is being made that any account will or is
                likely to achieve profits or losses similar to those shown
              </li>
              <li>
                There are frequently sharp differences between hypothetical
                performance results and the actual results subsequently achieved
                by any particular trading program
              </li>
              <li>
                Hypothetical trading does not involve financial risk, and no
                hypothetical trading record can completely account for the
                impact of financial risk in actual trading
              </li>
              <li>
                The ability to withstand losses or adhere to a particular
                trading program in spite of trading losses are material points
                which can also adversely affect actual trading results
              </li>
            </ul>
          </Section>

          <Section title="6. Regulatory Status">
            <p>Optiveon LLC is a technology and research company. We are:</p>
            <ul>
              <li>
                <strong>NOT</strong> a registered investment adviser
              </li>
              <li>
                <strong>NOT</strong> a broker-dealer
              </li>
              <li>
                <strong>NOT</strong> registered with the SEC, CFTC, NFA, FINRA,
                or any other financial regulatory body as an investment adviser
                or broker
              </li>
              <li>
                <strong>NOT</strong> licensed to provide investment advice
              </li>
            </ul>
            <p className="mt-md">
              Our tools are provided for informational and research purposes
              only. If you require investment advice, please consult with a
              registered investment adviser or financial professional licensed
              in your jurisdiction.
            </p>
          </Section>

          <Section title="7. Your Responsibilities">
            <p>By using our services, you acknowledge that:</p>
            <ul>
              <li>
                You are solely responsible for your trading and investment
                decisions
              </li>
              <li>
                You have the financial resources to sustain potential losses
              </li>
              <li>
                You understand the risks involved in trading financial
                instruments
              </li>
              <li>
                You will not rely solely on our tools for trading decisions
              </li>
              <li>You will conduct your own research and due diligence</li>
              <li>
                You will consult with qualified professionals before making
                financial decisions
              </li>
            </ul>
          </Section>

          <Section title="8. Seek Professional Advice">
            <p>
              Before making any investment decisions, we strongly recommend that
              you:
            </p>
            <ul>
              <li>Consult with a qualified financial advisor</li>
              <li>Speak with a tax professional about tax implications</li>
              <li>Review all applicable regulations in your jurisdiction</li>
              <li>
                Carefully read all disclosures from your broker or trading
                platform
              </li>
            </ul>
          </Section>

          <Section title="9. Contact Information">
            <p>
              If you have questions about this Risk Disclaimer, please contact
              us at:
            </p>
            <p className="mt-md">
              <strong>{companyInfo.name}</strong>
              <br />
              {companyInfo.address.street}
              <br />
              {companyInfo.address.suite}
              <br />
              {companyInfo.address.city}, {companyInfo.address.state}{" "}
              {companyInfo.address.zip}
              <br />
              Email:{" "}
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-primary-light hover:text-accent"
              >
                {companyInfo.email}
              </a>
            </p>
          </Section>
        </div>

        {/* Final Warning */}
        <div className="bg-error/10 border border-error/30 rounded-lg p-xl mt-3xl">
          <h3 className="text-error font-semibold mb-md">Final Warning</h3>
          <p className="text-foreground leading-relaxed">
            Trading financial instruments involves risk. Only trade with money
            you can afford to lose. If you do not understand these risks, you
            should not trade. By using our services, you acknowledge that you
            have read, understood, and agree to this Risk Disclaimer.
          </p>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3xl">
      <h2 className="text-2xl font-semibold mb-md">{title}</h2>
      <div className="text-foreground-secondary leading-relaxed space-y-md [&_ul]:ml-xl [&_ul]:list-disc [&_ul]:space-y-sm [&_li]:text-foreground-secondary">
        {children}
      </div>
    </div>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-xl">
      <h3 className="text-lg font-medium mb-sm">{title}</h3>
      <div className="space-y-md">{children}</div>
    </div>
  );
}
