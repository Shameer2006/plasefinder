'use client';
import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGameStore } from '@/lib/store';
import { sounds } from '@/lib/sounds';
import { hintCircle } from '@/lib/hintUtils';

// Fix for default Leaflet icon in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
      sounds.playPinDrop();
    },
  });
  return null;
}

function MapResizer({ isExpanded }) {
  const map = useMap();
  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 300); // Wait for CSS transition
    return () => clearTimeout(timeout);
  }, [isExpanded, map]);
  return null;
}

function MapCenterer({ country }) {
  const map = useMap();
  useEffect(() => {
    if (country && country !== 'WORLDWIDE') {
      fetch('/countryCoordinates.json')
        .then(res => res.json())
        .then(coords => {
          if (coords[country]) {
            // Set view to country center with appropriate zoom
            map.setView([coords[country].lat, coords[country].lng], 5);
          }
        });
    } else {
      map.setView([20, 0], 1);
    }
  }, [country, map]);
  return null;
}

export default function GuessingMap({ onGuess, country }) {
  const [markerPos, setMarkerPos] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setUserGuess, setGameState, currentLocation, currentRound, usedHint, setUsedHint, mapType } = useGameStore();

  // Detect touch/mobile device
  useEffect(() => {
    const checkMobile = () => {
      const touch = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.innerWidth <= 768;
      setIsMobile(touch || narrow);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGuess = useCallback(() => {
    if (markerPos) {
      if (onGuess) {
        onGuess(markerPos.lat, markerPos.lng);
      } else {
        setUserGuess({ lat: markerPos.lat, lng: markerPos.lng });
        setGameState('RESULT');
      }
    }
  }, [markerPos, onGuess, setUserGuess, setGameState]);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleUseHint = () => {
    setUsedHint(true);
  };

  let circleHint = null;
  if (usedHint && currentLocation) {
    circleHint = hintCircle(currentLocation, 20000, currentRound);
  }

  return (
    <>
      {/* The map panel */}
      <div 
        className={`glass-panel map-container ${isExpanded ? 'expanded' : ''}`}
        style={{
          transition: 'all 0.3s ease',
          zIndex: 10,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => { if (!isMobile) setIsExpanded(true); }}
        onMouseLeave={() => { if (!isMobile) setIsExpanded(false); }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer 
            center={[20, 0]} 
            zoom={1} 
            style={{ height: '100%', width: '100%' }}
            attributionControl={false}
          >
            <TileLayer
              key={mapType}
              url={`https://mt{s}.google.com/vt/lyrs=${mapType === 'satellite' ? 'y' : 'm'}&x={x}&y={y}&z={z}&scale=2`}
              subdomains={['0', '1', '2', '3']}
              maxZoom={20}
            />
            <MapClickHandler onLocationSelect={setMarkerPos} />
            <MapResizer isExpanded={isExpanded} />
            <MapCenterer country={country} />
            {markerPos && <Marker position={markerPos} icon={customIcon} />}
            {usedHint && circleHint && (
              <Circle
                center={[circleHint.center.lat, circleHint.center.lng]}
                radius={circleHint.radiusMeters}
                pathOptions={{
                  color: 'red',
                  fillColor: 'red',
                  fillOpacity: 0.2,
                  weight: 2
                }}
              />
            )}
          </MapContainer>
        </div>
        
        {/* Submit button - shown when expanded (desktop hover or mobile toggle) */}
        {isExpanded && (
          <div style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {!usedHint && (
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.8rem', color: '#fbbf24', borderColor: '#fbbf24' }}
                onClick={handleUseHint}
                title="Use Hint (-50% Score)"
              >
                💡
              </button>
            )}
            <button 
              className="btn" 
              style={{ flex: 1, padding: '0.8rem' }}
              disabled={!markerPos}
              onClick={handleGuess}
            >
              {markerPos ? 'Make Guess' : 'Place a pin on the map'}
            </button>
            {/* Close button on mobile */}
            {isMobile && (
              <button 
                className="btn" 
                style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.15)' }}
                onClick={toggleExpand}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile-only floating toggle button */}
      {isMobile && !isExpanded && (
        <button
          className="btn mobile-map-toggle"
          onClick={toggleExpand}
          aria-label={markerPos ? 'View Map and Guess' : 'Open Map'}
          aria-expanded={isExpanded}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 11,
            padding: '14px 28px',
            fontSize: '1.1rem',
            fontWeight: '700',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'rgba(59, 130, 246, 0.3)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
            <line x1="9" y1="3" x2="9" y2="18"></line>
            <line x1="15" y1="6" x2="15" y2="21"></line>
          </svg>
          {markerPos ? 'View Map & Guess' : 'Open Map'}
        </button>
      )}
    </>
  );
}

