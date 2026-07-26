import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/app/components/Toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import SiteShell from "@/app/components/SiteShell";

export const metadata = {
  title: "LostStreet — Free GeoGuessr Alternative | Play Now, No Signup",
  description: "Play LostStreet free — no signup needed. Guess locations from Street View, compete in multiplayer duels, and take the daily challenge. 780,000+ locations. 100% free forever.",
  metadataBase: new URL("https://www.loststreet.online"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "loststreet", "loststreet game", "loststreet online", "play loststreet", "loststreet geography game", "lost street",
    "geoguessr alternative", "free geography guessing game", "street view guessing game", "guess the location game", "guess the country game online", "panorama guessing game", "world geography game online", "guess where game", "random street view game", "location guessing game free",
    "play geography game online free", "play street view game", "online map guessing game", "play world map game", "geography quiz game online", "free online geography game", "multiplayer geography game", "geography game no download",
    "game where you guess your location", "game to guess country from street view", "spawn random location guess game", "AI hint geography game", "blur mode guessing game", "guess the city from photo game", "street view geography quiz", "explore random places online game", "virtual travel guessing game", "daily geography guessing game", "geography challenge game online",
    "geography learning game online", "fun way to learn world map", "educational geography game free", "geography practice game", "learn countries game online", "map skills game online", "geography trivia game free",
    "geography game for mobile", "browser based geography game", "no download geography game", "free to play map game", "lightweight geography web game"
  ],
  openGraph: {
    title: "LostStreet - Free Geography Guessing Game",
    description: "Guess locations from street views, compete in multiplayer, and climb the leaderboard. 100% free.",
    url: "https://www.loststreet.online",
    siteName: "LostStreet",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LostStreet - Free GeoGuessr Alternative",
    description: "Guess locations from street views. Play solo or with friends. 100% free.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', sizes: '144x144', type: 'image/png' }
    ],
    apple: '/icon.png'
  },
  verification: {
    google: "google28b6dbf4d718a7b0",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LostStreet",
    "alternateName": ["Lost Street", "LostStreet Game", "LostStreet Geography Game"],
    "url": "https://www.loststreet.online",
    "description": "Free geography guessing game with 780,000+ Street View locations. Guess locations, compete in multiplayer duels, and take daily challenges. A free GeoGuessr alternative — no subscription needed.",
    "applicationCategory": "GameApplication",
    "applicationSubCategory": "Geography Game",
    "operatingSystem": "Web",
    "browserRequirements": "Requires a modern web browser",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "312",
      "bestRating": "5"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is LostStreet free to play?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, LostStreet is 100% free with no subscription, no sign-up required, and unlimited rounds." }
      },
      {
        "@type": "Question",
        "name": "Is LostStreet a GeoGuessr alternative?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. LostStreet is a free GeoGuessr alternative with real-time multiplayer duels, daily challenges, party mode, and 780,000+ street view locations — all without a subscription." }
      },
      {
        "@type": "Question",
        "name": "Can I play LostStreet on mobile?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. LostStreet works on all modern mobile browsers. No app download needed — just visit loststreet.online." }
      },
      {
        "@type": "Question",
        "name": "How does multiplayer work in LostStreet?",
        "acceptedAnswer": { "@type": "Answer", "text": "LostStreet features real-time 1v1 ELO-ranked matchmaking and private party rooms with a 6-digit code for up to 20 players." }
      },
      {
        "@type": "Question",
        "name": "What is the daily challenge in LostStreet?",
        "acceptedAnswer": { "@type": "Answer", "text": "The daily challenge is a once-per-day round that tracks your consecutive play streak and awards bonus XP for consistent play." }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LostStreet",
    "url": "https://www.loststreet.online",
    "logo": "https://www.loststreet.online/logo.png",
    "sameAs": [
      "https://www.reddit.com/r/LostStreet",
      "https://www.instagram.com/loststreet.online"
    ]
  }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msvalidate.01" content="3B92B95C23615C35821E1600A4267ABE" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" as="image" href="/bg.jpg" />
        {/* JSON-LD structured data — static, no hydration issues */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* AdSense — plain async, no hydration impact */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1006713173738488"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5HMDH2F4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AuthProvider>
          <ToastProvider>
            <SiteShell>{children}</SiteShell>
          </ToastProvider>
        </AuthProvider>
        <SpeedInsights />
        <Analytics />

        {/* GTM — afterInteractive prevents SSR/client script-order mismatch */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HMDH2F4');`,
          }}
        />

        {/* GA4 — afterInteractive prevents SSR/client script-order mismatch */}
        <Script
          id="gtag-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DCGEKHZZHL"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DCGEKHZZHL');
            `,
          }}
        />
      </body>
    </html>
  );
}
