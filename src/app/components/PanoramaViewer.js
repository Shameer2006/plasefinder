'use client';
import { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { useGameStore } from '@/lib/store';

export default function PanoramaViewer() {
  const { currentLocation } = useGameStore();
  const mapRef = useRef(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    if (!currentLocation || !mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API Key missing.");
      return;
    }

    const initMap = async () => {
      setOptions({
        apiKey: apiKey,
        version: "weekly",
      });

      const { StreetViewPanorama } = await importLibrary("streetView");

      if (!panoramaRef.current) {
        panoramaRef.current = new StreetViewPanorama(mapRef.current, {
          position: { lat: currentLocation.lat, lng: currentLocation.lng },
          pov: { heading: 210, pitch: 10 },
          zoom: 1,
          addressControl: false,
          showRoadLabels: false,
          fullscreenControl: false,
          zoomControl: true,
          panControl: true,
          enableCloseButton: false,
          linksControl: true,
          motionTrackingControl: false,
        });
      } else {
        panoramaRef.current.setPosition({ lat: currentLocation.lat, lng: currentLocation.lng });
      }
    };

    initMap();
  }, [currentLocation]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Google Maps API Key missing.<br/>
          (Current mock location: {currentLocation?.lat}, {currentLocation?.lng})
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
