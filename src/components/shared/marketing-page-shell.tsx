import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export function MarketingPageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FFF6F6] text-[#2C687B]">
      <NavbarShell />
      <header className="relative overflow-hidden border-b border-[#8CC7C4]/30 bg-[linear-gradient(165deg,#FFF6F6_0%,#ffffff_48%,#f0faf9_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(219,26,26,0.07),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(140,199,196,0.22),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-2xl border border-[#8CC7C4]/35 bg-white px-5 py-3 shadow-[0_12px_40px_rgba(44,104,123,0.08)]">
                <img
                  src="/favicon.png?v=20260414"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={220}
                  height={56}
                  className="h-10 w-auto max-w-[200px] object-contain sm:h-12"
                />
              </div>
              {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DB1A1A]">{eyebrow}</p> : null}
              <h1 className="mt-3 font-semibold tracking-[-0.04em] text-4xl sm:text-5xl">{title}</h1>
              {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-[#2C687B]/80">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  )
}
