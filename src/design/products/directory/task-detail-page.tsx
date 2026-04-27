import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { getDirectoryUiPreset } from '@/design/directory-ui'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const ui = getDirectoryUiPreset()
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }
  const stats = [category || taskLabel, location ? 'Mapped' : 'Directory', website ? 'Website' : 'Profile']

  return (
    <div className={`min-h-screen ${ui.shell}`}>
      <SchemaJsonLd data={schemaPayload} />
      <main className="pb-16">
        <section className="relative min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to {taskLabel}
            </Link>
            <div className="mt-8 max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                <ShieldCheck className="h-4 w-4" />
                {ui.label}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{post.title}</h1>
              {location ? (
                <p className="mt-5 flex items-start gap-2 text-sm leading-7 text-white/90">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {location}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2">
                {stats.map((item) => (
                  <span key={item} className="border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 ? (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              {images.slice(1, 8).map((image) => (
                <div key={image} className="relative h-32 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-lg sm:h-40 sm:w-56">
                  <ContentImage src={image} alt={`${post.title} additional photo`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
          <div className="space-y-8">
            <article className={`rounded-2xl p-8 shadow-lg ${ui.detailPanel}`}>
              <div className="flex items-center gap-3">
                <div className={`h-1 w-12 ${ui.eyebrow === 'text-[#DB1A1A]' ? 'bg-[#DB1A1A]' : 'bg-current'}`} />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>About</p>
              </div>
              <h2 className={`mt-4 text-3xl font-semibold ${ui.title}`}>Overview</h2>
              <p className={`mt-6 max-w-4xl text-base leading-8 ${ui.muted}`}>{description}</p>
              {highlights.length ? (
                <div className="mt-8">
                  <h3 className={`text-lg font-semibold ${ui.title}`}>Key Features</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {highlights.slice(0, 6).map((item) => (
                      <div key={item} className={`flex items-start gap-3 rounded-lg px-4 py-3 text-sm ${ui.chip}`}>
                        <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${ui.eyebrow === 'text-[#DB1A1A]' ? 'bg-[#DB1A1A]' : 'bg-current'}`} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden rounded-2xl shadow-lg ${ui.detailPanel}`}>
                <div className="px-8 py-5">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Location</p>
                  <h2 className={`mt-2 text-2xl font-semibold ${ui.title}`}>Find us on the map</h2>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[350px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className={`rounded-2xl p-6 shadow-lg ${ui.detailAside}`}>
              <div className="flex items-center gap-3">
                <div className={`h-1 w-12 ${ui.eyebrow === 'text-[#DB1A1A]' ? 'bg-[#DB1A1A]' : 'bg-current'}`} />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Contact</p>
              </div>
              <div className="mt-6 space-y-4">
                {location ? (
                  <div className={`flex items-start gap-4 rounded-xl px-4 py-3 ${ui.chip}`}>
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm">{location}</span>
                  </div>
                ) : null}
                {phone ? (
                  <div className={`flex items-center gap-4 rounded-xl px-4 py-3 ${ui.chip}`}>
                    <Phone className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{phone}</span>
                  </div>
                ) : null}
                {email ? (
                  <div className={`flex items-center gap-4 rounded-xl px-4 py-3 ${ui.chip}`}>
                    <Mail className="h-5 w-5 shrink-0" />
                    <span className="text-sm break-all">{email}</span>
                  </div>
                ) : null}
                {website ? (
                  <div className={`flex items-center gap-4 rounded-xl px-4 py-3 ${ui.chip}`}>
                    <Globe className="h-5 w-5 shrink-0" />
                    <span className="text-sm break-all">{website}</span>
                  </div>
                ) : null}
              </div>
              {website ? (
                <a href={website} target="_blank" rel="noreferrer" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-transform hover:scale-[1.02] ${ui.primaryButton}`}>
                  Visit website
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className={`rounded-2xl p-6 shadow-lg ${ui.detailPanel}`}>
              <div className="flex items-center gap-3">
                <div className={`h-1 w-12 ${ui.eyebrow === 'text-[#DB1A1A]' ? 'bg-[#DB1A1A]' : 'bg-current'}`} />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Category</p>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${ui.chip}`}>
                  <Tag className="h-4 w-4" />
                  {category || taskLabel}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl p-8 shadow-lg ${ui.detailPanel}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-12 ${ui.eyebrow === 'text-[#DB1A1A]' ? 'bg-[#DB1A1A]' : 'bg-current'}`} />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Recommended</p>
                  </div>
                  <h2 className={`mt-3 text-3xl font-semibold ${ui.title}`}>More nearby matches</h2>
                  <p className={`mt-2 text-sm ${ui.muted}`}>Discover similar {taskLabel.toLowerCase()} in your area</p>
                </div>
                <span className={`inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${ui.chip}`}>
                  <Tag className="h-3.5 w-3.5" />
                  {taskLabel}
                </span>
              </div>
              <div className={`mt-8 ${ui.relatedGrid}`}>
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} compact />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
