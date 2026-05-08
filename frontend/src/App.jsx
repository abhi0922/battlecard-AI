import React, { useState } from 'react';
import BattlecardForm from './components/BattlecardForm';
import CompareForm from './components/CompareForm';
import ResultView from './components/ResultView';
import Loader from './components/Loader';
import DashboardLoader from './components/dashboard/DashboardLoader';
import IntelligenceDashboard from './components/dashboard/IntelligenceDashboard';
import { generateBattlecard, compareCompanies, generateIntelligence } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('battlecard');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setResult(null);
    setError(null);
  };

  const handleIntelligenceSubmit = async (company) => {
    if (!company.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateIntelligence(company);
      setResult({ type: 'intelligence', data });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate intelligence dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-3xl rounded-full" />

      <nav className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Company DNA</h1>
              <p className="text-xs text-gray-400">AI-Powered Competitive Intelligence</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-1 mb-8 bg-gray-800/50 rounded-xl p-1 w-fit">
          <button
            onClick={() => handleTabSwitch('battlecard')}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'battlecard'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Battlecard
            </span>
          </button>
          <button
            onClick={() => handleTabSwitch('compare')}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'compare'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Compare
            </span>
          </button>
          <button
            onClick={() => handleTabSwitch('intelligence')}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'intelligence'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Intelligence
            </span>
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700/50 text-red-200 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {loading && (activeTab === 'intelligence' ? <DashboardLoader /> : <Loader />)}

        {!loading && !result && (
          <div className="max-w-2xl mx-auto">
            {activeTab === 'battlecard' && (
              <BattlecardForm setLoading={setLoading} setResult={setResult} setError={setError} />
            )}
            {activeTab === 'compare' && (
              <CompareForm setLoading={setLoading} setResult={setResult} setError={setError} />
            )}
            {activeTab === 'intelligence' && (
              <IntelligenceForm onSubmit={handleIntelligenceSubmit} loading={loading} />
            )}
          </div>
        )}

        {!loading && result && result.type !== 'intelligence' && (
          <ResultView
            result={result}
            type={activeTab}
            onReset={() => { setResult(null); setError(null); }}
          />
        )}

        {!loading && result && result.type === 'intelligence' && (
          <IntelligenceDashboard
            data={result.data}
            type="intelligence"
            onReset={() => { setResult(null); setError(null); }}
          />
        )}
      </main>

      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-gray-500">
            Powered by AI • Built with Groq, Tavily & GNews
          </p>
        </div>
      </footer>
    </div>
  );
}

const IntelligenceForm = ({ onSubmit, loading }) => {
  const [company, setCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(company);
  };

  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600/30 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Company Intelligence</h2>
            <p className="text-gray-400 text-sm">Get the complete company profile - SWOT, funding, sentiment & strategic insights</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Stripe, Tesla, OpenAI"
            className="w-full px-5 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            autoFocus
          />
          <p className="mt-2 text-xs text-gray-500">
            Generates a complete intelligence dashboard with SWOT, funding, social media, sentiment, competitors, and AI insights.
          </p>
        </div>

        <button
  type="submit"
  disabled={!company.trim() || loading}
  className="relative z-50 pointer-events-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:active:scale-100"
>
  <span className="flex items-center justify-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    Generate Intelligence Dashboard
  </span>
</button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['Company Overview', 'SWOT Analysis', 'Funding Timeline', 'Social Stats', 'Sentiment Analysis', 'Growth Charts', 'Competitor Intel', 'AI Insights'].map((feature, i) => (
            <div key={i} className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
