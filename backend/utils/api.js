const axios = require('axios');

const TAVILY_API_KEY = process.env.SEARCH_API_KEY;
const GNEWS_API_KEY = process.env.NEWS_API_KEY;

const tavilySearch = async (query, maxResults = 5) => {
  try {
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: TAVILY_API_KEY,
      query: query,
      search_depth: 'basic',
      max_results: maxResults,
      include_answer: true
    });
    return response.data;
  } catch (error) {
    console.error('Tavily API error:', error.message);
    throw new Error('Tavily search failed');
  }
};

const gnewsSearch = async (query, maxArticles = 5) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: query,
        token: GNEWS_API_KEY,
        max: maxArticles,
        lang: 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('GNews API error:', error.message);
    throw new Error('GNews search failed');
  }
};

const fetchCompanyData = async (company) => {
  const searchQuery = `${company} company overview pricing positioning`;
  const newsQuery = `${company} news recent launches funding`;
  
  try {
    const [searchResults, newsResults] = await Promise.all([
      tavilySearch(searchQuery).catch(() => null),
      gnewsSearch(newsQuery).catch(() => null)
    ]);

    return {
      searchData: searchResults,
      newsData: newsResults,
      sources: extractSources(searchResults, newsResults)
    };
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
};

const extractSources = (searchData, newsData) => {
  const sources = [];
  
  if (searchData?.results) {
    searchData.results.forEach(result => {
      if (result.url) {
        sources.push({ title: result.title, url: result.url });
      }
    });
  }
  
  if (newsData?.articles) {
    newsData.articles.forEach(article => {
      if (article.url) {
        sources.push({ title: article.title, url: article.url });
      }
    });
  }
  
  return sources;
};

module.exports = { tavilySearch, gnewsSearch, fetchCompanyData, extractSources };
