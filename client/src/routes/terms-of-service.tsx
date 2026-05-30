import { Title } from "@solidjs/meta";

const sections = [
  {
    heading: "1. Agreement to Terms",
    body: "By accessing or using Hastiludes, you agree to these Terms of Service. If you do not agree, do not use the service.",
  },
  {
    heading: "2. Eligibility",
    body: "You must follow applicable laws in your jurisdiction and be legally able to accept these terms. If you are under the age of majority where you live, use Hastiludes only with parent or guardian permission.",
  },
  {
    heading: "3. Service Description",
    body: "Hastiludes is an educational and social experience focused on finance literacy and game-like progression. It is not a brokerage, exchange, custodian, financial advisor, or investment platform.",
  },
  {
    heading: "4. Wallets and Third-Party Services",
    body: "Some features may connect to third-party wallets, networks, or external services. Those services are provided by third parties under their own terms and policies.",
  },
  {
    heading: "5. No Financial Advice",
    body: "Content in Hastiludes is for educational purposes only and should not be treated as financial, tax, legal, or investment advice.",
  },
  {
    heading: "6. User Responsibilities",
    body: "You are responsible for your account behavior, wallet security, and device security. Never share seed phrases or private keys.",
  },
  {
    heading: "7. Prohibited Conduct",
    body: "You may not use Hastiludes for unlawful activity, abuse, fraud, harassment, hacking, spam, or behavior that disrupts the platform or other users.",
  },
  {
    heading: "8. Intellectual Property",
    body: "Unless otherwise noted, Hastiludes branding, content, and software are protected by intellectual property laws. You may not copy or redistribute protected materials without permission.",
  },
  {
    heading: "9. Disclaimers",
    body: "Hastiludes is provided on an \"as is\" and \"as available\" basis without warranties of any kind, to the fullest extent permitted by law.",
  },
  {
    heading: "10. Limitation of Liability",
    body: "To the fullest extent permitted by law, Hastiludes and its contributors are not liable for indirect, incidental, consequential, or special damages arising from use of the platform.",
  },
  {
    heading: "11. Changes to Terms",
    body: "We may update these Terms from time to time. Continued use of Hastiludes after updates means you accept the revised Terms.",
  },
  {
    heading: "12. Contact",
    body: "For terms-related questions, contact the Hastiludes team through official community channels linked in the footer.",
  },
];

export default function TermsOfService() {
  return (
    <main class="legal-page">
      <Title>Terms of Service | Hastiludes</Title>

      <section class="legal-shell">
        <p class="legal-kicker">Legal</p>
        <h1>Terms of Service</h1>
        <p class="legal-updated">Last updated: May 30, 2026</p>

        <div class="legal-list">
          {sections.map((section) => (
            <article class="legal-card">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}