export async function POST(request) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'imageBase64 is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate image size (reject > 500KB base64 ≈ ~375KB raw)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    if (base64Data.length > 700000) {
      return new Response(JSON.stringify({ error: 'Image too large. Try circling a smaller area.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a geography expert helping a player in a location-guessing game. Analyze this cropped section of a street view image. Describe any clues you can see (language on signs, script type, architectural style, vegetation type, road markings, driving side, license plate style, landscape features, climate indicators, etc.) that might help identify the country or region. Do NOT reveal the exact location, city name, or country name — only describe the visual clues and what they suggest. Keep your response concise, under 80 words, and focus on the most distinctive clues.`;

    // Use Gemini API with inline image data
    const mimeType = imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.3,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API error:', errText);
      throw new Error(`Gemini API responded with status: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const hint =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Could not analyze this image. Try circling a different area with more visible details.';

    return new Response(JSON.stringify({ hint }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Circle search error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to analyze image. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
