import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const hasScore = searchParams.has('score');
    const score = hasScore ? searchParams.get('score') : null;
    const mode = searchParams.get('mode') || 'LostStreet';
    const hasChronicle = searchParams.has('chronicle');
    
    if (hasChronicle) {
      const code = searchParams.get('chronicle');
      const countryName = searchParams.get('name') || 'Country';
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#050816',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050816 100%)',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
              <img src={`https://flagcdn.com/w320/${code}.png`} width="320" style={{ borderRadius: '20px', border: '8px solid white', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
              <h1 style={{
                fontSize: 80,
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                padding: 0,
                textAlign: 'center'
              }}>
                History of {countryName}
              </h1>
              <p style={{ fontSize: 40, color: '#38bdf8', marginTop: 20, fontWeight: 700 }}>
                LostStreet Encyclopedia
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '30px', fontSize: 30, color: '#d1d5db' }}>🌍 Geography</div>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '30px', fontSize: 30, color: '#d1d5db' }}>🚩 Flags</div>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '30px', fontSize: 30, color: '#d1d5db' }}>📜 History</div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // If no score is provided, just return a generic OG image
    if (!hasScore) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0a',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{
                fontSize: 80,
                fontWeight: 800,
                background: 'linear-gradient(to bottom right, #10b981, #3b82f6)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                padding: 0,
              }}>
                LostStreet
              </h1>
              <p style={{ fontSize: 40, color: '#d1d5db', marginTop: 20 }}>
                The Free GeoGuessr Alternative
              </p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Returning dynamic score image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{
              fontSize: 60,
              fontWeight: 800,
              color: '#d1d5db',
              margin: 0,
              padding: 0,
            }}>
              I just scored
            </h1>
            <h2 style={{
              fontSize: 120,
              fontWeight: 900,
              background: 'linear-gradient(to bottom right, #10b981, #3b82f6)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '20px 0',
            }}>
              {score} points
            </h2>
            <p style={{ fontSize: 40, color: '#9ca3af', margin: 0 }}>
              in {mode} Mode on LostStreet
            </p>
            <p style={{ fontSize: 24, color: '#6b7280', marginTop: 40, borderTop: '2px solid #374151', paddingTop: 20 }}>
              Can you beat me? Play for free at loststreet.online
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
