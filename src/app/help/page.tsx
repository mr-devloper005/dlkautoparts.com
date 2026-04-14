import Link from 'next/link'
import { BookOpen, FileText, LifeBuoy, Search, Wrench } from 'lucide-react'
import { MarketingPageShell } from '@/components/shared/marketing-page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
const guides = [
  {
    icon: Search,
    title: 'Search like a counter pro',
    body: 'Combine year, make, model with part type keywords. Add VIN or OEM number in the search bar for fewer false positives.',
    href: '/search',
    cta: 'Open search',
  },
  {
    icon: FileText,
    title: 'Reading a listing',
    body: 'Check interchange notes, warranty window, and whether the price includes cores or hardware. When in doubt, message the seller before ordering.',
    href: '/listings',
    cta: 'Browse listings',
  },
  {
    icon: Wrench,
    title: 'Shop accounts',
    body: 'Business accounts can save garages, tax profiles, and PO references. Keep users and roles updated so your team sees the right approvals.',
    href: '/register',
    cta: 'Create an account',
  },
  {
    icon: BookOpen,
    title: 'Seller guidelines',
    body: 'Accurate photos of labels, honest lead times, and hazmat disclosures keep your seller score healthy and reduce chargebacks.',
    href: '/contact',
    cta: 'Contact seller support',
  },
]

const faqs = [
  {
    id: 'fitment',
    question: 'How do I confirm fitment before I buy?',
    answer:
      'Cross-check OEM or aftermarket part numbers with your catalog, compare bolt patterns and sensor counts for assemblies, and ask the seller for supersession notes. When provided, VIN-level verification is the strongest signal.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'Return windows and restocking fees are set by each seller and shown on their listing or invoice. Initiate returns through the same channel you used to purchase so the seller can issue an RMA and shipping label if applicable.',
  },
  {
    id: 'cores',
    question: 'How do core charges work?',
    answer:
      'Remanufactured parts often include a refundable core charge when you return the old unit. Core condition rules (cracks, missing ears, fluid contamination) vary—read the seller’s core policy before installation.',
  },
  {
    id: 'hazmat',
    question: 'Can you ship fluids, batteries, or airbags?',
    answer:
      'Some items require ground-only freight, adult signature, or dealer pickup. Listings should flag hazmat constraints; carriers may reject non-compliant packages, so confirm before paying expedited shipping.',
  },
  {
    id: 'account',
    question: 'How do I reset my password?',
    answer:
      'Use the sign-in page “Forgot password” link. If your shop uses SSO or shared inboxes, ask your admin to confirm which email owns the account before resetting.',
  },
  {
    id: 'seller',
    question: 'How do I become a verified seller?',
    answer:
      'Start from the contact page and choose partnership or seller onboarding. You will need business credentials, tax documentation, and sample invoices or catalog references for review.',
  },
]

export default function HelpPage() {
  return (
    <MarketingPageShell
      eyebrow="Help center"
      title="Answers for buyers, sellers, and shop managers."
      description="Start with quick guides below, or jump into FAQs. If your issue involves a specific order, include screenshots of labels and any error codes—that gets you a faster fix."
      actions={
        <Button className="rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <section className="grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <div
            key={g.title}
            className="flex flex-col rounded-[1.75rem] border border-[#8CC7C4]/35 bg-white p-7 shadow-[0_16px_44px_rgba(44,104,123,0.06)] transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8CC7C4]/20 text-[#2C687B]">
              <g.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{g.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-[#2C687B]/76">{g.body}</p>
            <Link href={g.href} className="mt-6 inline-flex items-center text-sm font-semibold text-[#DB1A1A] underline-offset-4 hover:underline">
              {g.cta} →
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="rounded-[2rem] border border-[#8CC7C4]/35 bg-[linear-gradient(180deg,#ffffff_0%,#f5fcfb_100%)] p-8">
          <div className="flex items-center gap-3">
            <LifeBuoy className="h-8 w-8 text-[#DB1A1A]" />
            <h2 className="text-2xl font-semibold">Still stuck?</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#2C687B]/78">
            Our support team routes technical questions to parts specialists and account issues to platform staff. Average first response is under one
            business day for commercial accounts; peak season may run longer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]" asChild>
              <Link href="/contact">Open a ticket</Link>
            </Button>
            <Button variant="outline" className="rounded-full border-[#8CC7C4]/50 bg-white" asChild>
              <Link href="/terms">Review terms</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#8CC7C4]/35 bg-white p-8">
          <h3 className="text-lg font-semibold">Frequently asked</h3>
          <Accordion type="single" collapsible className="mt-4 w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-[#8CC7C4]/25">
                <AccordionTrigger className="text-left text-[#2C687B] hover:text-[#DB1A1A] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-[#2C687B]/76">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </MarketingPageShell>
  )
}
