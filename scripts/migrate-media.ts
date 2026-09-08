import fs from 'fs'
import path from 'path'

process.env.DATABASE_URL = process.env.DATABASE_URL || ''
process.env.BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || ''

const { default: config } = await import('../payload.config')
const { getPayload } = await import('payload')

const exportPath = path.resolve(process.cwd(), 'scripts/sqlite-export.json')
const exportData = JSON.parse(fs.readFileSync(exportPath, 'utf8'))

const payload = await getPayload({ config })

const media = exportData.media

console.log(`Found ${media.length} media records to migrate.`)
console.log('')

const mediaMap: Record<string, string | number> = {}

for (const sourceMedia of media) {
  const sourcePath = path.resolve(
    process.cwd(),
    'public',
    'media',
    sourceMedia.filename,
  )

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source file: ${sourcePath}`)
  }

  console.log(`Uploading: ${sourceMedia.filename}`)

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: sourceMedia.alt || '',
    },
    filePath: sourcePath,
  })

  mediaMap[String(sourceMedia.id)] = created.id

  console.log(`  SQLite ID ${sourceMedia.id} -> Neon ID ${created.id}`)
}

const mapPath = path.resolve(process.cwd(), 'scripts/media-map.json')

fs.writeFileSync(mapPath, JSON.stringify(mediaMap, null, 2))

console.log('')
console.log(`Media migration complete: ${media.length} files`)
console.log(`ID map written to: ${mapPath}`)