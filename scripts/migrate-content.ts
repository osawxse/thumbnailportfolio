import fs from 'fs'
import path from 'path'

const { default: config } = await import('../payload.config')
const { getPayload } = await import('payload')

const exportPath = path.resolve(process.cwd(), 'scripts/sqlite-export.json')
const mapPath = path.resolve(process.cwd(), 'scripts/media-map.json')

const data = JSON.parse(fs.readFileSync(exportPath, 'utf8'))
const mediaMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'))

const payload = await getPayload({ config })

function mediaId(oldId: number | null | undefined) {
  if (oldId == null) return undefined

  const newId = mediaMap[String(oldId)]

  if (!newId) {
    throw new Error(`No migrated media found for SQLite media ID ${oldId}`)
  }

  return newId
}

console.log('Starting CMS content migration...')
console.log('')

for (const item of data.work) {
  await payload.create({
    collection: 'work',
    data: {
      title: item.title,
      slug: item.slug,
      thumbnail: mediaId(item.thumbnail),
      channelName: item.channelName,
      channelAvatar: mediaId(item.channelAvatar),
      videoUrl: item.videoUrl,
      views: item.views,
      publishedLabel: item.publishedLabel,
      description: item.description,
      category: item.category,
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
      altText: item.altText,
    },
  })

  console.log(`Work: ${item.title}`)
}

for (const item of data.testimonials) {
  await payload.create({
    collection: 'testimonials',
    data: {
      clientName: item.clientName,
      clientRole: item.clientRole,
      companyOrChannel: item.companyOrChannel,
      subscriberCount: item.subscriberCount,
      avatar: mediaId(item.avatar),
      quote: item.quote,
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
    },
  })

  console.log(`Testimonial: ${item.clientName}`)
}

for (const item of data.faqs) {
  await payload.create({
    collection: 'faqs',
    data: {
      question: item.question,
      answer: item.answer,
      published: item.published,
      sortOrder: item.sortOrder,
    },
  })

  console.log(`FAQ: ${item.question}`)
}

for (const item of data.applications) {
  await payload.create({
    collection: 'applications',
    data: {
      fullName: item.fullName,
      email: item.email,
      company: item.company,
      role: item.role,
      youtubeChannel: item.youtubeChannel,
      service: item.service,
      projectDescription: item.projectDescription,
      monthlyVideoVolume: item.monthlyVideoVolume,
      budget: item.budget,
      desiredStartDate: item.desiredStartDate,
      additionalInfo: item.additionalInfo,
      status: item.status,
      submittedAt: item.submittedAt,
    },
  })

  console.log(`Application: ${item.fullName}`)
}

for (const item of data.clients) {
  await payload.create({
    collection: 'clients',
    data: {
      name: item.name,
      logo: mediaId(item.logo),
      metric: item.metric,
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
    },
  })

  console.log(`Client: ${item.name}`)
}

const settings = data.siteSettings

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    siteName: settings.siteName,
    logo: mediaId(settings.logo),
    heroImage: mediaId(settings.heroImage),
    heroHeading: settings.heroHeading,
    heroDescription: settings.heroDescription,
    availabilityLabel: settings.availabilityLabel,
    primaryCtaText: settings.primaryCtaText,
    secondaryCtaText: settings.secondaryCtaText,
    emailAddress: settings.emailAddress,
    socialLinks: settings.socialLinks,
    footerText: settings.footerText,
  },
})

console.log('')
console.log('Site settings migrated.')
console.log('')
console.log('CMS CONTENT MIGRATION COMPLETE')