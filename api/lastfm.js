// Vercel Serverless Function to hide Last.fm API key
export default async function handler(req, res) {
  // CORS headers - allow your domain
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://uixmorph.com',
    'https://www.uixmorph.com',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Allow all origins for now (you can restrict later)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API key and username from environment variables
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    console.log('Missing env vars:', { 
      hasKey: !!LASTFM_API_KEY, 
      hasUsername: !!LASTFM_USERNAME 
    });
    return res.status(500).json({ 
      error: 'API not configured',
      details: {
        hasKey: !!LASTFM_API_KEY,
        hasUsername: !!LASTFM_USERNAME
      }
    });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );

    if (!response.ok) {
      throw new Error('Last.fm API error');
    }

    const data = await response.json();
    
    // Return only the data we need
    return res.status(200).json(data);
  } catch (error) {
    console.error('Last.fm API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch track data',
      message: error.message,
      url: `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY?.substring(0, 8)}...&format=json&limit=1`
    });
  }
}
