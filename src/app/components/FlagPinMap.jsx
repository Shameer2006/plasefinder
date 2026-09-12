'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGameStore } from '@/lib/store';
import { sounds } from '@/lib/sounds';

// Standard blue pin for player's guess
const guessIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Green pin for actual target country location
const actualIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationSelect, disabled }) {
  useMapEvents({
    click(e) {
      if (disabled) return;
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      try {
        sounds.playPinDrop();
      } catch (err) {}
    },
  });
  return null;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (map) map.invalidateSize();
    }, 250);
    return () => clearTimeout(timeout);
  }, [map]);
  return null;
}

function MapFitter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds || bounds.length < 2) return;
    const timeout = setTimeout(() => {
      try {
        if (map) {
          map.fitBounds(bounds, { padding: [80, 80], maxZoom: 6 });
        }
      } catch (err) {
        console.warn('Map bounds fit error:', err);
      }
    }, 350);
    return () => clearTimeout(timeout);
  }, [bounds, map]);
  return null;
}

export default function FlagPinMap({
  userPin,
  onPinSelect,
  targetLocation,
  isResultMode = false,
  isFullScreen = false,
  height = '100%'
}) {
  const { mapType } = useGameStore();

  const bounds = isResultMode && userPin && targetLocation
    ? [[userPin.lat, userPin.lng], [targetLocation.lat, targetLocation.lng]]
    : null;

  const containerStyle = isFullScreen ? {
    position: 'absolute',
    inset: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    zIndex: 1,
    background: '#0a0f1d'
  } : {
    width: '100%',
    height,
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    background: '#0d1117'
  };

  return (
    <div style={containerStyle}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={1.5}
        maxZoom={18}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          key={mapType}
          url={`https://mt{s}.google.com/vt/lyrs=${mapType === 'satellite' ? 'y' : 'm'}&x={x}&y={y}&z={z}&scale=2`}
          subdomains={['0', '1', '2', '3']}
          maxZoom={20}
        />

        <MapResizer />
        <MapClickHandler onLocationSelect={onPinSelect} disabled={isResultMode} />

        {/* User's Placed Pin */}
        {userPin && (
          <Marker position={[userPin.lat, userPin.lng]} icon={guessIcon}>
            {isResultMode && (
              <Tooltip direction="bottom" offset={[0, 10]} opacity={0.95} permanent>
                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Your Guess
                </div>
              </Tooltip>
            )}
          </Marker>
        )}

        {/* Target Country Location (Revealed only in Result Mode) */}
        {isResultMode && targetLocation && (
          <>
            <Marker position={[targetLocation.lat, targetLocation.lng]} icon={actualIcon}>
              <Tooltip direction="top" offset={[0, -38]} opacity={0.95} permanent>
                <div style={{ textAlign: 'center', color: '#059669', fontWeight: 800, fontSize: '0.9rem' }}>
                  <div>{targetLocation.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>Actual Country</div>
                </div>
              </Tooltip>
            </Marker>

            {/* Connecting Polyline */}
            {userPin && (
              <Polyline
                positions={[
                  [userPin.lat, userPin.lng],
                  [targetLocation.lat, targetLocation.lng]
                ]}
                color="#3b82f6"
                weight={3}
                dashArray="6, 8"
                opacity={0.8}
              />
            )}

            <MapFitter bounds={bounds} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
