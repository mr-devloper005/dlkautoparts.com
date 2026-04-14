'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type SiteSearchFormProps = {
  placeholder?: string
  className?: string
  inputClassName?: string
  buttonClassName?: string
  defaultValue?: string
  /** When false, omits the submit control (submit on Enter only). */
  showSubmitButton?: boolean
  compact?: boolean
  /** Called after navigation starts (e.g. close mobile menu). */
  onNavigate?: () => void
}

export function SiteSearchForm({
  placeholder = 'Search…',
  className,
  inputClassName,
  buttonClassName,
  defaultValue = '',
  showSubmitButton = true,
  compact = false,
  onNavigate,
}: SiteSearchFormProps) {
  const router = useRouter()
  const [q, setQ] = useState(defaultValue)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
    onNavigate?.()
  }

  return (
    <form onSubmit={submit} className={cn('flex w-full items-center gap-2', className)}>
      <label className="sr-only" htmlFor="site-search-q">
        Search
      </label>
      <span className={cn('pointer-events-none text-[#2C687B]/70', compact ? 'hidden sm:inline-flex' : 'inline-flex')}>
        <Search className="h-4 w-4 shrink-0" aria-hidden />
      </span>
      <input
        id="site-search-q"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'min-w-0 flex-1 bg-transparent text-sm text-[#2C687B] placeholder:text-[#2C687B]/45 outline-none',
          inputClassName
        )}
      />
      {showSubmitButton ? (
        <button
          type="submit"
          className={cn(
            'shrink-0 rounded-full bg-[#DB1A1A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#c41515]',
            buttonClassName
          )}
        >
          Search
        </button>
      ) : null}
    </form>
  )
}

type DirectoryHeroSearchProps = {
  className?: string
  needInputClassName?: string
  areaInputClassName?: string
  buttonClassName?: string
  onNavigate?: () => void
}

export function DirectoryHeroSearch({
  className,
  needInputClassName,
  areaInputClassName,
  buttonClassName,
  onNavigate,
}: DirectoryHeroSearchProps) {
  const router = useRouter()
  const [need, setNeed] = useState('')
  const [area, setArea] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = [need.trim(), area.trim()].filter(Boolean).join(' ').trim()
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    onNavigate?.()
  }

  return (
    <form onSubmit={submit} className={cn('grid gap-3 md:grid-cols-[1.25fr_0.8fr_auto]', className)}>
      <label className="sr-only" htmlFor="hero-need">
        What you need
      </label>
      <input
        id="hero-need"
        name="q"
        value={need}
        onChange={(e) => setNeed(e.target.value)}
        placeholder="What do you need today?"
        autoComplete="off"
        className={cn(
          'rounded-full border border-[#8CC7C4]/40 bg-white px-4 py-3 text-sm text-[#2C687B] placeholder:text-[#2C687B]/45 outline-none',
          needInputClassName
        )}
      />
      <label className="sr-only" htmlFor="hero-area">
        Area or city
      </label>
      <input
        id="hero-area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Choose area or city"
        autoComplete="off"
        className={cn(
          'rounded-full border border-[#8CC7C4]/40 bg-white px-4 py-3 text-sm text-[#2C687B] placeholder:text-[#2C687B]/45 outline-none',
          areaInputClassName
        )}
      />
      <button
        type="submit"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full bg-[#DB1A1A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c41515]',
          buttonClassName
        )}
      >
        Search
      </button>
    </form>
  )
}
