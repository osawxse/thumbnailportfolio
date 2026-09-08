import fs from 'fs'
import path from 'path'

process.env.DATABASE_URL = 'file:./data/portfolio.db'
process.env.BLOB_READ_WRITE_TOKEN = ''

const { default: config } = await import('../payload.config')
const { getPayload } = await import('payload')

const payload = await getPayload({ config })

const collections = [
  'users',
  'media',
  'work',
  'testimonials',
  'faqs',
  'applications',
  'clients',
] as const

const result: Record<string, unknown> = {}

for (const collection of collections) {
  const docs = await payload.find({
    collection,
    limit: 1000,
    depth: 0,
  })

  result[collection] = docs.docs

  console.log(`${collection}: ${docs.docs.length} records`)
}

const siteSettings = await payload.findGlobal({
  slug: 'site-settings',
  depth: 0,
})

result.siteSettings = siteSettings

const outputPath = path.resolve(process.cwd(), 'scripts/sqlite-export.json')

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

console.log('')
console.log(`Export written to: ${outputPath}`)
console.log('READ-ONLY EXPORT COMPLETE')

process.exit(0)