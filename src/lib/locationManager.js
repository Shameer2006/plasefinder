// Session-level history to avoid showing the same location twice
const recentlyUsed = new Set();
const MAX_HISTORY = 50;

function locationKey(loc) {
  return `${loc.lat},${loc.lng}`;
}

function addToHistory(loc) {
  const key = locationKey(loc);
  recentlyUsed.add(key);
  // Trim history if it exceeds the max
  if (recentlyUsed.size > MAX_HISTORY) {
    const first = recentlyUsed.values().next().value;
    recentlyUsed.delete(first);
  }
}

function isRecent(loc) {
  return recentlyUsed.has(locationKey(loc));
}

/**
 * Fetch a batch of diverse random locations from the server API.
 * Returns { location, options } for the current round.
 */
export const fetchRandomLocation = async (gameOptions = {}) => {
  let url = '/api/locations?count=5';
  if (gameOptions.country && gameOptions.country !== 'WORLDWIDE') {
    url += `&country=${gameOptions.country}`;
  } else {
    url += '&minContinents=3';
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.statusText}`);
  }

  const { locations } = await response.json();

  // Filter out recently used locations
  let available = locations.filter(loc => !isRecent(loc));

  // If all are recent (very unlikely with 260K), use them anyway
  if (available.length === 0) {
    available = locations;
  }

  // Pick the first available as the target location
  const targetIndex = Math.floor(Math.random() * available.length);
  const location = available[targetIndex];

  // Track it
  addToHistory(location);

  // Build multiple-choice options from the batch
  // Use the other locations' countries as wrong answers
  const allCountries = locations.map(loc => loc.country);
  const uniqueCountries = [...new Set(allCountries)];

  // Get wrong country codes (different from the target)
  const wrongCountries = uniqueCountries.filter(c => c !== location.country);

  // If we don't have enough wrong countries from this batch, add some fallbacks
  const fallbackCountries = ['US', 'JP', 'BR', 'AU', 'ZA', 'DE', 'IN', 'MX', 'NG', 'NZ'];
  while (wrongCountries.length < 3) {
    const fb = fallbackCountries.find(c => c !== location.country && !wrongCountries.includes(c));
    if (fb) wrongCountries.push(fb);
    else break;
  }

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  // Shuffle and pick 3 wrong answers
  wrongCountries.sort(() => Math.random() - 0.5);
  const selectedWrong = wrongCountries.slice(0, 3).map(code => ({ 
    country: regionNames.of(code) || code,
    iso: code.toLowerCase() 
  }));

  // Build options array (3 wrong + 1 correct), shuffled
  const options = [...selectedWrong, { 
    country: regionNames.of(location.country) || location.country,
    iso: location.country.toLowerCase()
  }];
  options.sort(() => Math.random() - 0.5);

  return {
    location: {
      ...location,
      country: regionNames.of(location.country) || location.country,
      iso: location.country.toLowerCase()
    },
    options
  };
};
