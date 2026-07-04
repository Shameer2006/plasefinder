import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache continent chunks in memory (server-side only)
const chunkCache = {};
let cachedContinentMapping = null;
let cachedIndex = null;

const LOCATIONS_DIR = path.join(process.cwd(), 'public', 'locations');

function getContinentMapping() {
  if (!cachedContinentMapping) {
    const filePath = path.join(LOCATIONS_DIR, '_country-continent.json');
    cachedContinentMapping = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return cachedContinentMapping;
}

function getIndex() {
  if (!cachedIndex) {
    const filePath = path.join(LOCATIONS_DIR, '_index.json');
    cachedIndex = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return cachedIndex;
}

/**
 * Lazily load a continent chunk into memory.
 * Only the requested continent is parsed — not all 96MB.
 */
function getContinentLocations(continent) {
  if (chunkCache[continent]) return chunkCache[continent];

  const index = getIndex();
  const entry = index[continent];
  if (!entry) return [];

  const filePath = path.join(LOCATIONS_DIR, entry.file);
  chunkCache[continent] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return chunkCache[continent];
}

/**
 * Get all locations (lazy-loads all chunks).
 * After first call, everything is cached in memory like before.
 */
function getAllLocations() {
  const index = getIndex();
  let all = [];
  for (const continent of Object.keys(index)) {
    all = all.concat(getContinentLocations(continent));
  }
  return all;
}

/**
 * Pick `count` random locations ensuring continent diversity.
 * Now loads only the needed continent chunks instead of the full 96MB file.
 */
function pickDiverseLocations(count = 5, minContinents = 3) {
  const continentMap = getContinentMapping();
  const index = getIndex();

  // Available continents (exclude Other/Unknown)
  const availableContinents = Object.keys(index).filter(c => c !== 'Other' && c !== 'Unknown');

  const maxAttempts = 50;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const selected = [];
    const usedKeys = new Set();
    const usedContinents = new Set();

    // Shuffle continents and pick from the first `minContinents`
    const shuffledContinents = [...availableContinents].sort(() => Math.random() - 0.5);
    const guaranteedContinents = shuffledContinents.slice(0, Math.min(minContinents, shuffledContinents.length));

    // Pick one from each guaranteed continent (only loads that chunk)
    for (const continent of guaranteedContinents) {
      const locs = getContinentLocations(continent);
      if (locs.length === 0) continue;
      const loc = locs[Math.floor(Math.random() * locs.length)];
      const key = `${loc.lat},${loc.lng}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        usedContinents.add(continent);
        selected.push(loc);
      }
    }

    // Fill remaining slots from random continents
    while (selected.length < count) {
      const continent = availableContinents[Math.floor(Math.random() * availableContinents.length)];
      const locs = getContinentLocations(continent);
      if (locs.length === 0) continue;
      const loc = locs[Math.floor(Math.random() * locs.length)];
      const key = `${loc.lat},${loc.lng}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        usedContinents.add(continent);
        selected.push(loc);
      }
    }

    if (usedContinents.size >= minContinents || attempt === maxAttempts - 1) {
      return selected;
    }
  }

  // Fallback
  const allLocs = getAllLocations();
  const result = [];
  const usedIndices = new Set();
  while (result.length < count) {
    const idx = Math.floor(Math.random() * allLocs.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      result.push(allLocs[idx]);
    }
  }
  return result;
}

function pickCountryLocations(count = 5, countryCode) {
  const continentMap = getContinentMapping();
  const continent = continentMap[countryCode] || 'Other';

  // Only load the relevant continent chunk
  const locs = getContinentLocations(continent);
  const countryLocations = locs.filter(loc => loc.country === countryCode);

  if (countryLocations.length === 0) {
    // Fallback: search all chunks (country might be in 'Other')
    const allLocs = getAllLocations();
    const fallback = allLocs.filter(loc => loc.country === countryCode);
    if (fallback.length === 0) return [];
    if (fallback.length <= count) return fallback.sort(() => Math.random() - 0.5);
    const result = [];
    const usedIndices = new Set();
    while (result.length < count) {
      const idx = Math.floor(Math.random() * fallback.length);
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        result.push(fallback[idx]);
      }
    }
    return result;
  }

  if (countryLocations.length <= count) {
    return countryLocations.sort(() => Math.random() - 0.5);
  }

  const result = [];
  const usedIndices = new Set();
  while (result.length < count) {
    const idx = Math.floor(Math.random() * countryLocations.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      result.push(countryLocations[idx]);
    }
  }
  return result;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = Math.min(parseInt(searchParams.get('count') || '5', 10), 20);
    const minContinents = Math.min(parseInt(searchParams.get('minContinents') || '3', 10), 6);
    const country = searchParams.get('country');

    let locations;
    if (country && country !== 'WORLDWIDE') {
      locations = pickCountryLocations(count, country);
    } else {
      locations = pickDiverseLocations(count, minContinents);
    }

    return NextResponse.json({ locations });
  } catch (error) {
    console.error('Error serving locations:', error);
    return NextResponse.json(
      { error: 'Failed to load locations' },
      { status: 500 }
    );
  }
}
