import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChartCard = ({ data, title, dataKeys, colors, xKey = 'name', height = 250, layout = 'vertical' }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      {title && <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout={layout} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          {layout === 'vertical' ? (
            <>
              <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#374151' }} tickLine={false} />
              <YAxis type="category" dataKey={xKey} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#374151' }} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          {dataKeys.map((key, i) => (
            <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
