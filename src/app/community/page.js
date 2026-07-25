export const metadata = {
  title: 'Community — LostStreet',
  description: 'Join the LostStreet community on Reddit and Instagram. Share your best guesses, compete with players worldwide, and help us grow the free geography game.',
  alternates: { canonical: '/community' },
};

import CommunityClient from './CommunityClient';

export default function CommunityPage() {
  return <CommunityClient />;
}
