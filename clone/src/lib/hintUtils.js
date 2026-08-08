// Hint utilities

/**
 * Generates a mock contextual text hint based on the location's country.
 * This is used as a fallback for Easy Mode when no user-generated clues exist.
 */
export function generateContextualHint(location) {
  if (!location || !location.country) {
    return "This place is famous for its unique local culture and history.";
  }

  const hints = {
    'US': "This place is famous for its diverse landscapes, from coast to coast.",
    'JP': "This location is known for its blend of ancient traditions and ultra-modern cities.",
    'BR': "This country is famous for its massive rainforest and passion for football.",
    'FR': "This place is known worldwide for its cuisine, art, and historic landmarks.",
    'IT': "This location is famous for its ancient Roman history and incredible pasta.",
    'GB': "This place is known for its historic castles, rolling countryside, and tea culture.",
    'CA': "This country is famous for its vast wilderness, maple syrup, and friendly locals.",
    'AU': "This location is known for its unique wildlife and beautiful beaches.",
    'DE': "This place is famous for its engineering, castles, and rich history.",
    'ZA': "This country is known for its stunning wildlife safaris and diverse culture.",
    'IN': "This place is famous for its rich spices, vibrant festivals, and historic temples.",
    'MX': "This location is known for its incredible food, ancient ruins, and beautiful beaches."
  };

  const isoCode = location.iso ? location.iso.toUpperCase() : null;
  
  if (isoCode && hints[isoCode]) {
    return hints[isoCode];
  }

  // Fallback for other countries
  return `This location is in a country known for its rich history and unique geography. Look closely at the language and architecture!`;
}

/**
 * Hint-circle geometry (ported from reference folder).
 * Returns the hint circle for a location: an offset center + radius (meters).
 * Deterministic per (location, round) so it never moves within a round.
 */
const EARTH_RADIUS_M = 6371000;
const OLD_BASE_HINT_RADIUS_M_AT_EQUATOR = 5870363.8;

function seededRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function destinationPoint(lat, lng, distanceMeters, bearingRadians) {
  const lat1 = (lat * Math.PI) / 180;
  const lon1 = (lng * Math.PI) / 180;
  const angularDistance = distanceMeters / EARTH_RADIUS_M;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
      Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearingRadians)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearingRadians) * Math.sin(angularDistance) * Math.cos(lat1),
      Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
    );
  const normalizedLon = ((((lon2 * 180) / Math.PI + 540) % 360) - 180);
  return { lat: (lat2 * 180) / Math.PI, lng: normalizedLon };
}

export function hintCircle(location, maxDist = 20000, round = 1, maxRadiusMeters = Infinity) {
  // We use `lng` or `long` interchangeably
  const locLng = location.lng !== undefined ? location.lng : location.long;
  
  if (!location || location.lat == null || locLng == null) {
    return { center: { lat: 0, lng: 0 }, radiusMeters: 1000000 };
  }
  const maxDistScale = maxDist / 20000;
  const latScale = Math.abs(Math.cos((location.lat * Math.PI) / 180));
  
  const radiusMeters = Math.min(
    OLD_BASE_HINT_RADIUS_M_AT_EQUATOR * maxDistScale * latScale,
    maxRadiusMeters
  );
  
  const seed = (round ?? 1) + Math.abs(location.lat * 1000 + locLng * 1000);
  const offsetAngle = seededRandom(seed * 3) * 2 * Math.PI;
  const offsetAmount = Math.sqrt(seededRandom(seed * 7)) * radiusMeters;
  const center = destinationPoint(location.lat, locLng, offsetAmount, offsetAngle);
  
  return { center, radiusMeters };
}
