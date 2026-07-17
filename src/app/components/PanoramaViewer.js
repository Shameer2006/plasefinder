'use client';
import { useGameStore } from '@/lib/store';
import { useState, useEffect, useRef } from 'react';

export default function PanoramaViewer() {
  const { currentLocation } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const iframeRef = useRef(null);
  const prevLocationRef = useRef(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // We only run this effect when currentLocation changes
  useEffect(() => {
    if (!currentLocation || !apiKey || !iframeRef.current) return;

    const { lat, lng, heading = 210, pitch = 10 } = currentLocation;
    const locationKey = `${lat}-${lng}`;
    const locationChanged = prevLocationRef.current !== locationKey;

    if (locationChanged || !prevLocationRef.current) {
      setLoading(true);
      setHasLoaded(false); // Hide iframe during load
      
      const newSrc = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=100`;
      iframeRef.current.src = newSrc;
      
      prevLocationRef.current = locationKey;
    }
  }, [currentLocation, apiKey]);

  if (!currentLocation) return null;

  if (!apiKey) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#f87171', padding: '2rem', textAlign: 'center' }}>
          Google Maps API Key missing.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        style={{
          width: '100vw',
          height: 'calc(100vh + 300px)',
          zIndex: 100,
          transform: 'translateY(-285px)',
          border: 'none',
          backgroundColor: '#1a1a2e', // Dark background to prevent white flash during loading
          opacity: hasLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out' // Smooth fade in when loaded
        }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => {
          setLoading(false);
          setHasLoaded(true);
        }}
      ></iframe>
      
      {/* Invisible overlay to block clicking links in the iframe if needed */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60px', zIndex: 10 }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60px', zIndex: 10 }}></div>
    </div>
  );
}
