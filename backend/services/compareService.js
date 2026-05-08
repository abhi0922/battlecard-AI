const { fetchCompanyData } = require('../utils/api');
const { extractWithGroq, generateComparison } = require('../utils/groq');
const { generatePDFFromMarkdown } = require('../utils/pdf');
const battlecardService = require('./battlecardService');

const comparisonCache = new Map();

exports.compareCompanies = async (companyA, companyB) => {
  const cacheKey = `compare_${companyA.toLowerCase().trim()}_${companyB.toLowerCase().trim()}`;
  
  if (comparisonCache.has(cacheKey)) {
    console.log(`Cache hit for comparison: ${companyA} vs ${companyB}`);
    return comparisonCache.get(cacheKey);
  }

  console.log(`Comparing ${companyA} and ${companyB}`);
  
  let dataA, dataB;
  
  try {
    dataA = await battlecardService.generateBattlecard(companyA);
  } catch (e) {
    console.log(`Generating fresh data for ${companyA}`);
    const { searchData, newsData, sources } = await fetchCompanyData(companyA);
    const extractedData = await extractWithGroq(companyA, searchData, newsData);
    dataA = { competitor: companyA, extractedData, sources };
  }
  
  try {
    dataB = await battlecardService.generateBattlecard(companyB);
  } catch (e) {
    console.log(`Generating fresh data for ${companyB}`);
    const { searchData, newsData, sources } = await fetchCompanyData(companyB);
    const extractedData = await extractWithGroq(companyB, searchData, newsData);
    dataB = { competitor: companyB, extractedData, sources };
  }
  
  const comparison = await generateComparison(
    companyA, 
    companyB, 
    dataA.extractedData, 
    dataB.extractedData
  );
  
  const markdown = generateComparisonMarkdown(companyA, companyB, comparison);
  
  const result = {
    companyA,
    companyB,
    comparison,
    markdown,
    sources: [...(dataA.sources || []), ...(dataB.sources || [])],
    generatedAt: new Date().toISOString()
  };
  
  comparisonCache.set(cacheKey, result);
  
  setTimeout(() => comparisonCache.delete(cacheKey), 3600000);
  
  return result;
};

const generateComparisonMarkdown = (companyA, companyB, comparison) => {
  const { quick_verdict, comparison_table, key_differences, weakness_exploitation, sales_strategy } = comparison;
  
  let md = `# ${companyA} vs ${companyB} - Comparison\n\n`;
  
  md += `## Quick Verdict\n\n`;
  md += `- **Best Overall**: ${quick_verdict?.best_overall || 'N/A'}\n`;
  md += `- **Best Pricing**: ${quick_verdict?.best_pricing || 'N/A'}\n`;
  md += `- **Best for Startup**: ${quick_verdict?.best_for?.startup || 'N/A'}\n`;
  md += `- **Best for SMB**: ${quick_verdict?.best_for?.smb || 'N/A'}\n`;
  md += `- **Best for Enterprise**: ${quick_verdict?.best_for?.enterprise || 'N/A'}\n\n`;
  
  md += `## Comparison Table\n\n`;
  md += `| Category | ${companyA} | ${companyB} |\n`;
  md += `|----------|-------------|-------------|\n`;
  if (comparison_table) {
    comparison_table.forEach(row => {
      md += `| ${row.category} | ${row.company_a} | ${row.company_b} |\n`;
    });
  }
  md += `\n`;
  
  md += `## Key Differences\n\n`;
  if (key_differences) {
    key_differences.forEach(diff => {
      md += `- ${diff}\n`;
    });
  }
  md += `\n`;
  
  md += `## Weakness Exploitation\n\n`;
  if (weakness_exploitation) {
    weakness_exploitation.forEach(w => {
      md += `### ${w.company}\n`;
      if (w.weaknesses) {
        w.weaknesses.forEach(weak => md += `- ${weak}\n`);
      }
      md += `\n`;
    });
  }
  
  md += `## Sales Strategy\n\n`;
  if (sales_strategy) {
    sales_strategy.forEach(strat => {
      md += `- ${strat}\n`;
    });
  }
  
  return md;
};
