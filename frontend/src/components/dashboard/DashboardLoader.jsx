const ProgressStep = ({ icon, label, active, done }) => (
  <div className={`flex items-center gap-4 ${done ? 'opacity-100' : active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      done ? 'bg-green-600' : active ? 'bg-blue-600 animate-pulse' : 'bg-gray-700'
    }`}>
      {done ? (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span className="text-white text-xs">{icon}</span>
      )}
    </div>
    <span className={`text-sm font-medium ${done ? 'text-green-400' : active ? 'text-blue-300' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

const DashboardLoader = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8 md:p-10">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-gray-700 rounded-full" />
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Generating Intelligence Dashboard</h3>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Our AI is researching and analyzing data from multiple sources...
          </p>

          <div className="w-full max-w-md space-y-4">
            <ProgressStep icon="1" label="Searching the web for company data" active={true} done={false} />
            <ProgressStep icon="2" label="Analyzing market positioning & SWOT" active={false} done={false} />
            <ProgressStep icon="3" label="Fetching social media & traffic data" active={false} done={false} />
            <ProgressStep icon="4" label="Aggregating customer sentiment" active={false} done={false} />
            <ProgressStep icon="5" label="Generating strategic AI insights" active={false} done={false} />
          </div>

          <p className="text-gray-500 text-sm mt-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            This usually takes 60-90 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
