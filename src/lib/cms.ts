import { getPayload } from 'payload'
import config from '@payload-config'

export async function cms() {
  return getPayload({ config })
}

export async function getWork({
  featured,
  limit,
  page = 1,
  category,
}: {
  featured?: boolean
  limit?: number
  page?: number
  category?: string
} = {}) {
  const payload = await cms()

  const where: any = {
    published: { equals: true },
  }

  if (featured !== undefined) {
    where.featured = { equals: featured }
  }

  if (category) {
    where.category = { equals: category }
  }

  const result = await payload.find({
    collection: 'work',
    where,
    sort: 'sortOrder',
    limit: limit ?? 100,
    page,
    depth: 1,
  })

  return {
    docs: result.docs as unknown as WorkItem[],
    totalPages: result.totalPages,
    page: result.page,
    totalDocs: result.totalDocs,
  }
}

export async function getTestimonials({
  limit = 100,
  featured,
}: {
  limit?: number
  featured?: boolean
} = {}) {
  const payload = await cms()

  const where: any = {
    published: { equals: true },
  }

  if (featured !== undefined) {
    where.featured = { equals: featured }
  }

  const result = await payload.find({
    collection: 'testimonials',
    where,
    sort: 'sortOrder',
    limit,
    depth: 1,
  })

  return result.docs as unknown as Testimonial[]
}

export async function getFAQs() {
  const payload = await cms()

  const result = await payload.find({
    collection: 'faqs',
    where: {
      published: { equals: true },
    },
    sort: 'sortOrder',
    limit: 100,
  })

  return result.docs as unknown as FAQ[]
}

export async function getClients() {
  const payload = await cms()

  const result = await payload.find({
    collection: 'clients',
    where: {
      published: { equals: true },
    },
    sort: 'sortOrder',
    limit: 100,
    depth: 1,
  })

  return result.docs as unknown as Client[]
}

export async function getSettings() {
  const payload = await cms()

  return (await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })) as unknown as SiteSettings
}

export type MediaRef = {
  url?: string
  alt?: string
  filename?: string
  sizes?: Record<string, { url?: string }>
}

export type WorkItem = {
  id: string
  title: string
  slug: string
  thumbnail: MediaRef
  channelName: string
  channelAvatar?: MediaRef
  videoUrl?: string
  views?: string
  publishedLabel?: string
  description?: string
  category?: string
  featured?: boolean
  sortOrder?: number
  altText?: string
}

export type Testimonial = {
  id: string
  clientName: string
  clientRole?: string
  companyOrChannel?: string
  subscriberCount?: string
  avatar?: MediaRef
  quote: string
  featured?: boolean
  sortOrder?: number
}

export type FAQ = {
  id: string
  question: string
  answer: string
  sortOrder?: number
}

export type Client = {
  id: string
  name: string
  logo?: MediaRef
  metric?: string
  featured?: boolean
  sortOrder?: number
}

export type SiteSettings = {
  siteName: string
  logo?: MediaRef
  heroImage?: MediaRef
  heroHeading: string
  heroDescription: string
  availabilityLabel: string
  primaryCtaText: string
  secondaryCtaText: string
  emailAddress: string
  socialLinks?: {
    label: string
    url: string
    id?: string
  }[]
  footerText: string
}