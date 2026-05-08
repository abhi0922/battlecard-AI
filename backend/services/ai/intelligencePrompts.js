const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = 'llama-3.1-8b-instant';

const generateIntelligenceReport = async (company, searchData, newsData, sources) => {
  const searchContext = searchData?.answer || searchData?.results?.map(r => r.content).join('\n') || '';
  const newsContext = newsData?.articles?.map(a => `${a.title}: ${a.description}`).join('\n') || '';

  const prompt = `You are a competitive intelligence analyst. Analyze "${company}" and return a STRICT JSON object with the following structure. Be concise and insight-driven. Avoid huge paragraphs.

{
  "company": {
    "name": "${company}",
    "tagline": "short tagline",
    "industry": "primary industry",
    "website": "website URL if known",
    "logo": "use placeholder if unknown",
    "description": "2-3 sentence company description",
    "founded": "founding year as string or null",
    "headquarters": "HQ location or null",
    "employees": "employee count as string or null",
    "fundingRaised": "total funding or null",
    "valuation": "latest valuation or null"
  },
  "overview": {
    "summary": "2-3 sentence summary",
    "positioning": "market positioning statement",
    "targetAudience": "comma-separated list of target segments"
  },
  "swot": {
    "strengths": ["array of 4-5 strengths"],
    "weaknesses": ["array of 4-5 weaknesses"],
    "opportunities": ["array of 4-5 opportunities"],
    "threats": ["array of 4-5 threats"]
  },
  "funding": [
    {
      "year": "year",
      "type": "Series A/Seed/Acquisition/Milestone",
      "amount": "amount or null",
      "investors": "investor names or null",
      "milestone": "what happened"
    }
  ],
  "growth": {
    "revenue": [{"year": "2019", "revenue": 100}],
    "employees": [{"year": "2019", "employees": 100}],
    "traffic": [{"month": "Jan", "visits": 10}],
    "social": [{"month": "Jan", "linkedin": 10, "twitter": 10, "youtube": 5}]
  },
  "socialMedia": {
    "linkedin": {"followers": "N/A", "growth": null, "postsPerWeek": null},
    "twitter": {"followers": "N/A", "growth": null, "postsPerWeek": null},
    "youtube": {"subscribers": "N/A", "growth": null, "videosPerMonth": null},
    "github": {"stars": "N/A", "contributions": null, "repos": null}
  },
  "marketing": {
    "acquisitionChannels": [
      {"channel": "channel name", "percentage": 25, "description": "short description"}
    ],
    "seoStrategy": "1-2 sentence SEO strategy analysis",
    "adMessaging": "1-2 sentence ad messaging analysis",
    "audienceTargeting": "1-2 sentence audience targeting description",
    "ctaStyle": "comma-separated CTA examples"
  },
  "sentiment": {
    "overall": 75,
    "sources": {
      "reddit": {"score": 70, "positive": 60, "negative": 40},
      "g2": {"score": 85, "positive": 80, "negative": 20},
      "capterra": {"score": 80, "positive": 78, "negative": 22},
      "producthunt": {"score": 85, "positive": 88, "negative": 12}
    },
    "praises": ["array of 4-5 common praises"],
    "complaints": ["array of 4-5 common complaints"]
  },
  "news": [
    {
      "date": "YYYY-MM-DD",
      "title": "news headline",
      "type": "launch|partnership|acquisition|expansion|layoff|milestone",
      "source": "source name"
    }
  ],
  "competitors": [
    {
      "name": "competitor name",
      "logo": "logo URL or null",
      "pricing": "pricing summary",
      "strengths": "key strengths",
      "weaknesses": "key weaknesses",
      "features": "key features",
      "positioning": "market positioning"
    }
  ],
  "aiInsights": {
    "marketDirection": "2-3 sentence market analysis",
    "gtmWeaknesses": "2-3 sentence GTM weakness analysis",
    "expansionOpportunities": ["array of 5 expansion opportunities"],
    "competitiveThreats": ["array of 5 competitive threats"],
    "strategicRecommendations": ["array of 5 strategic recommendations"]
  }
}

IMPORTANT RULES:
1. Every field must have a value - use null or "N/A" if unknown
2. revenue values should be in millions (e.g., 1200 = $1.2B)
3. Use realistic but clearly labeled data - mark estimated values
4. SWOT items must be concise (max 15 words each)
5. Generate at minimum 3 items per array, maximum 6
6. News should be plausible based on the company's actual trajectory
7. Competitors must be real competitors
8. Social media data: use "N/A" if unknown, but generate realistic estimates based on company size
9. Funding rounds: if unknown, generate plausible rounds based on company stage
10. Growth data: generate realistic growth curves based on company maturity

Search context for ${company}:
${searchContext}

News context for ${company}:
${newsContext}

Sources available:
${JSON.stringify(sources)}

Return ONLY valid JSON. No markdown. No explanation.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(completion.choices[0].message.content);

    return {
      ...content,
      company: content.company || { name: company },
      overview: content.overview || {},
      swot: content.swot || {},
      funding: content.funding || [],
      growth: content.growth || {},
      socialMedia: content.socialMedia || {},
      marketing: content.marketing || {},
      sentiment: content.sentiment || {},
      news: content.news || [],
      competitors: content.competitors || [],
      aiInsights: content.aiInsights || {},
    };
  } catch (error) {
    console.error('Intelligence generation error:', error.response?.data || error.message || error);
    throw new Error('Failed to generate intelligence report');
  }
};

module.exports = { generateIntelligenceReport };
