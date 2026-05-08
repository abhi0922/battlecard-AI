import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-xl">
        <p className="text-sm font-medium text-white">{payload[0].name}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899'];

const PieChartCard = ({ data, title, height = 250 }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      {title && <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#9CA3AF' }}
            formatter={(value) => <span style={{ color: '#9CA3AF' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;
