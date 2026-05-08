import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';

const InsightCard = ({ title, children, variant = 'blue' }) => {
  const colors = {
    blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/5', icon: 'text-blue-400', title: 'text-blue-400' },
    purple: { border: 'border-purple-500/20', bg: 'bg-purple-500/5', icon: 'text-purple-400', title: 'text-purple-400' },
    green: { border: 'border-green-500/20', bg: 'bg-green-500/5', icon: 'text-green-400', title: 'text-green-400' },
    yellow: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', icon: 'text-yellow-400', title: 'text-yellow-400' },
  };
  const c = colors[variant];
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5`}>
      <h3 className={`text-sm font-semibold ${c.title} mb-3`}>{title}</h3>
      <div className={`text-sm text-gray-300 leading-relaxed ${c.icon}`}>{children}</div>
    </div>
  );
};

const AIInsightsSection = ({ insights }) => {
  if (!insights) return null;

  const recommendations = insights.strategicRecommendations;

  return (
    <Card>
      <SectionHeader
        title="AI-Generated Strategic Insights"
        subtitle="Market direction, competitive threats & growth opportunities"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
      />
      <CardBody className="space-y-6">
        {insights.marketDirection && (
          <InsightCard title="Market Direction" variant="blue">
            <p>{insights.marketDirection}</p>
          </InsightCard>
        )}

        {insights.gtmWeaknesses && (
          <InsightCard title="GTM Weaknesses" variant="yellow">
            <p>{insights.gtmWeaknesses}</p>
          </InsightCard>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.expansionOpportunities?.length > 0 && (
            <InsightCard title="Expansion Opportunities" variant="green">
              <ul className="space-y-2">
                {insights.expansionOpportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">→</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </InsightCard>
          )}

          {insights.competitiveThreats?.length > 0 && (
            <InsightCard title="Competitive Threats" variant="yellow">
              <ul className="space-y-2">
                {insights.competitiveThreats.map((threat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">!</span>
                    <span>{threat}</span>
                  </li>
                ))}
              </ul>
            </InsightCard>
          )}
        </div>

        {recommendations?.length > 0 && (
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-sm font-semibold text-yellow-400">Strategic Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600/30 rounded-lg flex items-center justify-center text-xs font-bold text-blue-300 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AIInsightsSection;
