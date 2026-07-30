export const metadata = {
  title: "Global Leaderboard & ELO Rankings — LostStreet Street View Guesser",
  description: "View top-ranked street view guesser players on the official LostStreet leaderboard. Compare ELO ratings, total XP, duel wins, and daily challenge streaks.",
  alternates: {
    canonical: "https://www.loststreet.online/leaderboard"
  },
  keywords: [
    "loststreet leaderboard", "street view guesser rankings", "geoguessr alternative leaderboard",
    "street view duel elo", "geography game champions", "top street view guessers"
  ],
  openGraph: {
    title: "Global Leaderboard — LostStreet Street View Guesser",
    description: "Compete with street view guesser players worldwide. View ELO rankings, duel stats, and daily streaks on LostStreet.",
    url: "https://www.loststreet.online/leaderboard",
  },
};

export default function LeaderboardLayout({ children }) {
  return children;
}
