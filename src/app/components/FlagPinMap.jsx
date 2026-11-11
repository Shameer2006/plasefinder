'use client';
import { useEffect, useState } from 'react';
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

const WORLD_BOUNDS = [
  [-85, -180],
  [85, 180]
];

// Calculate minimum zoom so a single 360-degree world fills the viewport width without repeating or leaving margins
function computeSingleWorldMinZoom(width) {
  if (!width || width <= 0) return 2;
  const rawZoom = Math.log2(width / 256);
  // Snap up to nearest 0.25 step, clamped between 2.0 and 3.5
  const snapped = Math.ceil(rawZoom * 4) / 4;
  return Math.max(2, Math.min(3.5, snapped));
}

function MapClickHandler({ onLocationSelect, disabled }) {
  useMapEvents({
    click(e) {
      if (disabled) return;
      // Clamp longitude cleanly within [-180, 180]
      const wrappedLng = ((((e.latlng.lng + 180) % 360) + 360) % 360) - 180;
      onLocationSelect({ lat: e.latlng.lat, lng: wrappedLng });
      try {
        sounds.playPinDrop();
      } catch (err) {}
    },
  });
  return null;
}

function MapResizer({ minZoom }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.setMinZoom(minZoom);
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timeout);
  }, [map, minZoom]);
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
  const [minZoom, setMinZoom] = useState(() =>
    typeof window !== 'undefined' ? computeSingleWorldMinZoom(window.innerWidth) : 2.5
  );

  useEffect(() => {
    const updateMinZoom = () => setMinZoom(computeSingleWorldMinZoom(window.innerWidth));
    window.addEventListener('resize', updateMinZoom);
    return () => window.removeEventListener('resize', updateMinZoom);
  }, []);

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
    background: '#75cff0'
  } : {
    width: '100%',
    height,
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(160, 125, 85, 0.35)',
    boxShadow: '0 8px 32px rgba(60, 37, 20, 0.2)',
    position: 'relative',
    background: '#75cff0'
  };

  return (
    <div className="google-anno-skip" style={containerStyle}>
      <style>{`
        .leaflet-container {
          background: ${mapType === 'satellite' ? '#0b192c' : '#75cff0'} !important;
        }
      `}</style>
      <MapContainer
        center={[20, 0]}
        zoom={minZoom}
        minZoom={minZoom}
        maxZoom={18}
        zoomSnap={0.25}
        zoomDelta={0.5}
        worldCopyJump={false}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          key={mapType}
          url={`https://mt{s}.google.com/vt/lyrs=${mapType === 'satellite' ? 'y' : 'm'}&x={x}&y={y}&z={z}&scale=2`}
          subdomains={['0', '1', '2', '3']}
          maxZoom={20}
          noWrap={true}
          bounds={WORLD_BOUNDS}
        />

        <MapResizer minZoom={minZoom} />
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
