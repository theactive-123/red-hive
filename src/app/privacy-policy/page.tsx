import LegalPage from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects your personal information.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="November 2026">
      <p>
        This Privacy Policy explains how {site.legalName} (“{site.name}”, “we”, “us”) collects, uses and protects information when you visit {site.url} or
        contact us about our services.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Information you provide, such as your name, email, phone number, company and project details when you submit a form or email us.</li>
        <li>Technical information such as browser type, device, pages visited and approximate location, collected through standard server logs and analytics.</li>
        <li>Communications you send us, including emails and call notes.</li>
      </ul>
      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries, prepare proposals and deliver our services.</li>
        <li>To improve our website, content and user experience.</li>
        <li>To send service-related communications. We only send marketing emails with your consent, and you can unsubscribe at any time.</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We share it only with trusted service providers (for example hosting, email and analytics providers)
        who process it on our behalf under confidentiality obligations, or when required by law.
      </p>
      <h2>Data retention &amp; security</h2>
      <p>
        We keep personal information only as long as needed for the purposes above and protect it with administrative, technical and physical safeguards.
        No method of transmission over the internet is completely secure, but we work hard to protect your data.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information. To make a request,
        email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>Cookies</h2>
      <p>We use essential cookies to operate the site and may use analytics cookies to understand how it is used. You can control cookies in your browser settings.</p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phones[0].display}.
      </p>
    </LegalPage>
  );
}
