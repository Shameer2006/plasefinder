/**
 * Convert latitude and longitude to Cartesian coordinates.
 * Used to compute map "spread" (maxDist) for ranking.
 */
export function latLngToCartesian(lat, lng) {
  const R = 6371; // Earth radius in km
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  const x = R * Math.cos(phi) * Math.cos(theta);
  const y = R * Math.cos(phi) * Math.sin(theta);
  const z = R * Math.sin(phi);
  return { x, y, z };
}

/**
 * Calculate the Euclidean distance between two Cartesian coordinates.
 */
export function calculateDistance(cart1, cart2) {
  const dx = cart1.x - cart2.x;
  const dy = cart1.y - cart2.y;
  const dz = cart1.z - cart2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
