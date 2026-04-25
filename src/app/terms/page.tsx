import Link from 'next/link'
import { MarketingPageShell } from '@/components/shared/marketing-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const toc = [
  { id: 'acceptance', title: 'Acceptance' },
  { id: 'accounts', title: 'Accounts & eligibility' },
  { id: 'marketplace', title: 'Listings & transactions' },
  { id: 'content', title: 'Content & intellectual property' },
  { id: 'prohibited', title: 'Prohibited conduct' },
  { id: 'disclaimers', title: 'Disclaimers & liability' },
  { id: 'changes', title: 'Changes & contact' },
]

export default function TermsPage() {
  return (
    <MarketingPageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`These terms govern your use of ${SITE_CONFIG.name}, including browsing, accounts, and commercial interactions arranged through the platform. They are written to be readable—if something is unclear, contact us before you rely on a risky interpretation.`}
    >
      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DB1A1A]">On this page</p>
          <nav className="mt-4 space-y-2 border-l-2 border-[#8CC7C4]/40 pl-4">
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block text-sm text-[#2C687B]/80 transition-colors hover:text-[#DB1A1A]">
                {item.title}
              </a>
            ))}
          </nav>
          <p className="mt-8 text-xs text-[#2C687B]/55">Last updated: April 14, 2026</p>
        </aside>

        <article className="max-w-none text-[#2C687B]">
          <div className="space-y-12">
            <section id="acceptance" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">1. Acceptance of terms</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                By accessing {SITE_CONFIG.name}, you agree to these Terms and our{' '}
                <Link href="/privacy" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
                . If you use the site on behalf of a business, you represent that you have authority to bind that business. We may update these Terms; the
                &quot;Last updated&quot; date reflects the latest version. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section id="accounts" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">2. Accounts & eligibility</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                You must provide accurate registration information and safeguard your credentials. You are responsible for activity under your account. We may
                suspend or terminate accounts that compromise security, violate these Terms, or present fraud risk. Commercial sellers may be subject to
                additional verification steps before listings go live.
              </p>
            </section>

            <section id="marketplace" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">3. Listings & transactions</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                {SITE_CONFIG.name} helps buyers discover parts and contact sellers. Unless explicitly stated, we are not the seller of record. Pricing,
                fulfillment, warranties, returns, and taxes are between you and the seller. We may display data supplied by sellers or third-party catalogs;
                always confirm critical fitment details before installation. Core charges, hazmat handling, and freight policies belong to the seller&apos;s
                stated terms.
              </p>
            </section>

            <section id="content" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">4. Content & intellectual property</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                Site design, trademarks, and original editorial content belong to {SITE_CONFIG.name} or our licensors. You may not scrape, frame, or mirror
                the service without permission. Content you submit (reviews, photos, listings) grants us a license to host, display, and promote it in connection
                with the platform. You warrant you have rights to any media you upload.
              </p>
            </section>

            <section id="prohibited" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">5. Prohibited conduct</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#2C687B]/78">
                <li>Misrepresenting fitment, condition, or authenticity of parts.</li>
                <li>Circumventing safety or emissions regulations, or listing illegal goods.</li>
                <li>Harassment, spam, malware, or attempts to disrupt the site or other users.</li>
                <li>Using automated means to overload systems or extract data without consent.</li>
              </ul>
            </section>

            <section id="disclaimers" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">6. Disclaimers & limitation of liability</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                The platform is provided &quot;as is.&quot; We do not guarantee uninterrupted access or error-free listings. To the fullest extent permitted by
                law, {SITE_CONFIG.name} is not liable for indirect, incidental, or consequential damages arising from parts installation, vehicle downtime, or
                third-party seller conduct. Your sole remedy for dissatisfaction with the site is to stop using it. Some jurisdictions do not allow certain
                limitations; in those cases, our liability is limited to the amount you paid us in the past twelve months for fee-based services, if any.
              </p>
            </section>

            <section id="changes" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold text-[#2C687B]">7. Changes & contact</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                We may modify features or these Terms to reflect product or legal requirements. For questions about these Terms, reach us through the{' '}
                <Link href="/contact" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
                  contact page
                </Link>
                . Serious legal notices may be sent to the address published on that page.
              </p>
            </section>
          </div>
        </article>
      </div>
    </MarketingPageShell>
  )
}
