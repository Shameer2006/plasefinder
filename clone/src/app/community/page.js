export const metadata = {
  title: "LostStreet Community — Street View Guesser Player Network",
  description: "Join the global LostStreet street view guesser community. Connect with top geography guessers on Reddit and Instagram, share panoramic location tips, and discuss strategy.",
  alternates: { canonical: "https://www.loststreet.online/community" },
  keywords: [
    "loststreet community", "street view guesser community", "geoguessr alternative community",
    "geography guessing reddit", "loststreet discord instagram", "street view clues community"
  ],
  openGraph: {
    title: "LostStreet Community — Street View Guesser Players",
    description: "Join the LostStreet street view guesser player network. Share guesses, learn geography clues, and participate in community duels.",
    url: "https://www.loststreet.online/community",
  },
};

import CommunityClient from './CommunityClient';

export default function CommunityPage() {
  return <CommunityClient />;
}
