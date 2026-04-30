'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { SiteSearchForm } from '@/components/shared/site-search-form'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-[#8CC7C4]/35 bg-[#FFF6F6]/92 text-[#2C687B] backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#8CC7C4]/35 bg-white shadow-sm',
    active: 'bg-[#DB1A1A] text-white',
    idle: 'text-[#2C687B]/80 hover:bg-[#8CC7C4]/15 hover:text-[#DB1A1A]',
    cta: 'rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    mobile: 'border-t border-[#8CC7C4]/30 bg-[#FFF6F6]',
  },
  'editorial-bar': {
    shell: 'border-b border-[#8CC7C4]/35 bg-[#FFF6F6]/94 text-[#2C687B] backdrop-blur-xl',
    logo: 'rounded-full border border-[#8CC7C4]/35 bg-white shadow-sm',
    active: 'bg-[#DB1A1A] text-white',
    idle: 'text-[#2C687B]/75 hover:bg-[#8CC7C4]/15 hover:text-[#DB1A1A]',
    cta: 'rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    mobile: 'border-t border-[#8CC7C4]/30 bg-[#FFF6F6]',
  },
  'floating-bar': {
    shell: 'border-b border-[#2C687B]/25 bg-[#2C687B] text-white',
    logo: 'rounded-[1.35rem] border border-[#8CC7C4]/40 bg-[#2C687B]/90 shadow-[0_16px_48px_rgba(44,104,123,0.25)] backdrop-blur',
    active: 'bg-[#DB1A1A] text-white',
    idle: 'text-white/85 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    mobile: 'border-t border-[#2C687B] bg-[#2C687B]',
  },
  'utility-bar': {
    shell: 'border-b border-[#8CC7C4]/35 bg-[#FFF6F6]/94 text-[#2C687B] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#8CC7C4]/35 bg-white shadow-sm',
    active: 'bg-[#DB1A1A] text-white',
    idle: 'text-[#2C687B]/80 hover:bg-[#8CC7C4]/15 hover:text-[#DB1A1A]',
    cta: 'rounded-lg bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    mobile: 'border-t border-[#8CC7C4]/30 bg-[#FFF6F6]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-[#8CC7C4]/35 bg-[#FFF6F6]/95 text-[#2C687B] shadow-[0_1px_0_rgba(44,104,123,0.06)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#8CC7C4]/35 bg-white',
    nav: 'text-[#2C687B]/80 hover:text-[#DB1A1A]',
    search: 'border border-[#8CC7C4]/40 bg-white text-[#2C687B]',
    cta: 'bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    post: 'border border-[#8CC7C4]/35 bg-white text-[#2C687B] hover:bg-[#8CC7C4]/12',
    mobile: 'border-t border-[#8CC7C4]/30 bg-[#FFF6F6]',
  },
  'market-utility': {
    shell: 'border-b border-[#8CC7C4]/35 bg-[#FFF6F6]/96 text-[#2C687B] shadow-[0_1px_0_rgba(44,104,123,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#8CC7C4]/35 bg-white',
    nav: 'text-[#2C687B]/80 hover:text-[#DB1A1A]',
    search: 'border border-[#8CC7C4]/40 bg-white text-[#2C687B]',
    cta: 'bg-[#DB1A1A] text-white hover:bg-[#c41515]',
    post: 'border border-[#8CC7C4]/35 bg-white text-[#2C687B] hover:bg-[#8CC7C4]/14',
    mobile: 'border-t border-[#8CC7C4]/30 bg-[#FFF6F6]',
  },
} as const

const staticNavLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Help', href: '/help' },
] as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile' && task.key !== 'listing'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260414" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-[#DB1A1A]' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              {staticNavLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-xs font-semibold text-[#2C687B]/70 transition-colors hover:text-[#DB1A1A]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className={cn('flex w-full max-w-xl items-center gap-2 rounded-full px-3 py-2.5', palette.search)}>
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8CC7C4]" aria-hidden />
              <SiteSearchForm
                showSubmitButton={false}
                placeholder="Find businesses, spaces, and local services"
                className="min-w-0"
                inputClassName="py-0.5"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[#2C687B] hover:bg-[#8CC7C4]/15 hover:text-[#DB1A1A]">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className={cn('mb-3 rounded-2xl px-3 py-3', palette.search)}>
                <SiteSearchForm showSubmitButton placeholder="Search listings and more" onNavigate={() => setIsMobileMenuOpen(false)} />
              </div>
              <div className="flex flex-wrap gap-2 px-1 pb-2">
                {staticNavLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full border border-[#8CC7C4]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#2C687B]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260414" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#8CC7C4]/35" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#DB1A1A]' : 'text-[#2C687B]/75 hover:text-[#DB1A1A]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#8CC7C4]/35" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="hidden min-w-0 max-w-md flex-1 items-center justify-center px-2 md:flex">
          <div
            className={cn(
              'flex w-full items-center rounded-full border border-[#8CC7C4]/35 px-3 py-2',
              isFloating ? 'border-white/25 bg-white/10' : 'bg-white/90'
            )}
          >
            <SiteSearchForm
              showSubmitButton={false}
              placeholder={siteContent.hero.searchPlaceholder}
              className={cn(isFloating && '[&_input]:text-white [&_input]:placeholder:text-white/55 [&_span]:text-white/70')}
            />
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {staticNavLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-[11px] font-semibold text-[#2C687B]/70 hover:text-[#DB1A1A]">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <div className="mb-3 rounded-2xl border border-[#8CC7C4]/35 bg-white px-3 py-3">
              <SiteSearchForm showSubmitButton placeholder="Search the site" onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
            <div className="flex flex-wrap gap-2 px-1 pb-2">
              {staticNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border border-[#8CC7C4]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#2C687B]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
