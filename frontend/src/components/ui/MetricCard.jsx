const MetricCard = ({ label, value, change, icon, trend = 'up', variant = 'blue' }) => {
  const colors = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    red: 'from-red-600 to-red-800',
    purple: 'from-purple-600 to-purple-800',
    yellow: 'from-yellow-600 to-yellow-800',
  };

  return (
    <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        {icon && <span className="text-gray-500">{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
            </svg>
            {change}%
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
