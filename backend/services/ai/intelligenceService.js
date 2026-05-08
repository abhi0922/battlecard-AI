const { fetchCompanyData } = require('../../utils/api');
const { generateIntelligenceReport } = require('./intelligencePrompts');

const intelligenceCache = new Map();

exports.generateIntelligence = async (company) => {
  const cacheKey = `intelligence_${company.toLowerCase().trim()}`;

  if (intelligenceCache.has(cacheKey)) {
    console.log(`Cache hit for ${company}`);
    return intelligenceCache.get(cacheKey);
  }

  console.log(`Generating intelligence dashboard for ${company}`);

  const { searchData, newsData, sources } = await fetchCompanyData(company);

  const report = await generateIntelligenceReport(company, searchData, newsData, sources);

  const result = {
    company: company,
    ...report,
    sources,
    generatedAt: new Date().toISOString()
  };

  intelligenceCache.set(cacheKey, result);
  setTimeout(() => intelligenceCache.delete(cacheKey), 3600000);

  return result;
};
