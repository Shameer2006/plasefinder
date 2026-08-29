// Session-level history to avoid showing the same location twice
const recentlyUsed = new Set();
const MAX_HISTORY = 50;

// Pre-fetched location pools keyed by country code (e.g., 'WORLDWIDE', 'IN', 'US')
// to make starting and round transitions instant (0ms) without mixing different countries.
const locationPools = new Map();
const fetchingPools = new Set();

function getPoolKey(gameOptions = {}) {
  if (gameOptions.country && gameOptions.country !== 'WORLDWIDE') {
    return gameOptions.country.toUpperCase();
  }
  return 'WORLDWIDE';
}

function locationKey(loc) {
  return `${loc.lat},${loc.lng}`;
}

function addToHistory(loc) {
  const key = locationKey(loc);
  recentlyUsed.add(key);
  if (recentlyUsed.size > MAX_HISTORY) {
    const first = recentlyUsed.values().next().value;
    recentlyUsed.delete(first);
  }
}

function isRecent(loc) {
  return recentlyUsed.has(locationKey(loc));
}

function formatLocationResult(locations) {
  let available = locations.filter(loc => !isRecent(loc));
  if (available.length === 0) {
    available = locations;
  }

  const targetIndex = Math.floor(Math.random() * available.length);
  const location = available[targetIndex];
  addToHistory(location);

  const allCountries = locations.map(loc => loc.country);
  const uniqueCountries = [...new Set(allCountries)];
  const wrongCountries = uniqueCountries.filter(c => c !== location.country);

  const fallbackCountries = ['US', 'JP', 'BR', 'AU', 'ZA', 'DE', 'IN', 'MX', 'NG', 'NZ'];
  while (wrongCountries.length < 3) {
    const fb = fallbackCountries.find(c => c !== location.country && !wrongCountries.includes(c));
    if (fb) wrongCountries.push(fb);
    else break;
  }

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  wrongCountries.sort(() => Math.random() - 0.5);
  const selectedWrong = wrongCountries.slice(0, 3).map(code => ({ 
    country: regionNames.of(code) || code,
    iso: code.toLowerCase() 
  }));

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
}

/**
 * Pre-warms the location pool in the background for a specific country or worldwide.
 */
export const prefetchLocations = async (gameOptions = {}) => {
  const poolKey = getPoolKey(gameOptions);
  const currentPool = locationPools.get(poolKey) || [];

  if (fetchingPools.has(poolKey) || currentPool.length >= 3) return;
  fetchingPools.add(poolKey);

  try {
    let url = '/api/locations?count=5';
    if (poolKey !== 'WORLDWIDE') {
      url += `&country=${poolKey}`;
    } else {
      url += '&minContinents=3';
    }

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data?.locations?.length) {
        const pool = locationPools.get(poolKey) || [];
        pool.push(data.locations);
        locationPools.set(poolKey, pool);
      }
    }
  } catch (err) {
    // Non-critical background prefetch
  } finally {
    fetchingPools.delete(poolKey);
  }
};

/**
 * Fetch a batch of random locations from the server API or matching country pool.
 * Returns { location, options } for the current round.
 */
export const fetchRandomLocation = async (gameOptions = {}) => {
  const poolKey = getPoolKey(gameOptions);
  const currentPool = locationPools.get(poolKey) || [];

  // If we have pre-fetched locations available for THIS specific country/mode, use them instantly!
  if (currentPool.length > 0) {
    const cachedLocations = currentPool.shift();
    locationPools.set(poolKey, currentPool);
    // Refill pool in background for this specific country
    setTimeout(() => prefetchLocations(gameOptions), 100);
    return formatLocationResult(cachedLocations);
  }

  let url = '/api/locations?count=5';
  if (poolKey !== 'WORLDWIDE') {
    url += `&country=${poolKey}`;
  } else {
    url += '&minContinents=3';
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    const { locations } = await response.json();
    if (!locations || locations.length === 0) {
      throw new Error(`No locations found for ${poolKey}`);
    }
    // Pre-fetch next batch in background for seamless next round
    setTimeout(() => prefetchLocations(gameOptions), 200);
    return formatLocationResult(locations);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw error;
  }
};
