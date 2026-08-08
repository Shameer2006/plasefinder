import * as cheerio from 'cheerio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter "q" is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch DuckDuckGo HTML version
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`DuckDuckGo responded with status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    // Parse the results
    $('.result').each((i, el) => {
      // Limit to 10 results
      if (i >= 10) return false;

      const titleEl = $(el).find('.result__title .result__a');
      const snippetEl = $(el).find('.result__snippet');
      const urlEl = $(el).find('.result__url');

      const title = titleEl.text().trim();
      let url = titleEl.attr('href');
      
      if (url && url.startsWith('//duckduckgo.com/l/?')) {
        try {
          const urlObj = new URL(`https:${url}`);
          const uddg = urlObj.searchParams.get('uddg');
          if (uddg) {
            url = decodeURIComponent(uddg);
          } else {
            url = `https:${url}`;
          }
        } catch (e) {
          url = `https:${url}`;
        }
      }

      const snippet = snippetEl.text().trim();

      if (title && url) {
        results.push({
          title,
          snippet,
          url
        });
      }
    });

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      },
    });

  } catch (error) {
    console.error('Search proxy error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch search results' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
