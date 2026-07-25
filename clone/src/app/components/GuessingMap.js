'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

export default function GuessingMap() {
  const [markerPos, setMarkerPos] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { setUserGuess, setGameState } = useGameStore();

  const handleGuess = () => {
    if (markerPos) {
      setUserGuess({ lat: markerPos.lat, lng: markerPos.lng });
      setGameState('RESULT');
    }
  };

  return (
    <div 
      className="glass-panel"
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: isExpanded ? '600px' : '300px',
        height: isExpanded ? '400px' : '200px',
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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onLocationSelect={setMarkerPos} />
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
