import type React from "react"
import type { Metadata } from "next"
import { Cormorant } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Smallz Plates | Custom Plates and Craft Cocktails",
  description: "Experience custom plates and craft cocktails at Smallz Plates.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-black text-white font-cormorant">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  )
}

// Separate client-side only component for scripts
"use client"
function AnalyticsScripts() {
  return (
    <>
      <Script id="schema-script" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Smallz Plates",
            "image": "https://example.com/images/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "30100 Telegraph Road",
              "addressLocality": "Bingham Farms",
              "addressRegion": "MI",
              "postalCode": "48025",
              "addressCountry": "US"
            },
            "telephone": "+1-248-555-0130",
            "servesCuisine": "Custom Plates, Craft Cocktails",
            "priceRange": "$$",
            "openingHours": "Mo-Su 11:00-23:00"
          }
        `}
      </Script>
      <Script id="ga4-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','G-XXXXXXXXX');
        `}
      </Script>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '123456789012345');
          fbq('track', 'PageView');
        `}
      </Script>
      <Script
        id="cookiebot"
        strategy="afterInteractive"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="YOUR-COOKIEBOT-ID"
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=G-XXXXXXXXX"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  )
}
