const variants = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

const Badge = ({ children, variant = 'blue', size = 'sm', className = '' }) => {
  const sizeClasses = size === 'lg' ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs';
  return (
    <span className={`inline-flex items-center font-medium rounded-lg border ${variants[variant]} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
