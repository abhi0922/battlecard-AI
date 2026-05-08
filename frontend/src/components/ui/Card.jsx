const Card = ({ children, className = '', hover = false, ...props }) => (
  <div
    className={`bg-gray-800 rounded-2xl border border-gray-700 shadow-xl shadow-black/30 ${hover ? 'hover:border-gray-600 hover:shadow-blue-900/10 transition-all duration-200' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-700/50 ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export { Card, CardHeader, CardBody };
