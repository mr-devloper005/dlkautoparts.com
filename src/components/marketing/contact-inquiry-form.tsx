'use client'

import type { FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ContactInquiryForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[#2C687B]">Name</span>
          <input
            className="h-12 rounded-xl border border-[#8CC7C4]/40 bg-[#FFF6F6] px-4 text-[#2C687B] outline-none ring-[#2C687B] placeholder:text-[#2C687B]/45 focus:ring-2"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[#2C687B]">Work email</span>
          <input
            type="email"
            className="h-12 rounded-xl border border-[#8CC7C4]/40 bg-[#FFF6F6] px-4 text-[#2C687B] outline-none ring-[#2C687B] placeholder:text-[#2C687B]/45 focus:ring-2"
            placeholder="you@shop.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-[#2C687B]">Topic</span>
        <select className="h-12 rounded-xl border border-[#8CC7C4]/40 bg-[#FFF6F6] px-4 text-[#2C687B] outline-none ring-[#2C687B] focus:ring-2">
          <option>Quote / availability</option>
          <option>Listing or seller support</option>
          <option>Partnership / wholesale</option>
          <option>Website or account help</option>
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-[#2C687B]">Message</span>
        <textarea
          className="min-h-[160px] rounded-xl border border-[#8CC7C4]/40 bg-[#FFF6F6] px-4 py-3 text-[#2C687B] outline-none ring-[#2C687B] placeholder:text-[#2C687B]/45 focus:ring-2"
          placeholder="Year, make, model, engine, part numbers, and any error codes or photos that help."
        />
      </label>
      <Button type="submit" className="h-12 rounded-full bg-[#DB1A1A] text-white hover:bg-[#c41515]">
        Submit inquiry
      </Button>
      <p className="text-xs text-[#2C687B]/60">
        By submitting, you agree we may contact you about this request. See our{' '}
        <Link href="/privacy" className="font-medium text-[#DB1A1A] underline-offset-2 hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  )
}
