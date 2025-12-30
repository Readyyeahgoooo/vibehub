import { APPS_DATA } from "../constants";
import { SearchResult } from "../types";

// Use Vercel serverless function (API key hidden server-side)
const SEARCH_API_URL = "/api/search";

export async function semanticSearch(query: string): Promise<SearchResult[]> {
  const appCorpus = APPS_DATA.map(app => ({
    id: app.id,
    name: app.name,
    summary: app.summary,
    tags: app.tags.join(', ')
  }));

  try {
    const response = await fetch(SEARCH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        appCorpus
      })
    });

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
    
  } catch (error) {
    console.error("AI search failed, falling back to local search:", error);
    // Fallback to local keyword search
    return APPS_DATA
      .filter(app => 
        app.name.toLowerCase().includes(query.toLowerCase()) || 
        app.summary.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(app => ({ appId: app.id, relevance: "Fallback keyword match" }));
  }
}
