
# Aegis Insight: Dynamic Architecture & Strategy

## 1. Dynamic Content Strategy
Aegis Insight now utilizes **Public RSS Feeds** converted to JSON via `rss2json` to provide a truly dynamic experience without requiring server-side secrets for the demo. 

## 2. API Integration Logic
*   **Sources**: Insurance Journal, Reuters Business.
*   **Normalization**: Raw XML/JSON items are mapped to a clean `Article` interface.
*   **Categorization**: A keyword-based engine scans titles to auto-categorize articles into `Motor`, `Health`, `Travel`, etc.
*   **Deduplication**: Uses a Title-based Map to ensure multiple feeds don't show the same story.

## 3. Gemini AI Enrichment
When a user clicks an article, the application triggers a **just-in-time (JIT) enrichment** using `gemini-3-flash-preview`. 
*   **Process**: Gemini reads the dynamic content and generates the "Bottom Line" summary, reading time, and difficulty assessment.
*   **State Management**: Insights are cached in the React Context state for the duration of the session.

## 4. Key Differentiators
*   **Freshness**: Unlike static blogs, Aegis Insight updates every time you refresh.
*   **Automated Authority**: By pulling from trusted industry feeds and layering AI analysis, it creates a high-E-E-A-T experience.
*   **No-Wait Intelligence**: Users get an instant summary of complex regulatory news.

## 5. Scalability
The architecture is designed to swap the `rss2json` logic for a more robust backend (Node.js + Redis) that can handle hundreds of feeds and store them in a persistent DB while pre-processing summaries.
