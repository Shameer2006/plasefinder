// Session-level history to avoid showing the same location twice
const recentlyUsed = new Set();
const MAX_HISTORY = 50;

// Pre-fetched location pool to make starting and round transitions instant (0ms)
const locationPool = [];
let isFetchingPool = false;

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
 * Pre-warms the location pool in the background (called on menu mount).
 */
export const prefetchLocations = async (gameOptions = {}) => {
  if (isFetchingPool || locationPool.length >= 3) return;
  isFetchingPool = true;

  try {
    let url = '/api/locations?count=5';
    if (gameOptions.country && gameOptions.country !== 'WORLDWIDE') {
      url += `&country=${gameOptions.country}`;
    } else {
      url += '&minContinents=3';
    }

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data?.locations?.length) {
        locationPool.push(data.locations);
      }
    }
  } catch (err) {
    // Non-critical background prefetch
  } finally {
    isFetchingPool = false;
  }
};

/**
 * Fetch a batch of diverse random locations from the server API or pool.
 * Returns { location, options } for the current round.
 */
export const fetchRandomLocation = async (gameOptions = {}) => {
  // If we have pre-fetched locations available, use them instantly!
  if (locationPool.length > 0) {
    const cachedLocations = locationPool.shift();
    // Refill pool in background
    setTimeout(() => prefetchLocations(gameOptions), 100);
    return formatLocationResult(cachedLocations);
  }

  let url = '/api/locations?count=5';
  if (gameOptions.country && gameOptions.country !== 'WORLDWIDE') {
    url += `&country=${gameOptions.country}`;
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
