import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings } from '@/lib/cms'

export function Hero({ settings: s }: { settings: SiteSettings }) {
  const heroImage = s.heroImage?.url || ''
  const logo = s.logo?.url || ''

  return (
    <section className="section pt-20 md:pt-28">
      <div className="container">
        <div className="flex items-center gap-2 mono reveal">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] border border-black" />
          {s.availabilityLabel}
        </div>

        <div className="grid lg:grid-cols-[1.3fr_.7fr] gap-12 mt-8 items-end">
          <h1 className="display text-[clamp(3.3rem,8vw,8.5rem)] leading-[.9] max-w-5xl reveal delay-1">
            {s.heroHeading}
          </h1>

          <div className="reveal delay-2">
            {/* Logo */}
            {logo && (
              <div className="mb-12 w-40 h-40 rounded-full overflow-hidden border border-black flex items-center justify-center">
                <Image
                  src={logo}
                  alt={s.siteName}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
            </div>
            )}

            <p className="text-lg leading-7 text-[var(--muted)]">
              {s.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/#apply"
                className="rounded-full bg-[var(--ink)] !text-white px-6 py-3 font-semibold"
              >
                {s.primaryCtaText}
              </Link>

              <Link
                href="/gallery"
                className="rounded-full border border-black px-6 py-3 font-semibold"
              >
                {s.secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 relative overflow-hidden rounded-[28px] border border-black bg-black aspect-video">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white">
              <p className="mono text-white/60">
                Upload a Hero Image in Site Settings
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.15)_45%,rgba(0,0,0,.65)_100%)]" />

          <div className="absolute inset-0 z-10 grid place-items-center px-6">
            <div className="text-center text-white max-w-4xl">
              <span className="mono text-[var(--accent)]">
                Portfolio / 2026
              </span>
              <p className="display text-4xl md:text-7xl mt-4 leading-[.95]">
                Stop. Click. Watch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}