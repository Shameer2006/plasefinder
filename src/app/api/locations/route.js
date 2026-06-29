import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache the locations in memory (server-side only)
let cachedLocations = null;
let cachedContinentMapping = null;

function getLocations() {
  if (!cachedLocations) {
    const filePath = path.join(process.cwd(), 'public', 'world-locations.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    cachedLocations = JSON.parse(raw);
  }
  return cachedLocations;
}

function getContinentMapping() {
  if (!cachedContinentMapping) {
    const filePath = path.join(process.cwd(), 'public', 'continentMapping.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    cachedContinentMapping = JSON.parse(raw);
  }
  return cachedContinentMapping;
}

/**
 * Pick `count` random locations ensuring continent diversity.
 * Guarantees at least `minContinents` distinct continents in the batch.
 */
function pickDiverseLocations(count = 5, minContinents = 3) {
  const locations = getLocations();
  const continentMap = getContinentMapping();
  const totalLocations = locations.length;

  // Group location indices by continent for efficient sampling
  const continentBuckets = {};
  for (let i = 0; i < totalLocations; i++) {
    const loc = locations[i];
    const continent = continentMap[loc.country] || 'Unknown';
    if (!continentBuckets[continent]) {
      continentBuckets[continent] = [];
    }
    continentBuckets[continent].push(i);
  }

  // Available continents (exclude Unknown if it exists)
  const availableContinents = Object.keys(continentBuckets).filter(c => c !== 'Unknown');

  // Strategy: pick one location from each of `minContinents` random continents,
  // then fill the rest randomly from any continent
  const maxAttempts = 50;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const selected = [];
    const usedIndices = new Set();
    const usedContinents = new Set();

    // Shuffle continents and pick from the first `minContinents`
    const shuffledContinents = [...availableContinents].sort(() => Math.random() - 0.5);
    const guaranteedContinents = shuffledContinents.slice(0, Math.min(minContinents, shuffledContinents.length));

    // Pick one from each guaranteed continent
    for (const continent of guaranteedContinents) {
      const bucket = continentBuckets[continent];
      const idx = bucket[Math.floor(Math.random() * bucket.length)];
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        usedContinents.add(continent);
        selected.push(locations[idx]);
      }
    }

    // Fill remaining slots randomly
    while (selected.length < count) {
      const idx = Math.floor(Math.random() * totalLocations);
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        const loc = locations[idx];
        const continent = continentMap[loc.country] || 'Unknown';
        usedContinents.add(continent);
        selected.push(loc);
      }
    }

    // Check diversity requirement
    if (usedContinents.size >= minContinents || attempt === maxAttempts - 1) {
      return selected;
    }
  }

  // Fallback: just pick randomly (should never reach here)
  const result = [];
  const usedIndices = new Set();
  while (result.length < count) {
    const idx = Math.floor(Math.random() * locations.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      result.push(locations[idx]);
    }
  }
  return result;
}

function pickCountryLocations(count = 5, countryCode) {
  const locations = getLocations();
  const countryLocations = locations.filter(loc => loc.country === countryCode);
  
  if (countryLocations.length === 0) return [];
  
  const result = [];
  const usedIndices = new Set();
  
  // If we have fewer locations than requested, just return all of them shuffled
  if (countryLocations.length <= count) {
    return countryLocations.sort(() => Math.random() - 0.5);
  }
  
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
