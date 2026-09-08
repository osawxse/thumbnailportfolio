import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'

/* =========================================================
   BASIC SITE METADATA
   =========================================================
   These are the default metadata values for the site.
   Individual pages can override them with their own metadata.
*/
export const metadata: Metadata = {
  metadataBase: new URL('https://closethoodie.vercel.app'),

  title: 'Thumbnail Designer',
  description: 'Professional YouTube thumbnail design.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

/* =========================================================
   ROOT LAYOUT
   =========================================================
   This layout wraps the entire website, so scripts placed
   here are loaded across all pages.
*/
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* =================================================
            GOOGLE ANALYTICS
            =================================================
            Loads Google's gtag library after the page becomes
            interactive so Analytics does not block the initial
            page rendering.

            Replace BOTH instances of YOUR_GOOGLE_ANALYTICS_ID
            with your actual Google Analytics ID, for example:
            G-XXXXXXXXXX

            Keep your Analytics ID private; do not post it here.
        */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FY0PX3EDHB"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-FY0PX3EDHB');
          `}
        </Script>
      </body>
    </html>
  )
}