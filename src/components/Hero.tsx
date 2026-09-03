import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings, WorkItem } from '@/lib/cms'

type HeroProps = {
  settings: SiteSettings
  work: WorkItem[]
}

export function Hero({ settings: s, work }: HeroProps) {
  // Always create 9 cells.
  // If there is only one thumbnail, it fills all 9 cells.
  const collage =
    work.length > 0
      ? Array.from({ length: 9 }, (_, index) => work[index % work.length])
      : []

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

        {/* Portfolio grid */}
        <div className="mt-20 md:mt-28 relative overflow-hidden rounded-[28px] border border-black bg-black aspect-[16/7]">

          {/* 3 x 3 thumbnail grid */}
          <div className="absolute inset-0 z-0 p-2">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full">
              {collage.map((item, index) => {
                // THIS IS THE SAME IMAGE LOGIC USED BY WORKCARD
                const src =
                  item.thumbnail?.sizes?.card?.url ||
                  item.thumbnail?.url ||
                  ''

                if (!src) return null

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/40" />

          {/* Vignette */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.2)_45%,rgba(0,0,0,.7)_100%)]" />

          {/* Center content */}
          <div className="absolute inset-0 z-20 grid place-items-center px-6">
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