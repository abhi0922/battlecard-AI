import { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';

const dotColors = {
  Seed: 'bg-green-500',
  'Series A': 'bg-blue-500',
  'Series B': 'bg-blue-600',
  'Series C': 'bg-blue-700',
  'Series D': 'bg-purple-500',
  'Series E': 'bg-purple-600',
  'Series F': 'bg-purple-700',
  'Series G': 'bg-indigo-500',
  'Series H': 'bg-indigo-600',
  'Series I': 'bg-indigo-700',
  Acquisition: 'bg-yellow-500',
  Milestone: 'bg-gray-500',
  IPO: 'bg-green-600',
};

const FundingTimeline = ({ funding }) => {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? funding : funding?.slice(-5);

  if (!funding) return null;

  return (
    <Card>
      <SectionHeader
        title="Funding & Growth Timeline"
        subtitle="Key rounds, acquisitions & milestones"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        action={
          funding?.length > 5 && (
            <button onClick={() => setExpanded(!expanded)} className="text-xs text-blue-400 hover:text-blue-300 font-medium">
              {expanded ? 'Show less' : `Show all (${funding.length})`}
            </button>
          )
        }
      />
      <CardBody>
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-700" />
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-gray-800 ${dotColors[item.type] || 'bg-blue-500'}`} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{item.year}</span>
                    <Badge variant={
                      item.type === 'Acquisition' ? 'yellow' :
                      item.type === 'Milestone' ? 'gray' :
                      item.type === 'Seed' ? 'green' :
                      'blue'
                    } size="sm">{item.type}</Badge>
                    {item.amount && <span className="text-sm font-medium text-green-400">{item.amount}</span>}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{item.milestone}</p>
                {item.investors && <p className="text-xs text-gray-500 mt-0.5">Investors: {item.investors}</p>}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FundingTimeline;
