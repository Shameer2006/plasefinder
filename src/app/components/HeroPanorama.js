'use client';
import { useState, useEffect, useRef } from 'react';

const STREET_VIEW_LOCATIONS = [
  // Countryside & Scenic Highways (like the game scene)
  { name: "Highland Highway, Lesotho", lat: -29.6200, lng: 28.2500, heading: 90, pitch: 0 },
  { name: "Ring Road 1, Iceland", lat: 64.9125, lng: -14.2384, heading: 140, pitch: 0 },
  { name: "Route 66, Arizona, USA", lat: 35.2890, lng: -113.5684, heading: 260, pitch: 0 },
  { name: "Milford Sound Road, New Zealand", lat: -44.8210, lng: 168.0410, heading: 320, pitch: 2 },
  { name: "Icefields Parkway, Banff, Canada", lat: 51.5204, lng: -116.4802, heading: 350, pitch: 0 },
  { name: "Great Ocean Road, Victoria, Australia", lat: -38.6811, lng: 143.1492, heading: 240, pitch: 0 },
  { name: "Chapman's Peak Drive, Cape Town, South Africa", lat: -34.0883, lng: 18.3582, heading: 190, pitch: 0 },
  { name: "Ruta 40, Patagonia, Argentina", lat: -49.3315, lng: -72.8860, heading: 170, pitch: 0 },
  { name: "Atacama Highway, Chile", lat: -23.8642, lng: -68.1408, heading: 210, pitch: 0 },
  { name: "Trollstigen Mountain Pass, Norway", lat: 62.4542, lng: 7.6714, heading: 160, pitch: -3 },

  // World Famous Cities & Iconic Streets
  { name: "Champs-Élysées, Paris, France", lat: 48.8698, lng: 2.3075, heading: 290, pitch: 0 },
  { name: "Shibuya Crossing, Tokyo, Japan", lat: 35.6595, lng: 139.7005, heading: 20, pitch: 0 },
  { name: "Times Square, New York, USA", lat: 40.7580, lng: -73.9855, heading: 30, pitch: 0 },
  { name: "Abbey Road, London, UK", lat: 51.5320, lng: -0.1778, heading: 140, pitch: 0 },
  { name: "Amalfi Coast Road, Italy", lat: 40.6333, lng: 14.6027, heading: 120, pitch: -2 },
  { name: "Oia Village, Santorini, Greece", lat: 36.4618, lng: 25.3753, heading: 210, pitch: 0 },
  { name: "Hollywood Boulevard, Los Angeles, USA", lat: 34.1016, lng: -118.3416, heading: 90, pitch: 0 },
  { name: "La Rambla, Barcelona, Spain", lat: 41.3818, lng: 2.1732, heading: 140, pitch: 0 },
  { name: "Lombard Street, San Francisco, USA", lat: 37.8021, lng: -122.4187, heading: 260, pitch: -5 },
  { name: "Nyhavn, Copenhagen, Denmark", lat: 55.6799, lng: 12.5912, heading: 250, pitch: 0 },
  { name: "Interlaken Avenue, Switzerland", lat: 46.6863, lng: 7.8632, heading: 190, pitch: 0 },
  { name: "Grand Canal Street, Venice, Italy", lat: 45.4371, lng: 12.3326, heading: 180, pitch: 0 },
  { name: "Nanjing Road, Shanghai, China", lat: 31.2347, lng: 121.4746, heading: 90, pitch: 0 },
  { name: "Via Roma, Florence, Italy", lat: 43.7719, lng: 11.2548, heading: 180, pitch: 0 },
  { name: "Princes Street, Edinburgh, Scotland", lat: 55.9520, lng: -3.1966, heading: 270, pitch: 0 },
  { name: "Kaufingerstraße, Munich, Germany", lat: 48.1378, lng: 11.5721, heading: 90, pitch: 0 },
  { name: "Gran Vía, Madrid, Spain", lat: 40.4200, lng: -3.7058, heading: 260, pitch: 0 },
  { name: "Stradun, Dubrovnik, Croatia", lat: 42.6414, lng: 18.1082, heading: 280, pitch: 0 }
];

// Hash function for daily random street seed
function getDailySeededIndex(seed, total) {
  let h = seed ^ 0x9e3779b9;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) % total;
}

export default function HeroPanorama() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeRef = useRef(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Calculate 24-hour random street index based on epoch day
  useEffect(() => {
    const updateDailyStreet = () => {
      const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
      const dailyIndex = getDailySeededIndex(daysSinceEpoch, STREET_VIEW_LOCATIONS.length);
      setCurrentIdx(dailyIndex);
    };

    updateDailyStreet();

    // Check every hour if day changed
    const interval = setInterval(updateDailyStreet, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // Defer iframe creation slightly so first paint is instant
  useEffect(() => {
    if (!apiKey) return;
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [apiKey]);

  const currentPano = STREET_VIEW_LOCATIONS[currentIdx] || STREET_VIEW_LOCATIONS[0];

  return (
    <div className="hero-panorama-container" style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: '#0a0d1a'
    }}>
      {/* Background fallback gradient for instant 0ms visual */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, #151e36 0%, #0a0d1a 70%, #060812 100%)',
        zIndex: 0,
      }} />

      {/* Google Street View Panorama Iframe Background (Deferred) */}
      {apiKey && shouldLoadIframe ? (
        <iframe
          ref={iframeRef}
          src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${currentPano.lat},${currentPano.lng}&heading=${currentPano.heading}&pitch=${currentPano.pitch}&fov=100`}
          onLoad={() => setIframeLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: 'calc(100vh + 300px)',
            transform: 'translateY(-150px) scale(1.05)',
            border: 'none',
            pointerEvents: 'auto',
            zIndex: 1,
            filter: 'brightness(0.9) contrast(1.05)',
            opacity: iframeLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}

      {/* Dark Vignette Overlay for UI Contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'radial-gradient(circle at center, rgba(10,13,26,0.2) 0%, rgba(10,13,26,0.75) 75%, rgba(10,13,26,0.95) 100%), linear-gradient(to bottom, rgba(10,13,26,0.85) 0%, rgba(10,13,26,0.2) 25%, rgba(10,13,26,0.4) 75%, rgba(10,13,26,0.92) 100%)',
        pointerEvents: 'none'
      }} />

      {/* On-ground movement chevrons overlay */}
      <div className="hero-chevrons-overlay" style={{
        position: 'absolute',
        bottom: '22%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.7,
        pointerEvents: 'none'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'bounce-up 2s infinite' }}>
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-18px', animation: 'bounce-up 2s infinite 0.2s' }}>
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </div>
  );
}
