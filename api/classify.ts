// Vercel Serverless Function for AI Classification
// Intelligently classifies apps into categories and suggests tags

import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Existing categories
const EXISTING_CATEGORIES = [
  'Productivity & Tools',
  'Design & Creative',
  'AI & Experimental',
  'Lifestyle & Niche'
];

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

  const { appName, description, userTags } = req.body;

  if (!appName || !description) {
    return res.status(400).json({ error: 'Missing app name or description' });
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
        model: "google/gemini-2.0-flash-exp:free", // FREE model
        messages: [
          {
            role: "user",
            content: `Analyze this app and intelligently classify it.

App Name: ${appName}
Description: ${description}
User-provided tags: ${userTags && userTags.length > 0 ? userTags.join(', ') : 'None provided'}

Existing categories:
${EXISTING_CATEGORIES.map((cat, i) => `${i + 1}. ${cat}`).join('\n')}

Tasks:
1. Choose the BEST FITTING existing category (or suggest a new one if none fit well)
2. Generate 1-2 short tags (1-2 words each) that describe the app's nature
3. If user provided tags, validate them and suggest improvements if needed

Return ONLY a JSON object:
{
  "category": "chosen category name",
  "suggestNewCategory": true/false,
  "newCategoryName": "suggested new category if needed",
  "tags": ["tag1", "tag2"],
  "reasoning": "brief explanation of classification"
}

Rules:
- Tags should be 1-2 words max
- Tags should be descriptive and searchable
- If user provided good tags, keep them
- Suggest new category only if app truly doesn't fit existing ones
- Be concise and accurate`
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
        category: EXISTING_CATEGORIES[0], // Default fallback
        suggestNewCategory: false,
        tags: userTags || ['app'],
        reasoning: "Could not parse AI response, using defaults"
      });
    }

    const result = JSON.parse(jsonMatch[0]);
    
    return res.status(200).json({
      category: result.category || EXISTING_CATEGORIES[0],
      suggestNewCategory: result.suggestNewCategory || false,
      newCategoryName: result.newCategoryName || null,
      tags: result.tags || userTags || ['app'],
      reasoning: result.reasoning || "AI classification"
    });
    
  } catch (error) {
    console.error("Classification failed:", error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Classification failed',
      category: EXISTING_CATEGORIES[0], // Fallback
      tags: userTags || ['app']
    });
  }
}
