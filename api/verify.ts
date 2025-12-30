// Vercel Serverless Function for Screenshot Verification
// API key is stored in Vercel environment variables, never exposed to client

import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { base64Image, imageType, claimedUsername, sourceUrl } = req.body;

  if (!base64Image || !claimedUsername || !sourceUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL || 'https://vibe-hub.vercel.app',
        "X-Title": "Vibe Hub"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free", // FREE vision model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this screenshot and extract the username/account name visible in the image. 
Look for profile names, @handles, or account identifiers.
The user claims their username is: "${claimedUsername}"
The source URL is: ${sourceUrl}

Return ONLY a JSON object with this structure:
{
  "username": "extracted username from image",
  "confidence": 0.0-1.0,
  "verified": true/false,
  "reason": "brief explanation"
}

Compare the extracted username with the claimed username (case-insensitive, ignore @ prefix).
Set verified to true only if they match.`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${imageType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in OpenRouter response");
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(200).json({
        verified: false,
        confidence: 0,
        reason: "Could not parse AI response"
      });
    }

    const result = JSON.parse(jsonMatch[0]);
    
    return res.status(200).json({
      verified: result.verified || false,
      confidence: result.confidence || 0,
      extractedUsername: result.username,
      reason: result.reason
    });
    
  } catch (error) {
    console.error("Verification failed:", error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Verification failed',
      verified: false,
      confidence: 0
    });
  }
}
