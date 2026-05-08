import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';

const typeConfig = {
  launch: { label: 'Launch', variant: 'green' },
  partnership: { label: 'Partnership', variant: 'blue' },
  acquisition: { label: 'Acquisition', variant: 'purple' },
  expansion: { label: 'Expansion', variant: 'indigo' },
  layoff: { label: 'Layoff', variant: 'red' },
  milestone: { label: 'Milestone', variant: 'yellow' },
};

const NewsSignalCard = ({ item }) => {
  const config = typeConfig[item.type] || { label: item.type, variant: 'gray' };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-700/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant={config.variant} size="sm">{config.label}</Badge>
          <span className="text-xs text-gray-500">{item.source}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{item.title}</p>
      </div>
      <span className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap pt-1">
        {item.date}
      </span>
    </div>
  );
};

const NewsSignalsSection = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <Card>
      <SectionHeader
        title="Recent News & Signals"
        subtitle="Launches, partnerships, acquisitions & more"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        }
      />
      <CardBody className="divide-y divide-gray-700/50">
        {news.map((item, i) => (
          <NewsSignalCard key={i} item={item} />
        ))}
      </CardBody>
    </Card>
  );
};

export default NewsSignalsSection;
