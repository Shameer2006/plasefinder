'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGameStore } from '@/lib/store';

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
  const { setUserGuess, setGameState } = useGameStore();

  const handleGuess = () => {
    if (markerPos) {
      if (onGuess) {
        onGuess(markerPos.lat, markerPos.lng);
      } else {
        setUserGuess({ lat: markerPos.lat, lng: markerPos.lng });
        setGameState('RESULT');
      }
    }
  };

  return (
    <div 
      className={`glass-panel map-container ${isExpanded ? 'expanded' : ''}`}
      style={{
        transition: 'all 0.3s ease',
        zIndex: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer 
          center={[20, 0]} 
          zoom={1} 
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapClickHandler onLocationSelect={setMarkerPos} />
          <MapResizer isExpanded={isExpanded} />
          <MapCenterer country={country} />
          {markerPos && <Marker position={markerPos} icon={customIcon} />}
        </MapContainer>
      </div>
      
      {isExpanded && (
        <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
          <button 
            className="btn" 
            style={{ width: '100%', padding: '0.8rem' }}
            disabled={!markerPos}
            onClick={handleGuess}
          >
            {markerPos ? 'Make Guess' : 'Place a pin on the map'}
          </button>
        </div>
      )}
    </div>
  );
}
