'use client';
import { useGameStore } from '@/lib/store';

export default function PanoramaViewer() {
  const { currentLocation } = useGameStore();

  if (!currentLocation) return null;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Google Maps API Key missing.<br/>
          (Current mock location: {currentLocation.lat}, {currentLocation.lng})
        </p>
      </div>
    );
  }

  // Build embed URL — prefer panoId for guaranteed Street View coverage
  const heading = currentLocation.heading ?? 210;
  const pitch = currentLocation.pitch ?? 10;
  let embedUrl;

  if (currentLocation.panoId) {
    // Use pano= for guaranteed panorama (no "Sorry, no imagery" errors)
    embedUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&pano=${currentLocation.panoId}&heading=${heading}&pitch=${pitch}&fov=90`;
  } else {
    // Fallback to lat/lng (Google finds nearest coverage, may fail)
    embedUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${currentLocation.lat},${currentLocation.lng}&heading=${heading}&pitch=${pitch}&fov=90`;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <iframe
        width="100%"
        frameBorder="0"
        src={embedUrl}
        allowFullScreen
        loading="eager"
        style={{
          border: 'none',
          width: '100vw',
          height: 'calc(100vh + 300px)',
          transform: 'translateY(-285px)',
          backgroundColor: '#1a1a2e',
        }}
      ></iframe>
    </div>
  );
}
