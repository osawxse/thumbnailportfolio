import { getPayload } from 'payload'
import config from '../payload.config'

const payload = await getPayload({ config })

const work = await payload.find({
  collection: 'work',
  limit: 100,
  depth: 0,
})

const testimonials = await payload.find({
  collection: 'testimonials',
  limit: 100,
  depth: 0,
})

const settings = await payload.findGlobal({
  slug: 'site-settings',
  depth: 0,
})

console.log('PRODUCTION DATABASE CHECK')
console.log('Work:', work.totalDocs)
console.log('Testimonials:', testimonials.totalDocs)
console.log('Site:', settings.siteName)
console.log('Hero:', settings.heroHeading)

process.exit(0)