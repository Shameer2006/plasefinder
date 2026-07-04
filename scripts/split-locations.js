#!/usr/bin/env node
/**
 * split-locations.js
 * 
 * Splits the monolithic world-locations.json (~96MB, ~785K locations)
 * into continent-based chunk files for faster server-side loading.
 * 
 * Output: public/locations/  (one JSON file per continent + an index)
 * 
 * Usage: node scripts/split-locations.js
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'public', 'world-locations.json');
const MAPPING = path.join(__dirname, '..', 'public', 'continentMapping.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'locations');

console.log('🌍 Loading world-locations.json...');
const locations = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));
const continentMapping = JSON.parse(fs.readFileSync(MAPPING, 'utf-8'));

console.log(`   Loaded ${locations.length.toLocaleString()} locations`);

// Group by continent
const buckets = {};
let unmappedCount = 0;

for (const loc of locations) {
  const continent = continentMapping[loc.country] || 'Other';
  if (!continentMapping[loc.country]) unmappedCount++;
  if (!buckets[continent]) buckets[continent] = [];
  buckets[continent].push(loc);
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write each continent chunk
const index = {};
for (const [continent, locs] of Object.entries(buckets)) {
  const filename = continent.toLowerCase().replace(/\s+/g, '-') + '.json';
  const filepath = path.join(OUTPUT_DIR, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(locs));
  
  const sizeBytes = fs.statSync(filepath).size;
  const sizeMB = (sizeBytes / 1024 / 1024).toFixed(1);
  
  index[continent] = {
    file: filename,
    count: locs.length,
    sizeBytes
  };
  
  console.log(`   ✅ ${continent}: ${locs.length.toLocaleString()} locations (${sizeMB} MB) → ${filename}`);
}

// Also build a country-to-continent lookup for the API
const countryToContinentFile = path.join(OUTPUT_DIR, '_country-continent.json');
fs.writeFileSync(countryToContinentFile, JSON.stringify(continentMapping));

// Write index
const indexFile = path.join(OUTPUT_DIR, '_index.json');
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

console.log(`\n📊 Summary:`);
console.log(`   Total locations: ${locations.length.toLocaleString()}`);
console.log(`   Continents: ${Object.keys(buckets).length}`);
console.log(`   Unmapped countries: ${unmappedCount}`);
console.log(`   Output: ${OUTPUT_DIR}`);
console.log(`\n✅ Done!`);
