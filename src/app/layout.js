import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "LostStreet - Free GeoGuessr Alternative | Explore the World",
  description: "Play LostStreet — a free geography guessing game. Drop a pin on the map, compete with friends, and test your world knowledge. No subscription needed.",
  metadataBase: new URL("https://www.loststreet.online"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "loststreet", "loststreet game", "loststreet online", "play loststreet", "loststreet geography game", "lost street",
    "geoguessr alternative", "free geography guessing game", "street view guessing game", "guess the location game", "guess the country game online", "panorama guessing game", "world geography game online", "guess where game", "random street view game", "location guessing game free",
    "play geography game online free", "play street view game", "online map guessing game", "play world map game", "geography quiz game online", "free online geography game", "multiplayer geography game", "geography game no download",
    "game where you guess your location", "game to guess country from street view", "spawn random location guess game", "AI hint geography game", "blur mode guessing game", "guess the city from photo game", "street view geography quiz", "explore random places online game", "virtual travel guessing game", "panoramic view country guesser", "daily geography guessing game", "geography challenge game online",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LostStreet",
  "alternateName": ["Lost Street", "LostStreet Game"],
  "url": "https://www.loststreet.online",
  "description": "Free geography guessing game. Guess locations from Street View, compete in multiplayer duels, and climb the leaderboard. A free GeoGuessr alternative.",
  "applicationCategory": "GameApplication",
  "applicationSubCategory": "Geography Game",
  "operatingSystem": "Web",
  "browserRequirements": "Requires a modern web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "100"
  },
  "keywords": "loststreet, loststreet game, loststreet online, play loststreet, loststreet geography game, lost street, geoguessr alternative, free geography guessing game, street view guessing game, guess the location game, guess the country game online, panorama guessing game, world geography game online, guess where game, random street view game, location guessing game free, play geography game online free, play street view game, online map guessing game, play world map game, geography quiz game online, free online geography game, multiplayer geography game, geography game no download, game where you guess your location, game to guess country from street view, spawn random location guess game, AI hint geography game, blur mode guessing game, guess the city from photo game, street view geography quiz, explore random places online game, virtual travel guessing game, panoramic view country guesser, daily geography guessing game, geography challenge game online, geography learning game online, fun way to learn world map, educational geography game free, geography practice game, learn countries game online, map skills game online, geography trivia game free, geography game for mobile, browser based geography game, no download geography game, free to play map game, lightweight geography web game"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>

        <AuthProvider>
          {children}
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
