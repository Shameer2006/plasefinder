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

  const embedUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${currentLocation.lat},${currentLocation.lng}&heading=210&pitch=10&fov=90`;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* UI Blocker Overlay to hide Place/Road names */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '450px', 
        height: '90px', 
        background: 'rgba(0, 0, 0, 0.95)', 
        zIndex: 10,
        borderBottomRightRadius: '12px'
      }} />

      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
}
