import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  const score = params.score;
  const url = `https://www.loststreet.online/api/og?score=${score}`;

  return {
    title: `I scored ${score} points on LostStreet!`,
    description: "Can you beat my score? Play LostStreet, the free geography guessing game.",
    openGraph: {
      title: `I scored ${score} points on LostStreet!`,
      description: "Can you beat my score? Play LostStreet, the free geography guessing game.",
      images: [
        {
          url: url,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `I scored ${score} points on LostStreet!`,
      description: "Can you beat my score? Play LostStreet, the free geography guessing game.",
      images: [url],
    },
  };
}

export default function SharePage() {
  redirect('/');
}
