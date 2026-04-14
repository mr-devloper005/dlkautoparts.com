import Link from 'next/link'
import { ArrowRight, Cog, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { MarketingPageShell } from '@/components/shared/marketing-page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    icon: Cog,
    title: 'Parts you can trust',
    body: 'We focus on verified suppliers, clear fitment notes, and honest availability so you spend less time guessing and more time turning wrenches.',
  },
  {
    icon: Truck,
    title: 'Built for busy shops',
    body: 'Fast search, structured listings, and straightforward contact paths help independent garages and fleet teams get quotes without chasing dead ends.',
  },
  {
    icon: ShieldCheck,
    title: 'Clarity first',
    body: 'Specs, warranties, and return expectations belong in plain language. Our directory is designed to surface that context up front.',
  },
]

const milestones = [
  { year: '2018', label: 'DLK launched', detail: 'Started as a regional parts sourcing desk for independent repair shops.' },
  { year: '2021', label: 'Digital directory', detail: 'Moved inventory and partner profiles online with a single, searchable catalog experience.' },
  { year: '2024', label: 'Nationwide partners', detail: 'Expanded verified seller coverage while keeping local pickup and delivery options visible.' },
  { year: '2026', label: 'Today', detail: 'One platform for discovery, comparison, and direct outreach—still tuned for real-world shop workflows.' },
]

const stats = [
  { value: '12k+', label: 'SKU families indexed' },
  { value: '480+', label: 'Verified seller profiles' },
  { value: '24h', label: 'Typical quote response goal' },
]

export default function AboutPage() {
  return (
    <MarketingPageShell
      eyebrow="About DLK"
      title={`${SITE_CONFIG.name} connects shops with the right parts, faster.`}
      description={`We are an auto parts discovery platform built around precision, speed, and transparency. Whether you run a single bay or a multi-location operation, ${SITE_CONFIG.name} helps you find compatible components and trusted suppliers without the noise of a generic marketplace.`}
      actions={
        <>
          <Button className="rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]" asChild>
            <Link href="/listings">
              Browse listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-[#8CC7C4]/50 bg-white text-[#2C687B] hover:bg-[#8CC7C4]/15" asChild>
            <Link href="/contact">Talk with us</Link>
          </Button>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-[#8CC7C4]/35 bg-white p-7 shadow-[0_20px_50px_rgba(44,104,123,0.06)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8CC7C4]/20 text-[#2C687B]">
              <item.icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#2C687B]/78">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="rounded-[2rem] border border-[#8CC7C4]/35 bg-[linear-gradient(145deg,#ffffff_0%,#f5fcfb_100%)] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DB1A1A]">How we work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Engineering-minded service, human support.</h2>
          <p className="mt-5 text-sm leading-8 text-[#2C687B]/78">
            Behind the catalog is a team that speaks both diagnostics and supply chain. We collaborate with distributors, remanufacturers, and specialty
            vendors to keep listings accurate—because the best part is the one that fits the first time.
          </p>
          <ul className="mt-8 space-y-4 text-sm leading-7 text-[#2C687B]/85">
            <li className="flex gap-3">
              <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-[#DB1A1A]" />
              <span>Technical editors review high-risk categories (braking, steering, emissions) for common supersession and interchange notes.</span>
            </li>
            <li className="flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#DB1A1A]" />
              <span>Fulfillment options—ship, will-call, and local route delivery—are surfaced per listing when partners provide them.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#DB1A1A]" />
              <span>Dispute and warranty escalations route through documented channels so buyers and sellers share the same playbook.</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-5 rounded-2xl border border-[#8CC7C4]/30 bg-white p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DB1A1A] text-sm font-bold text-white">{m.year}</span>
              <div>
                <p className="font-semibold">{m.label}</p>
                <p className="mt-1 text-sm text-[#2C687B]/75">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] border border-[#8CC7C4]/35 bg-white p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DB1A1A]">Snapshot</p>
            <h2 className="mt-3 text-2xl font-semibold">Numbers that reflect real usage—not vanity metrics.</h2>
          </div>
          <Button variant="outline" className="w-fit rounded-full border-[#8CC7C4]/50" asChild>
            <Link href="/help">Read the help center</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-[#FFF6F6] px-6 py-8 text-center">
              <p className="text-3xl font-semibold text-[#DB1A1A]">{s.value}</p>
              <p className="mt-2 text-sm text-[#2C687B]/75">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingPageShell>
  )
}
