/**
 * Cloudflare Worker Proxy for OpenRouter API
 * This hides your API key from the client
 */

export interface Env {
  OPENROUTER_API_KEY: string;
  ALLOWED_ORIGIN: string;
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// CORS headers
function getCORSHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || env.ALLOWED_ORIGIN;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCORSHeaders(origin),
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get request body from client
      const body = await request.json();

      // Force the model to your preferred one
      body.model = 'nex-agi/deepseek-v3.1-nex-n1:free';

      // Forward to OpenRouter with your API key
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': origin,
          'X-Title': 'Vibe Hub'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...getCORSHeaders(origin)
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Proxy error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...getCORSHeaders(origin)
          }
        }
      );
    }
  }
};
