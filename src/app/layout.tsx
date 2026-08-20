import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Denvertrip | Luxury Airport Transportation Denver",
  description: "Premium private airport transportation from Denver International Airport (DEN) to destinations throughout Denver and Colorado. Luxury SUVs, executive sedans, and stretch limousines.",
  metadataBase: new URL("https://denvertrip.com"),
  alternates: {
    canonical: "https://denvertrip.com/",
  },
  openGraph: {
    title: "Denvertrip | Luxury Airport Transportation",
    description: "Premium private airport transportation from Denver International Airport.",
    url: "https://denvertrip.com/",
    type: "website",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Consent Mode v2 Default */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var stored = localStorage.getItem('cookie_consent');
            var analytics = 'denied', ads = 'denied';
            if (stored) {
              try {
                var p = JSON.parse(stored);
                if (p.analytics) analytics = 'granted';
                if (p.advertising) ads = 'granted';
              } catch(e){}
            }
            gtag('consent', 'default', {
              'analytics_storage': analytics,
              'ad_storage': ads,
              'ad_user_data': ads,
              'ad_personalization': ads
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M9G2945W');
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9G2945W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Central Tracking Script */}
        <Script src="/tracking.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
