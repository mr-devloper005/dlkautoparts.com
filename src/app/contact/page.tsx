import Link from 'next/link'
import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { ContactInquiryForm } from '@/components/marketing/contact-inquiry-form'
import { MarketingPageShell } from '@/components/shared/marketing-page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const channels = [
  {
    icon: Phone,
    title: 'Parts hotline',
    detail: '1-800-DLK-PART (placeholder)',
    sub: 'Mon–Sat · 7am–7pm local',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@dlkautoparts.com',
    sub: 'Quotes, order issues, and vendor onboarding',
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    detail: 'Detroit logistics corridor (mailing address on invoice)',
    sub: 'Will-call by appointment for verified partners',
  },
]

export default function ContactPage() {
  return (
    <MarketingPageShell
      eyebrow="Contact"
      title="We respond like a parts counter, not a ticket black hole."
      description={`Tell us your vehicle, VIN (if available), and what you need. ${SITE_CONFIG.name} routes commercial inquiries to the right desk—listings support, seller verification, or partnership development.`}
      actions={
        <Button className="rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]" asChild>
          <Link href="/help">Browse help topics</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          {channels.map((c) => (
            <div key={c.title} className="flex gap-4 rounded-[1.5rem] border border-[#8CC7C4]/35 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8CC7C4]/20 text-[#2C687B]">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#DB1A1A]">{c.title}</p>
                <p className="mt-2 font-semibold">{c.detail}</p>
                <p className="mt-1 text-sm text-[#2C687B]/72">{c.sub}</p>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-4 rounded-[1.5rem] border border-dashed border-[#8CC7C4]/50 bg-[#f5fcfb] p-6">
            <Clock className="h-5 w-5 shrink-0 text-[#2C687B]" />
            <div>
              <p className="font-semibold">After-hours</p>
              <p className="mt-1 text-sm leading-7 text-[#2C687B]/75">
                Leave a detailed voicemail or email with part numbers and photos of labels. Emergency fleet customers can mention &quot;URGENT&quot; in the subject
                line for prioritized callback.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#8CC7C4]/35 bg-white p-8 shadow-[0_24px_60px_rgba(44,104,123,0.07)]">
          <div className="flex items-center gap-2 text-[#2C687B]">
            <MessageSquare className="h-5 w-5 text-[#DB1A1A]" />
            <h2 className="text-2xl font-semibold">Send a message</h2>
          </div>
          <p className="mt-2 text-sm text-[#2C687B]/72">This form is for general inquiries. For order-specific issues, include your order ID in the message.</p>
          <ContactInquiryForm />
        </div>
      </div>
    </MarketingPageShell>
  )
}
