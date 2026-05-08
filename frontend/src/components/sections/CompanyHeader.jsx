import Badge from '../ui/Badge';

const CompanyHeader = ({ company }) => {
  if (!company) return null;
  const { name, tagline, industry, website, logo, founded, headquarters, employees, fundingRaised, valuation } = company;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-black/30 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-600">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full object-contain p-3" onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <span className="text-3xl font-bold text-blue-400">{name?.[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{name}</h1>
            <Badge variant="indigo">{industry || 'N/A'}</Badge>
          </div>
          {tagline && <p className="text-gray-400 text-sm md:text-base mb-3">{tagline}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {website && <span>🔗 {website}</span>}
            {founded && <span>📅 Founded {founded}</span>}
            {headquarters && <span>📍 {headquarters}</span>}
            {employees && <span>👥 {employees} employees</span>}
            {fundingRaised && <span>💰 {fundingRaised} raised</span>}
            {valuation && <span>🏷️ {valuation}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
