import React from 'react';

const Loader = () => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Loading Card */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8 md:p-10">
        <div className="flex flex-col items-center justify-center py-8">
          {/* Animated Spinner */}
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Loading Text */}
          <h3 className="text-xl font-semibold text-white mb-2">Generating Insights</h3>
          <p className="text-gray-400 text-center mb-8">
            Our AI is analyzing data from multiple sources...
          </p>

          {/* Progress Steps */}
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Fetching data from Tavily & GNews</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600/50 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 font-medium text-sm">Processing with Groq AI</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full animate-pulse" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-50">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 font-medium text-sm">Generating battlecard</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-gray-600 h-1.5 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            ⏱️ This usually takes 30-60 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
