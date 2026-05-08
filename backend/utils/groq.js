const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = 'llama-3.1-8b-instant';

const extractWithGroq = async (company, searchData, newsData) => {
  const searchContext = searchData?.answer || searchData?.results?.map(r => r.content).join('\n') || '';
  const newsContext = newsData?.articles?.map(a => `${a.title}: ${a.description}`).join('\n') || '';

  const prompt = `Analyze the following information about ${company} and return STRICT JSON with fields: overview, positioning, pricing, recent_launches, customer_sentiment, strengths (array), weaknesses (array).

Search Data: ${searchContext}
News Data: ${newsContext}

Return only valid JSON, no markdown or explanation.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Groq extraction error:', error.response?.data || error.message || error);
    throw new Error('Failed to extract data with Groq');
  }
};

const generateBattlecardMarkdown = async (company, extractedData, sources) => {
  const prompt = `First identify the industry of ${company}. Then convert the following JSON data into a concise, sales-focused Markdown battlecard with dynamic sections tailored to that industry (e.g., Fintech: Compliance, API Quality; Beauty: Product Range, Brand Positioning; SaaS: Integrations, Scalability). Always include: Overview, How to Win. Add 4–6 other relevant sections based on the industry.

Data: ${JSON.stringify(extractedData)}
Sources: ${JSON.stringify(sources)}

CRITICAL: Do NOT include sources, references, or links in the markdown output. Sources will be handled separately.

Use Markdown formatting. Include actionable "How to Win" insights. Return only the Markdown content.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.5
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Groq battlecard error:', error.response?.data || error.message || error);
    throw new Error('Failed to generate battlecard');
  }
};

const generateComparison = async (companyA, companyB, dataA, dataB) => {
  const prompt = `Compare ${companyA} and ${companyB} and return STRICT JSON with fields:
- quick_verdict: { best_overall, best_pricing, best_for: { startup, smb, enterprise } }
- comparison_table: array of { category, company_a, company_b }
- key_differences: array of strings
- weakness_exploitation: array of { company, weaknesses: array }
- sales_strategy: array of strings
- sources: array of { title, url }

CRITICAL RULES:
1. Do NOT use company names as values in comparison_table cells
2. Each table cell must contain a short descriptive insight (max 8-12 words)
3. Always include at least one weakness per company in weakness_exploitation
4. If no clear weakness exists for a company, return "None" explicitly
5. Never leave any field empty - use "N/A" if data is missing
6. company_a field = specific features/insights about ${companyA} (NOT the name)
7. company_b field = specific features/insights about ${companyB} (NOT the name)
8. First identify the industry of ${companyA} and ${companyB}. Then generate 4–6 relevant comparison categories specific to that industry. Do NOT use generic categories unless they are relevant.
9. For the comparison_table, dynamically generate categories based on industry (e.g., Fintech: API Quality, Compliance, Global Reach; Beauty: Product Range, Brand Positioning, Distribution Channels; SaaS: Integrations, Scalability, Onboarding)

Data for ${companyA}: ${JSON.stringify(dataA)}
Data for ${companyB}: ${JSON.stringify(dataB)}

Return only valid JSON.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Groq comparison error:', error.response?.data || error.message || error);
    throw new Error('Failed to generate comparison');
  }
};

module.exports = { extractWithGroq, generateBattlecardMarkdown, generateComparison };
