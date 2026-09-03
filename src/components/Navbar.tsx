'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/cms'

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)

  const handleWorkWithMe = () => {
    setOpen(false)

    // If we're already on the homepage, smoothly scroll to the form
    if (window.location.pathname === '/') {
      const applySection = document.getElementById('apply')

      if (applySection) {
        applySection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      return
    }

    // If we're on another page, perform a real navigation.
    // The browser will load the homepage and automatically
    // position the page at #apply.
    window.location.href = '/#apply'
  }

  return (
    <header className="sticky top-0 z-50 bg-[color:rgb(245_244_239_/_0.92)] backdrop-blur border-b border-[var(--line)]">
      <div className="container h-20 flex items-center justify-between">
        <Link
          href="/"
          className="display font-bold text-xl"
        >
          {settings.siteName.split(' — ')[0]}
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/">
            Home
          </Link>

          <Link href="/gallery">
            Gallery
          </Link>

          <Link href="/testimonials">
            Testimonials
          </Link>

          <button
            type="button"
            onClick={handleWorkWithMe}
            className="cursor-pointer rounded-full bg-[var(--ink)] !text-white px-5 py-2.5"
          >
            {settings.primaryCtaText}
          </button>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="cursor-pointer md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

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

          <button
            type="button"
            onClick={handleWorkWithMe}
            className="cursor-pointer !text-white bg-[var(--ink)] rounded-full px-5 py-2.5 w-fit"
          >
            {settings.primaryCtaText}
          </button>
        </nav>
      )}
    </header>
  )
}