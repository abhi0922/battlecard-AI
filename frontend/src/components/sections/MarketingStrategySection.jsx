import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';

const MarketingStrategySection = ({ marketing }) => {
  if (!marketing) return null;

  return (
    <Card>
      <SectionHeader
        title="Marketing & GTM Strategy"
        subtitle="Acquisition channels, SEO, messaging & targeting"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        }
      />
      <CardBody className="space-y-6">
        {marketing.acquisitionChannels && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Acquisition Channels</h3>
            <div className="space-y-3">
              {marketing.acquisitionChannels.map((ch, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">{ch.channel}</span>
                      <span className="text-sm font-medium text-blue-400">{ch.percentage}%</span>
                    </div>
                    <ProgressBar value={ch.percentage} max={100} color="blue" size="sm" showValue={false} />
                    {ch.description && <p className="text-xs text-gray-500 mt-1">{ch.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketing.seoStrategy && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SEO Strategy</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{marketing.seoStrategy}</p>
            </div>
          )}
          {marketing.adMessaging && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ad Messaging</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{marketing.adMessaging}</p>
            </div>
          )}
          {marketing.audienceTargeting && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Audience Targeting</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{marketing.audienceTargeting}</p>
            </div>
          )}
          {marketing.ctaStyle && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">CTA Style</h3>
              <div className="flex flex-wrap gap-2">
                {marketing.ctaStyle.split(',').map((cta, i) => (
                  <Badge key={i} variant="blue">{cta.trim()}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MarketingStrategySection;
