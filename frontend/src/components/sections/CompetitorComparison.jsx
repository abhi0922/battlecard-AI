import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';

const CompetitorRow = ({ competitor, index }) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-600">
          {competitor.logo ? (
            <img src={competitor.logo} alt={competitor.name} className="w-full h-full object-contain p-1.5"
              onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <span className="text-sm font-bold text-blue-400">{competitor.name[0]}</span>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{competitor.name}</h4>
          <p className="text-xs text-gray-500">{competitor.positioning}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Pricing:</span>
          <span className="text-gray-300 text-right max-w-[60%]">{competitor.pricing}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Strengths:</span>
          <span className="text-green-400 text-right max-w-[60%]">{competitor.strengths}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Weaknesses:</span>
          <span className="text-red-400 text-right max-w-[60%]">{competitor.weaknesses}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Features:</span>
          <span className="text-gray-300 text-right max-w-[60%]">{competitor.features}</span>
        </div>
      </div>
    </div>
  );
};

const CompetitorComparison = ({ competitors }) => {
  if (!competitors || competitors.length === 0) return null;

  return (
    <Card>
      <SectionHeader
        title="Competitor Comparison"
        subtitle="Pricing, strengths, weaknesses & positioning"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        }
      />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((comp, i) => (
            <CompetitorRow key={i} competitor={comp} index={i} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default CompetitorComparison;
