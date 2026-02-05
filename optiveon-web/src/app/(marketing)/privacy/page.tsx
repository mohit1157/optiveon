import { Metadata } from "next";
import { companyInfo } from "@/constants/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Optiveon LLC collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-[160px] min-h-screen">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-lg">Privacy Policy</h1>
        <p className="text-foreground-muted text-sm mb-3xl">
          Last Updated: January 2024
        </p>

        <div className="prose prose-invert max-w-none">
          <p className="text-foreground-secondary leading-relaxed mb-xl">
            Optiveon LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot;
            or &quot;our&quot;) respects your privacy and is committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our website, applications, and services.
          </p>

          <Section title="1. Information We Collect">
            <Subsection title="1.1 Personal Information">
              <p>
                We may collect personal information that you voluntarily provide
                to us, including:
              </p>
              <ul>
                <li>
                  Name and contact information (email address, phone number,
                  mailing address)
                </li>
                <li>Account credentials (username, password)</li>
                <li>
                  Payment information (processed through secure third-party
                  payment processors)
                </li>
                <li>Company or organization name</li>
                <li>Professional title and industry</li>
              </ul>
            </Subsection>

            <Subsection title="1.2 Usage Information">
              <p>
                We automatically collect certain information when you use our
                services:
              </p>
              <ul>
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Log data (access times, error logs, referral URLs)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </Subsection>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>
                Protect against fraudulent, unauthorized, or illegal activity
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p>
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third parties that perform
                services on our behalf (hosting, analytics, payment processing)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or governmental authority
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have given us
                permission to share your information
              </li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information, including:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, comply with legal
              obligations, resolve disputes, and enforce our agreements.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li>Data portability</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
          </Section>

          <Section title="7. Cookies and Tracking">
            <p>
              We use cookies and similar technologies to enhance your
              experience. You can control cookies through your browser settings.
              Note that disabling cookies may affect the functionality of our
              services.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our services may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place for such transfers.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the &quot;Last Updated&quot; date.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us at:
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
