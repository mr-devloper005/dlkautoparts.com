import Link from 'next/link'
import { MarketingPageShell } from '@/components/shared/marketing-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'collect', title: 'What we collect' },
  { id: 'use', title: 'How we use data' },
  { id: 'share', title: 'Sharing & processors' },
  { id: 'rights', title: 'Your choices' },
  { id: 'retention', title: 'Retention & security' },
  { id: 'intl', title: 'International users' },
  { id: 'contact', title: 'Contact' },
]

export default function PrivacyPage() {
  return (
    <MarketingPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description={`This policy explains how ${SITE_CONFIG.name} collects, uses, and protects personal information when you use our website, accounts, and seller tools. We minimize data collection and avoid selling your personal information.`}
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
            <section id="overview" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                {SITE_CONFIG.name} operates a parts discovery and business directory experience. We process data to run the service, secure accounts, comply
                with law, and improve relevance of search results. Where we rely on consent (for example, certain marketing emails), you can withdraw it at
                any time.
              </p>
            </section>

            <section id="collect" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">What we collect</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#2C687B]/78">
                <li>
                  <strong className="text-[#2C687B]">Account & profile:</strong> name, email, phone, company name, and billing or tax identifiers for commercial
                  accounts.
                </li>
                <li>
                  <strong className="text-[#2C687B]">Transaction support:</strong> messages you send, quote requests, and order-related communications
                  conducted through platform channels.
                </li>
                <li>
                  <strong className="text-[#2C687B]">Technical data:</strong> IP address, device type, browser, approximate location derived from IP, and
                  diagnostic logs for security.
                </li>
                <li>
                  <strong className="text-[#2C687B]">Cookies:</strong> see our{' '}
                  <Link href="/cookies" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
                    Cookies
                  </Link>{' '}
                  page for categories and controls.
                </li>
              </ul>
            </section>

            <section id="use" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">How we use data</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                We use personal data to authenticate users, display listings, route inquiries to sellers, detect fraud, measure product performance, and send
                service-related notices. With your permission, we may send product updates or educational content; you can opt out of marketing at any time
                while still receiving essential account emails.
              </p>
            </section>

            <section id="share" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">Sharing & processors</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                We share information with sellers when you choose to contact them. We also use vetted infrastructure providers (hosting, email delivery,
                analytics) under contractual confidentiality obligations. We may disclose information if required by law or to protect the rights, property,
                or safety of {SITE_CONFIG.name}, our users, or the public.
              </p>
            </section>

            <section id="rights" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">Your choices</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                Depending on your region, you may request access, correction, export, or deletion of personal data. You may object to certain processing or
                lodge a complaint with a supervisory authority. To exercise rights, contact us via the{' '}
                <Link href="/contact" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
                  contact page
                </Link>
                ; we verify requests to prevent unauthorized changes.
              </p>
            </section>

            <section id="retention" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">Retention & security</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                We retain data only as long as needed for the purposes above, including legal, tax, and dispute resolution holds. We apply administrative,
                technical, and organizational safeguards appropriate to the sensitivity of the data. No online service is perfectly secure; report suspected
                compromises immediately.
              </p>
            </section>

            <section id="intl" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">International users</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                If you access the site from outside the United States, your data may be processed in the U.S. or other countries where we operate. We apply
                appropriate safeguards where required for cross-border transfers.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-8">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
                Questions about this policy? Use the{' '}
                <Link href="/contact" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
                  contact form
                </Link>{' '}
                and select privacy as the topic.
              </p>
            </section>
          </div>
        </article>
      </div>
    </MarketingPageShell>
  )
}
