import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import { AreaChartCard, BarChartCard } from '../charts';

const GrowthCharts = ({ growth }) => {
  if (!growth) return null;

  return (
    <Card>
      <SectionHeader
        title="Growth Metrics"
        subtitle="Revenue, employees, traffic & social growth trends"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
      <CardBody>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {growth.revenue && (
            <AreaChartCard
              title="Revenue Growth ($M)"
              data={growth.revenue}
              dataKeys={['revenue']}
              colors={['#3B82F6']}
              height={200}
            />
          )}
          {growth.employees && (
            <AreaChartCard
              title="Employee Growth"
              data={growth.employees}
              dataKeys={['employees']}
              colors={['#10B981']}
              height={200}
            />
          )}
          {growth.traffic && (
            <AreaChartCard
              title="Website Traffic (Monthly Visits M)"
              data={growth.traffic}
              dataKeys={['visits']}
              colors={['#8B5CF6']}
              xKey="month"
              height={200}
            />
          )}
          {growth.social && (
            <AreaChartCard
              title="Social Media Growth (K Followers)"
              data={growth.social}
              dataKeys={['linkedin', 'twitter', 'youtube']}
              colors={['#0A66C2', '#1DA1F2', '#FF0000']}
              xKey="month"
              height={200}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default GrowthCharts;
