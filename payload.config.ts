import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Work } from './src/collections/Work'
import { Testimonials } from './src/collections/Testimonials'
import { FAQs } from './src/collections/FAQs'
import { Applications } from './src/collections/Applications'
import { Clients } from './src/collections/Clients'
import { SiteSettings } from './src/collections/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URL
const usePostgres = databaseURL?.startsWith('postgres')

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname, 'src/app/(payload)') },
  },
  collections: [Users, Media, Work, Testimonials, FAQs, Applications, Clients],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-only-change-me',
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: databaseURL },
      })
    : sqliteAdapter({
        client: { url: databaseURL || 'file:./data/portfolio.db' },
      }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },
  upload: { limits: { fileSize: 10000000 } },
})
