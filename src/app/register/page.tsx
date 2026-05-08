'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      title: 'Create your parts account',
      body: 'Access wholesale pricing, manage orders, and get priority support for your automotive parts needs.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Join the parts network',
      body: 'Get access to technical resources, parts catalogs, and industry insights for automotive professionals.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Start your parts journey',
      body: 'Browse parts galleries, view compatibility guides, and connect with automotive experts.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create your parts profile',
    body: 'Save parts lists, track orders, and get personalized recommendations for your vehicles.',
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const businessType = formData.get('businessType') as string

    try {
      // Simulate account creation process
      // In a real app, this would be an API call to your authentication service
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
      
      // Validate input
      if (!fullName || !email || !password || !businessType) {
        throw new Error('Please fill in all fields')
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }

      // Create user session data
      const userData = {
        id: 'user_' + Date.now(),
        fullName: fullName,
        email: email,
        businessType: businessType,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        loginTime: new Date().toISOString()
      }

      // Save to local storage
      localStorage.setItem('userSession', JSON.stringify(userData))
      localStorage.setItem('isLoggedIn', 'true')
      
      // Dispatch custom event to notify auth state change
      window.dispatchEvent(new Event('authStateChanged'))
      
      // Redirect to homepage
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Wholesale pricing on quality parts', 'Fast shipping from Detroit logistics hub', 'Expert technical support available'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <form onSubmit={handleCreateAccount} className="mt-6 grid gap-4">
              <input 
                name="fullName"
                type="text"
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Full name" 
                required 
                disabled={isLoading}
              />
              <input 
                name="email"
                type="email"
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Email address" 
                required 
                disabled={isLoading}
              />
              <input 
                name="password"
                type="password" 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Password" 
                required 
                disabled={isLoading}
              />
              <input 
                name="businessType"
                type="text"
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Business type (garage, fleet, dealership, etc.)" 
                required 
                disabled={isLoading}
              />
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}
              <button 
                type="submit" 
                className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
