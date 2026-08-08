export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const heading = searchParams.get('heading') || '210';
  const pitch = searchParams.get('pitch') || '10';
  const fov = searchParams.get('fov') || '100';
  const size = searchParams.get('size') || '800x600';

  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: 'lat and lng are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Maps API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=${fov}&key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`[StreetView Proxy] Google API returned HTTP ${response.status}. Ensure 'Street View Static API' is enabled in Google Cloud Console for your API key.`);
      return new Response(JSON.stringify({
        error: `Google Street View API returned HTTP ${response.status}`,
        status: response.status,
        hint: "Enable 'Street View Static API' in Google Cloud Console and check API key restrictions."
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const imageBuffer = await response.arrayBuffer();
    
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('[StreetView Proxy Error]:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Street View image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
