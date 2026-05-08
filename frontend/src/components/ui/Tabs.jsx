import { useState } from 'react';

const Tabs = ({ tabs, defaultTab = 0, onChange, variant = 'underline' }) => {
  const [active, setActive] = useState(defaultTab);

  const handleChange = (index) => {
    setActive(index);
    onChange?.(index);
  };

  const underline = (
    <div className="flex gap-1 bg-gray-800/50 rounded-xl p-1 w-fit">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => handleChange(i)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            active === i
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const pills = (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => handleChange(i)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border ${
            active === i
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-6">{variant === 'underline' ? underline : pills}</div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
};

export default Tabs;
