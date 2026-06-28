const mockLocations = [
  { lat: 48.8566, lng: 2.3522, country: 'France', state: 'Paris', iso: 'fr' },
  { lat: 35.6762, lng: 139.6503, country: 'Japan', state: 'Tokyo', iso: 'jp' },
  { lat: -33.8688, lng: 151.2093, country: 'Australia', state: 'New South Wales', iso: 'au' },
  { lat: 40.7128, lng: -74.0060, country: 'United States', state: 'New York', iso: 'us' },
  { lat: -22.9068, lng: -43.1729, country: 'Brazil', state: 'Rio de Janeiro', iso: 'br' },
  { lat: 51.5074, lng: -0.1278, country: 'United Kingdom', state: 'London', iso: 'gb' },
  { lat: 41.9028, lng: 12.4964, country: 'Italy', state: 'Lazio', iso: 'it' },
  { lat: -33.9249, lng: 18.4241, country: 'South Africa', state: 'Western Cape', iso: 'za' },
  { lat: 55.7558, lng: 37.6173, country: 'Russia', state: 'Moscow', iso: 'ru' },
  { lat: 19.4326, lng: -99.1332, country: 'Mexico', state: 'Mexico City', iso: 'mx' },
];

export const fetchRandomLocation = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const targetIndex = Math.floor(Math.random() * mockLocations.length);
  const location = mockLocations[targetIndex];

  // Generate options (3 wrong + 1 correct) based on country
  const wrongCountries = mockLocations.filter(c => c.country !== location.country);
  
  // Shuffle wrong countries and pick 3
  wrongCountries.sort(() => 0.5 - Math.random());
  const selectedWrong = wrongCountries.slice(0, 3);
  
  const options = [...selectedWrong, location];
  // Shuffle options
  options.sort(() => 0.5 - Math.random());

  return {
    location,
    options
  };
};
