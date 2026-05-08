import { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const Quadrant = ({ title, items, variant, icon }) => {
  const [expanded, setExpanded] = useState(true);

  const colors = {
    strengths: { border: 'border-green-500/20', bg: 'bg-green-500/5', title: 'text-green-400', dot: 'text-green-400', icon: 'bg-green-500/10' },
    weaknesses: { border: 'border-red-500/20', bg: 'bg-red-500/5', title: 'text-red-400', dot: 'text-red-400', icon: 'bg-red-500/10' },
    opportunities: { border: 'border-blue-500/20', bg: 'bg-blue-500/5', title: 'text-blue-400', dot: 'text-blue-400', icon: 'bg-blue-500/10' },
    threats: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', title: 'text-yellow-400', dot: 'text-yellow-400', icon: 'bg-yellow-500/10' },
  };

  const c = colors[variant];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${c.icon} flex items-center justify-center`}>{icon}</div>
          <span className={`font-semibold ${c.title}`}>{title}</span>
        </div>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && items?.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className={`mt-0.5 ${c.dot}`}>•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SWOTSection = ({ swot }) => {
  if (!swot) return null;

  return (
    <Card>
      <SectionHeader
        title="SWOT Analysis"
        subtitle="Strengths, Weaknesses, Opportunities & Threats"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Quadrant
            title="Strengths"
            variant="strengths"
            items={swot.strengths}
            icon={<svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <Quadrant
            title="Weaknesses"
            variant="weaknesses"
            items={swot.weaknesses}
            icon={<svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <Quadrant
            title="Opportunities"
            variant="opportunities"
            items={swot.opportunities}
            icon={<svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
          />
          <Quadrant
            title="Threats"
            variant="threats"
            items={swot.threats}
            icon={<svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default SWOTSection;
