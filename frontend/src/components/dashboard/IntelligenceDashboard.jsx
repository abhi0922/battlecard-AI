import { useState, useMemo } from 'react';
import Tabs from '../ui/Tabs';
import { CompanyHeader, OverviewCard, SWOTSection, FundingTimeline, GrowthCharts, SocialMediaStats, MarketingStrategySection, CustomerSentimentSection, NewsSignalsSection, CompetitorComparison, AIInsightsSection } from '../sections';

const SECTION_KEYS = [
  'overview', 'swot', 'funding', 'growth', 'social', 'marketing', 'sentiment', 'news', 'competitors', 'insights'
];

const SECTION_LABELS = [
  { label: 'Overview' },
  { label: 'SWOT' },
  { label: 'Funding' },
  { label: 'Growth' },
  { label: 'Social' },
  { label: 'Marketing' },
  { label: 'Sentiment' },
  { label: 'News' },
  { label: 'Competitors' },
  { label: 'AI Insights' },
];

const IntelligenceDashboard = ({ data, type, onReset }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showSources, setShowSources] = useState(false);

  const { company, overview, swot, funding, growth, socialMedia, marketing, sentiment, news, competitors, aiInsights, sources, generatedAt } = data;

  const tabContent = useMemo(() => SECTION_KEYS.map((key, i) => ({
    label: SECTION_LABELS[i].label,
    content: renderSection(key, data),
  })), [data]);

  const hasData = company || overview || swot || funding || growth || socialMedia || marketing || sentiment || news || competitors || aiInsights;

  if (!hasData) {
    return (
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">No intelligence data available for this company.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-black/30 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm">AI</span>
              Intelligence Dashboard
            </h2>
            {generatedAt && (
              <p className="text-sm text-gray-400 mt-1">
                Generated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={onReset} className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] text-sm">
              ← New Search
            </button>
            {sources && sources.length > 0 && (
              <button
                onClick={() => setShowSources(!showSources)}
                className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-200 text-sm flex items-center gap-2 ${
                  showSources ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Sources {sources.length > 0 && `(${sources.length})`}
              </button>
            )}
          </div>
        </div>

        {showSources && sources && sources.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700/50 animate-fadeIn">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {sources.map((source, i) => (
                <a key={i} href={source.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-lg text-xs text-gray-400 hover:text-blue-400 hover:bg-gray-900 transition-all">
                  <span className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center text-[10px] font-medium text-gray-500">{i + 1}</span>
                  <span className="truncate">{source.title || source.url}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <CompanyHeader company={company} />

      <Tabs tabs={tabContent} defaultTab={activeTab} onChange={setActiveTab} variant="pills" />
    </div>
  );
};

function renderSection(key, data) {
  switch (key) {
    case 'overview':
      return <OverviewCard overview={data.overview} />;
    case 'swot':
      return <SWOTSection swot={data.swot} />;
    case 'funding':
      return <FundingTimeline funding={data.funding} />;
    case 'growth':
      return <GrowthCharts growth={data.growth} />;
    case 'social':
      return <SocialMediaStats social={data.socialMedia} />;
    case 'marketing':
      return <MarketingStrategySection marketing={data.marketing} />;
    case 'sentiment':
      return <CustomerSentimentSection sentiment={data.sentiment} />;
    case 'news':
      return <NewsSignalsSection news={data.news} />;
    case 'competitors':
      return <CompetitorComparison competitors={data.competitors} />;
    case 'insights':
      return <AIInsightsSection insights={data.aiInsights} />;
    default:
      return null;
  }
}

export default IntelligenceDashboard;
