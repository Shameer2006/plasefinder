import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/app/components/Toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import SiteShell from "@/app/components/SiteShell";
import { Outfit, Oswald } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata = {
  title: "LostStreet — The Fun Free World Detective & Geography Game",
  description: "Get dropped onto random streets around the world! Look for silly clues, guess where you are, duel your friends in 1v1 battles, and explore 780,000+ locations for free.",
  metadataBase: new URL("https://www.loststreet.online"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "loststreet", "street view guesser", "lost street", "loststreet game", "loststreet online", "play loststreet", "free street view guesser", "street view guesser game", "street view geography guesser", "google street view guesser",
    "world detective game", "free geography guessing game", "street view guessing game", "guess the location game", "guess the country game online", "panorama guessing game", "world geography game online", "guess where game", "random street view game", "location guessing game free",
    "play geography game online free", "play street view game", "online map guessing game", "play world map game", "geography quiz game online", "free online geography game", "multiplayer geography game", "geography game no download",
    "game where you guess your location", "game to guess country from street view", "spawn random location guess game", "AI hint geography game", "blur mode guessing game", "guess the city from photo game", "street view geography quiz", "explore random places online game", "virtual travel guessing game", "daily geography guessing game", "geography challenge game online",
    "geography learning game online", "fun way to learn world map", "educational geography game free", "geography practice game", "learn countries game online", "map skills game online", "geography trivia game free",
    "geography game for mobile", "browser based geography game", "no download geography game", "free to play map game", "lightweight geography web game", "bollard recognition game", "license plate geography quiz", "360 panorama location guesser"
  ],
  openGraph: {
    title: "LostStreet — Fun Free World Detective Game",
    description: "Drop onto random streets around the world! Spot funny clues, guess the country, and duel friends in 1v1 matches. 100% free with no sign-up required.",
    url: "https://www.loststreet.online",
    siteName: "LostStreet",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LostStreet — Fun Free World Detective Game",
    description: "Travel the whole planet from your couch! Guess random streets, challenge friends in 1v1 duels, and explore 780,000+ real locations for free.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/logo-3d-square.png?v=3' },
      { url: '/icon.png?v=3', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png?v=3', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/logo-3d-square.png?v=3',
    apple: '/apple-touch-icon.png?v=3'
  },
  verification: {
    google: "google28b6dbf4d718a7b0",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0d1a",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LostStreet",
    "alternateName": ["Lost Street", "LostStreet Game", "LostStreet World Detective", "Street View Guesser Game"],
    "url": "https://www.loststreet.online",
    "description": "A fun and free world detective game with 780,000+ real street view locations. Travel the planet from home, spot funny clues, guess where you are, and duel friends in real-time 1v1 battles.",
    "applicationCategory": "GameApplication",
    "applicationSubCategory": "Geography Game",
    "operatingSystem": "Web",
    "browserRequirements": "Requires a modern web browser",
    "featureList": [
      "780,000+ hand-picked street view locations across 195+ countries",
      "Real-time 1v1 ELO multiplayer duels",
      "Private party room codes to play together with friends",
      "Daily login streak rewards and 3D Gold Coins",
      "World Flag quiz mode",
      "Helpful power-ups including 50/50 and smart clues"
    ],
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
    "@type": "WebSite",
    "name": "LostStreet",
    "alternateName": "LostStreet World Detective Game",
    "url": "https://www.loststreet.online",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.loststreet.online/guides?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is LostStreet?",
        "acceptedAnswer": { "@type": "Answer", "text": "LostStreet is a fun, free online world detective game. You are dropped onto a random street anywhere in the world and use visual clues to guess where you are on the map." }
      },
      {
        "@type": "Question",
        "name": "Is LostStreet free to play?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! LostStreet is 100% free with no subscriptions, no daily limits, and no credit card required. You can play right away in your browser." }
      },
      {
        "@type": "Question",
        "name": "How do you guess the location in LostStreet?",
        "acceptedAnswer": { "@type": "Answer", "text": "Look around in 360 degrees for clues like road signs, language on buildings, which side of the road cars drive on, license plates, and nature. Then click on the map to make your guess!" }
      },
      {
        "@type": "Question",
        "name": "Can I play LostStreet with friends?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can play real-time 1v1 duels against players worldwide or create private party rooms to play with up to 20 friends." }
      },
      {
        "@type": "Question",
        "name": "What is the daily challenge in LostStreet?",
        "acceptedAnswer": { "@type": "Answer", "text": "The LostStreet daily challenge is a daily round where players test their street view guessing skills, track consecutive play streaks, and climb the global leaderboards." }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LostStreet",
    "url": "https://www.loststreet.online",
    "logo": "https://www.loststreet.online/icon.png",
    "sameAs": [
      "https://www.reddit.com/r/LostStreet",
      "https://www.instagram.com/loststreet.online"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "LostStreet Main Navigation",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Flag Guesser Quiz",
        "description": "Test your knowledge of world flags in our free flag identifier game.",
        "url": "https://www.loststreet.online/flag-guesser"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "How to Play & Guides",
        "description": "Learn how to guess locations from street view, country clues, and geography tips.",
        "url": "https://www.loststreet.online/guides"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "How to Play & Guides",
        "description": "Learn how to guess locations from street view, country clues, and geography tips.",
        "url": "https://www.loststreet.online/guides"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "World Map & Chronicles",
        "description": "Explore location guides and street view panoramas by country.",
        "url": "https://www.loststreet.online/chronicles"
      },

      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Community",
        "description": "Join the LostStreet geography community and updates.",
        "url": "https://www.loststreet.online/community"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "About LostStreet",
        "description": "Learn about LostStreet, the free street view guesser game.",
        "url": "https://www.loststreet.online/about"
      }
    ]
  }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${oswald.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msvalidate.01" content="3B92B95C23615C35821E1600A4267ABE" />
        <link rel="alternate" hrefLang="en" href="https://www.loststreet.online" />
        <link rel="alternate" hrefLang="x-default" href="https://www.loststreet.online" />
        <meta name="geo.region" content="001" />
        <meta name="geo.placename" content="Worldwide" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD structured data */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* AdSense — lazyOnload so it does not compete with main thread first paint */}
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1006713173738488"
          crossOrigin="anonymous"
          strategy="lazyOnload"
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

        {/* Microsoft Clarity — lazyOnload to prioritize user interaction */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xzld5hwny4");
            `,
          }}
        />
      </body>
    </html>
  );
}
