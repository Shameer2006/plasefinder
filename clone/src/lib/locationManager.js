const mockLocations = [
  { lat: 40.7128, lng: -74.0060, country: 'United States', state: 'New York' },
  { lat: 34.0522, lng: -118.2437, country: 'United States', state: 'California' },
  { lat: 41.8781, lng: -87.6298, country: 'United States', state: 'Illinois' },
  { lat: 29.7604, lng: -95.3698, country: 'United States', state: 'Texas' },
  { lat: 25.7617, lng: -80.1918, country: 'United States', state: 'Florida' },
  { lat: 39.7392, lng: -104.9903, country: 'United States', state: 'Colorado' },
  { lat: 47.6062, lng: -122.3321, country: 'United States', state: 'Washington' },
  { lat: 36.1699, lng: -115.1398, country: 'United States', state: 'Nevada' },
  { lat: 33.4484, lng: -112.0740, country: 'United States', state: 'Arizona' },
  { lat: 42.3601, lng: -71.0589, country: 'United States', state: 'Massachusetts' },
];

export const fetchRandomLocation = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const targetIndex = Math.floor(Math.random() * mockLocations.length);
  const location = mockLocations[targetIndex];

  // Generate options (3 wrong + 1 correct)
  const allStates = [...new Set(mockLocations.map(l => l.state))];
  const wrongStates = allStates.filter(s => s !== location.state);
  
  // Shuffle wrong states and pick 3
  wrongStates.sort(() => 0.5 - Math.random());
  const selectedWrongStates = wrongStates.slice(0, 3);
  
  const options = [...selectedWrongStates, location.state];
  // Shuffle options
  options.sort(() => 0.5 - Math.random());

  return {
    location,
    options
  };
};
