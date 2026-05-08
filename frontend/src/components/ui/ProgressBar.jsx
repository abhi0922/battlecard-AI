const ProgressBar = ({ value, max = 100, color = 'blue', label, size = 'md', showValue = true }) => {
  const pct = Math.min((value / max) * 100, 100);
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-400">{label}</span>}
          {showValue && <span className="text-xs text-gray-400">{value}{max !== 100 && `/${max}`}</span>}
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heights[size]} overflow-hidden`}>
        <div className={`${colors[color]} ${heights[size]} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
