import type { ReactNode } from 'react'
import '@/styles/globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getSettings } from '@/lib/cms'
export default async function SiteLayout({children}:{children:ReactNode}){const settings=await getSettings();return <><Navbar settings={settings}/><main>{children}</main><Footer settings={settings}/></>}
