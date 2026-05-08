import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const OverviewCard = ({ overview }) => {
  if (!overview) return null;
  const { summary, positioning, targetAudience } = overview;

  return (
    <Card>
      <SectionHeader
        title="Company Overview"
        subtitle="Summary, positioning & target market"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <CardBody className="space-y-6">
        {summary && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Summary</h3>
            <p className="text-gray-300 leading-relaxed text-sm">{summary}</p>
          </div>
        )}
        {positioning && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Market Positioning</h3>
            <p className="text-gray-300 leading-relaxed text-sm">{positioning}</p>
          </div>
        )}
        {targetAudience && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Audience</h3>
            <div className="flex flex-wrap gap-2">
              {targetAudience.split(',').map((aud, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-lg border border-blue-500/20">
                  {aud.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default OverviewCard;
