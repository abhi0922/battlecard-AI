import React, { useState } from 'react';
import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true
});

// Parse markdown into structured sections
const parseBattlecardSections = (markdown) => {
  const sections = [];
  const lines = markdown.split('\n');
  let currentSection = null;
  let introContent = '';

  const finishSection = () => {
    if (currentSection && currentSection.content.trim()) {
      sections.push(currentSection);
    }
  };

  for (const line of lines) {
    // Match ## or ### headings
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    
    if (headingMatch) {
      finishSection();
      const title = headingMatch[2].trim();
      const titleLower = title.toLowerCase();
      
      currentSection = {
        id: titleLower.replace(/[^a-z0-9]+/g, '-'),
        title,
        content: '',
        isHowToWin: titleLower.includes('how to win') || titleLower.includes('how-to-win'),
        isStrengths: titleLower.includes('strength') || titleLower.includes('weakness'),
        isPricing: titleLower.includes('pricing') || titleLower.includes('price'),
        isNews: titleLower.includes('news') || titleLower.includes('launch') || titleLower.includes('recent'),
        isSentiment: titleLower.includes('sentiment') || titleLower.includes('customer'),
        isOverview: titleLower.includes('overview') || titleLower.includes('positioning') || titleLower.includes('position'),
      };
    } else if (currentSection) {
      currentSection.content += line + '\n';
    } else {
      introContent += line + '\n';
    }
  }

  finishSection();

  // Prepend intro as overview if exists
  if (introContent.trim() && sections.length > 0) {
    sections.unshift({
      id: 'overview',
      title: 'Overview',
      content: introContent,
      isOverview: true,
      isHowToWin: false,
      isStrengths: false,
      isPricing: false,
      isNews: false,
      isSentiment: false,
    });
  }

  return sections;
};

// Parse strengths and weaknesses into arrays
const parseStrengthsWeaknesses = (content) => {
  const strengths = [];
  const weaknesses = [];
  let currentList = null;
  let buffer = '';

  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for section headers
    if (/strength/i.test(trimmed) && !/weakness/i.test(trimmed)) {
      if (buffer && currentList) {
        currentList.push(buffer.trim());
        buffer = '';
      }
      currentList = strengths;
      continue;
    } else if (/weakness/i.test(trimmed)) {
      if (buffer && currentList) {
        currentList.push(buffer.trim());
        buffer = '';
      }
      currentList = weaknesses;
      continue;
    }
    
    // Parse list items
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (buffer && currentList) {
        currentList.push(buffer.trim());
      }
      buffer = trimmed.substring(2);
    } else if (trimmed.match(/^\d+\.\s/)) {
      if (buffer && currentList) {
        currentList.push(buffer.trim());
      }
      buffer = trimmed.replace(/^\d+\.\s/, '');
    } else if (trimmed && currentList && buffer) {
      buffer += ' ' + trimmed;
    }
  }
  
  // Push remaining buffer
  if (buffer && currentList) {
    currentList.push(buffer.trim());
  }

  return { strengths, weaknesses };
};

// Individual Section Card Component
const SectionCard = ({ section }) => {
  const [expanded, setExpanded] = useState(true);

  const cardClass = `
    bg-gray-800 rounded-2xl border shadow-2xl shadow-black/50
    ${section.isHowToWin ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700'}
    transition-all duration-200 hover:border-gray-600
  `;

  const renderContent = () => {
    // Strengths & Weaknesses - Two Column Layout
    if (section.isStrengths) {
      const { strengths, weaknesses } = parseStrengthsWeaknesses(section.content);
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-900/50 rounded-xl p-5 border border-green-900/30">
            <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2 text-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Strengths
            </h4>
            <ul className="space-y-3">
              {strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {strengths.length === 0 && (
                <li className="text-gray-500 text-sm">No strengths identified</li>
              )}
            </ul>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-5 border border-red-900/30">
            <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2 text-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Weaknesses
            </h4>
            <ul className="space-y-3">
              {weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {weaknesses.length === 0 && (
                <li className="text-gray-500 text-sm">No weaknesses identified</li>
              )}
            </ul>
          </div>
        </div>
      );
    }

    // Pricing Section - Highlight Numbers
    if (section.isPricing) {
      const html = marked(section.content);
      const highlightedHtml = html
        .replace(/(\$[\d,]+(?:\.\d{2})?)/g, '<span class="text-blue-400 font-semibold text-lg">$1</span>')
        .replace(/(\d+%)/g, '<span class="text-blue-400 font-semibold">$1</span>')
        .replace(/free/gi, '<span class="text-green-400 font-semibold">Free</span>');
      
      return (
        <div 
          className="prose-pricing mt-4"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      );
    }

    // News Section - Mini Cards
    if (section.isNews) {
      const items = section.content
        .split('\n')
        .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))
        .map(line => line.replace(/^[*-]\s*/, '').trim());
      
      return (
        <div className="space-y-3 mt-4">
          {items.map((item, i) => (
            <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
              <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-gray-500 text-sm italic">No recent news available</div>
          )}
        </div>
      );
    }

    // Sentiment Section - Add Icons
    if (section.isSentiment) {
      const html = marked(section.content);
      const withIcons = html
        .replace(/positive/gi, '<span class="text-green-400">👍 Positive</span>')
        .replace(/negative/gi, '<span class="text-red-400">👎 Negative</span>')
        .replace(/neutral/gi, '<span class="text-gray-400">😐 Neutral</span>')
        .replace(/mixed/gi, '<span class="text-yellow-400">⚖️ Mixed</span>');
      
      return (
        <div 
          className="prose-sentiment mt-4"
          dangerouslySetInnerHTML={{ __html: withIcons }}
        />
      );
    }

    // Default - Overview, Positioning, etc.
    return (
      <div 
        className="prose-section text-gray-300 leading-relaxed mt-4"
        dangerouslySetInnerHTML={{ __html: marked(section.content) }}
      />
    );
  };

  return (
    <div className={cardClass}>
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${
            section.isHowToWin ? 'text-blue-400' : 'text-white'
          }`}>
            {section.title}
          </h3>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expanded && (
          <div className="animate-fadeIn">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

// Battlecard View with Structured Sections
const BattlecardView = ({ markdown, sources }) => {
  const sections = parseBattlecardSections(markdown);

  return (
    <div className="space-y-6 animate-fadeIn">
      {sections.map((section, index) => (
        <SectionCard 
          key={section.id || index} 
          section={section}
        />
      ))}
      
      {/* Sources Section */}
      {sources && sources.length > 0 && (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Sources ({sources.length})
          </h3>
          <ul className="space-y-3">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-400 hover:text-blue-400 transition-colors group">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center text-xs font-medium text-gray-300 group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-colors">
                  {index + 1}
                </span>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {source.title || source.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main ResultView Component
const ResultView = ({ result, type, onReset }) => {
  const [showSources, setShowSources] = useState(false);
  
  if (!result || !result.data) return null;

  const { data } = result;

  const downloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: data.markdown })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type === 'battlecard' ? data.competitor : `${data.companyA}_vs_${data.companyB}`}_battlecard.pdf`;
      link.click();
    } catch (err) {
      console.error('PDF download failed:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {type === 'battlecard' ? (
                <span>📋 Battlecard: <span className="text-blue-400">{data.competitor}</span></span>
              ) : (
                <span>⚖️ Comparison: <span className="text-blue-400">{data.companyA}</span> vs <span className="text-blue-400">{data.companyB}</span></span>
              )}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Generated on {new Date(data.generatedAt).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              ← New {type === 'battlecard' ? 'Battlecard' : 'Comparison'}
            </button>
            <button
              onClick={downloadPDF}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Content - Structured view for battlecard, raw for compare */}
      {type === 'battlecard' ? (
        <BattlecardView markdown={data.markdown} sources={data.sources} />
      ) : (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8 md:p-10">
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: marked(data.markdown || '') 
            }}
          />
          
          {data.sources && data.sources.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={() => setShowSources(!showSources)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Sources ({data.sources.length})
                </span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showSources ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSources && (
                <div className="mt-6">
                  <ul className="space-y-3">
                    {data.sources.map((source, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-400 hover:text-blue-400 transition-colors group">
                        <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center text-xs font-medium text-gray-300 group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-colors">
                          {index + 1}
                        </span>
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm hover:text-blue-400 transition-colors"
                        >
                          {source.title || source.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultView;
