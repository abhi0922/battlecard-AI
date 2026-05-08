const { fetchCompanyData, extractSources } = require('../utils/api');
const { extractWithGroq, generateBattlecardMarkdown } = require('../utils/groq');

const battlecardCache = new Map();

exports.generateBattlecard = async (competitor) => {
  const cacheKey = `battlecard_${competitor.toLowerCase().trim()}`;
  
  if (battlecardCache.has(cacheKey)) {
    console.log(`Cache hit for ${competitor}`);
    return battlecardCache.get(cacheKey);
  }

  console.log(`Generating battlecard for ${competitor}`);
  
  const { searchData, newsData, sources } = await fetchCompanyData(competitor);
  
  const extractedData = await extractWithGroq(competitor, searchData, newsData);
  
  const markdown = await generateBattlecardMarkdown(competitor, extractedData, sources);
  
  const result = {
    competitor,
    markdown,
    extractedData,
    sources,
    generatedAt: new Date().toISOString()
  };
  
  battlecardCache.set(cacheKey, result);
  
  setTimeout(() => battlecardCache.delete(cacheKey), 3600000);
  
  return result;
};
