import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

import { getLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "DenveroTrip | Luxury Airport Transportation & Chauffeur Service Denver",
  description: "Premium private airport transportation from Denver International Airport (DEN) to downtown Denver, Vail, Aspen, Breckenridge, and Colorado ski resorts. Luxury SUVs, executive sedans, and Sprinter vans. 24/7 service.",
  keywords: [
    "Denver airport transportation",
    "private car service Denver",
    "luxury chauffeur Denver",
    "Denver to Vail transfer",
    "Denver to Aspen private car",
    "Colorado ski resort transportation",
    "executive car service Denver",
    "DenveroTrip"
  ],
  authors: [{ name: "DenveroTrip" }],
  creator: "DenveroTrip",
  publisher: "DenveroTrip",
  metadataBase: new URL("https://denverotrip.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "DenveroTrip | Luxury Airport & Mountain Transportation Denver",
    description: "Premium private airport transportation from Denver International Airport. Serving Denver, Vail, Aspen, and all of Colorado.",
    url: "https://denverotrip.com/",
    siteName: "DenveroTrip",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "DenveroTrip - Luxury Airport Transportation Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DenveroTrip | Luxury Airport Transportation",
    description: "Premium private airport transportation from Denver International Airport.",
    creator: "@DenveroTrip",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Consent Mode v2 Default — runs BEFORE any Google tag */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            try {
              var _c = localStorage.getItem('cookie_consent');
              var _an = 'denied', _ad = 'denied', _pe = 'denied';
              if (_c) {
                var _p = JSON.parse(_c);
                if (_p.analytics === true)     _an = 'granted';
                if (_p.advertising === true)   _ad = 'granted';
                if (_p.personalization === true) _pe = 'granted';
              }
              gtag('consent', 'default', {
                'analytics_storage': _an,
                'ad_storage':        _ad,
                'ad_user_data':      _ad,
                'ad_personalization':_pe
              });
            } catch(e) {
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage':        'denied',
                'ad_user_data':      'denied',
                'ad_personalization':'denied'
              });
            }
          `}
        </Script>

        {/* Google Tag Manager — GTM-M9G2945W */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M9G2945W');
          `}
        </Script>

        {/* Google Tag Manager — GTM-KHJKVZB3 */}
        <Script id="google-tag-manager-2" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KHJKVZB3');
          `}
        </Script>

        {/* Google Ads Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18485059764"
          strategy="afterInteractive"
        />
        {/* Google Ads config — gtag() already declared in consent-mode script above */}
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'AW-18485059764');
          `}
        </Script>

        {/* Google AdSense Auto Ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2612536732942195"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Global LocalBusiness Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager noscript — GTM-M9G2945W */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9G2945W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Tag Manager noscript — GTM-KHJKVZB3 */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHJKVZB3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Cookie Consent Banner — Google Consent Mode v2 */}
        <CookieConsent />

        {children}

        {/* Central Tracking Script */}
        <Script src="/tracking.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
