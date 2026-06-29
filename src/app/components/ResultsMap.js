'use client';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon in Next.js
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// A green icon for the actual location
const actualIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function MapFitter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      // Small timeout to ensure container is fully rendered before fitting
      setTimeout(() => {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }, 300);
    }
  }, [bounds, map]);
  return null;
}

// Function to calculate distance between two coordinates in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

export default function ResultsMap({ location, players }) {
  const actualPos = [location.lat, location.lng];
  
  // Prepare bounds starting with the actual location
  const bounds = [actualPos];
  
  const playerMarkers = players.map(player => {
    if (!player.lastGuess) return null;
    const guessPos = [player.lastGuess.lat, player.lastGuess.lng];
    bounds.push(guessPos);
    
    const distance = Math.round(calculateDistance(actualPos[0], actualPos[1], guessPos[0], guessPos[1]));
    
    return {
      uid: player.uid,
      displayName: player.displayName,
      pos: guessPos,
      distance: distance
    };
  }).filter(Boolean);

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
      <MapContainer 
        center={actualPos} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Actual Location Marker */}
        <Marker position={actualPos} icon={actualIcon}>
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
            <div style={{ fontWeight: 'bold', color: '#059669', textAlign: 'center' }}>
              <div>{location.name || location.country || 'Actual Location'}</div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>Actual Location</div>
            </div>
          </Tooltip>
        </Marker>

        {/* Player Guesses */}
        {playerMarkers.map(pm => (
          <LayerGroup key={pm.uid}>
            <Marker position={pm.pos} icon={defaultIcon}>
              <Tooltip direction="bottom" offset={[0, 10]} opacity={0.9} permanent>
                <div style={{ textAlign: 'center' }}>
                  <strong>{pm.displayName}</strong><br/>
                  {pm.distance} km
                </div>
              </Tooltip>
            </Marker>
            
            {/* Draw a line between guess and actual location */}
            <Polyline 
              positions={[actualPos, pm.pos]} 
              color="#3b82f6" 
              weight={3} 
              dashArray="5, 10" 
              opacity={0.6}
            />
          </LayerGroup>
        ))}
        
        <MapFitter bounds={bounds} />
      </MapContainer>
    </div>
  );
}
