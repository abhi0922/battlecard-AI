const SectionHeader = ({ title, subtitle, icon, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default SectionHeader;
