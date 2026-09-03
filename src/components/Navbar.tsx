'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/cms'

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[color:rgb(245_244_239_/_0.92)] backdrop-blur border-b border-[var(--line)]">
      <div className="container h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="display font-bold text-xl"
        >
          {settings.siteName.split(' — ')[0]}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/">Home</Link>

          <Link href="/gallery">Gallery</Link>

          <Link href="/testimonials">Testimonials</Link>

          <Link
            href="/#apply"
            className="rounded-full bg-[var(--ink)] !text-white px-5 py-2.5"
          >
            {settings.primaryCtaText}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav className="md:hidden container pb-5 grid gap-4 text-lg">
          <Link
            onClick={() => setOpen(false)}
            href="/"
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/gallery"
          >
            Gallery
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/testimonials"
          >
            Testimonials
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/#apply"
            className="!text-white bg-[var(--ink)] rounded-full px-5 py-2.5 w-fit"
          >
            {settings.primaryCtaText}
          </Link>
        </nav>
      )}
    </header>
  )
}