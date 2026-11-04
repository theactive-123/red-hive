import LegalPage from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({ title: "Terms & Conditions", description: `Terms governing the use of the ${site.name} website and services.`, path: "/terms-conditions" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms-conditions" updated="November 2026">
      <p>
        These terms govern your use of {site.url} and any services provided by {site.legalName}. By using the website you agree to these terms.
      </p>
      <h2>Services</h2>
      <p>
        Specific projects are governed by a separate proposal, statement of work or master services agreement. If those documents conflict with these
        terms, the signed project agreement prevails.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Website content, branding and design are owned by {site.name}. Unless otherwise agreed in writing, clients receive full ownership of the custom
        source code and deliverables created for them once the related invoices are paid in full.
      </p>
      <h2>Payments</h2>
      <ul>
        <li>Payment schedules, milestones and fees are defined in each project agreement.</li>
        <li>Late payments may pause work until the account is brought current.</li>
      </ul>
      <h2>Confidentiality</h2>
      <p>We treat all client information as confidential and are happy to sign a mutual NDA before detailed discussions.</p>
      <h2>Limitation of liability</h2>
      <p>
        The website is provided “as is”. To the maximum extent permitted by law, {site.name} is not liable for indirect or consequential damages arising
        from use of the website.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The “last updated” date above shows when they last changed.</p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
