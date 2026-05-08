import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';

const SentimentMeter = ({ score }) => {
  const color = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400';
  const barColor = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div className={`${barColor} h-3 rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
        </div>
      </div>
      <span className={`text-2xl font-bold ${color}`}>{score}</span>
    </div>
  );
};

const SourceCard = ({ name, data }) => {
  if (!data) return null;
  const color = data.score >= 80 ? 'text-green-400' : data.score >= 60 ? 'text-yellow-400' : 'text-red-400';
  const barColor = data.score >= 80 ? 'bg-green-500' : data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className={`text-lg font-bold ${color}`}>{data.score}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${data.score}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>👍 {data.positive}% positive</span>
        <span>👎 {data.negative}% negative</span>
      </div>
    </div>
  );
};

const CustomerSentimentSection = ({ sentiment }) => {
  if (!sentiment) return null;

  return (
    <Card>
      <SectionHeader
        title="Customer Sentiment Analysis"
        subtitle="Aggregated reviews from Reddit, G2, Capterra, Product Hunt"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        }
      />
      <CardBody className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Overall Sentiment Score</h3>
          <SentimentMeter score={sentiment.overall} />
        </div>

        {sentiment.sources && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">By Source</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SourceCard name="Reddit" data={sentiment.sources.reddit} />
              <SourceCard name="G2" data={sentiment.sources.g2} />
              <SourceCard name="Capterra" data={sentiment.sources.capterra} />
              <SourceCard name="Product Hunt" data={sentiment.sources.producthunt} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentiment.praises?.length > 0 && (
            <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
              <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Common Praises
              </h3>
              <ul className="space-y-2">
                {sentiment.praises.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sentiment.complaints?.length > 0 && (
            <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
              <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Common Complaints
              </h3>
              <ul className="space-y-2">
                {sentiment.complaints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-400 mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomerSentimentSection;
