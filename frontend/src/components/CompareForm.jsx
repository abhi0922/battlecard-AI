import React, { useState } from 'react';
import { compareCompanies } from '../services/api';
import { validateComparisonInput } from '../utils/validation';

const CompareForm = ({ setLoading, setResult, setError }) => {
  const [companyA, setCompanyA] = useState('');
  const [companyB, setCompanyB] = useState('');
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    setError(null);

    // Frontend validation
    const validation = validateComparisonInput(companyA, companyB);
    if (validation) {
      setValidationError(validation);
      return;
    }

    if (!companyA.trim() || !companyB.trim()) return;

    setLoading(true);

    try {
      const data = await compareCompanies(companyA, companyB);
      setResult({ type: 'compare', data });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to compare companies');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setValidationError(null);
    setError(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Compare Companies</h2>
            <p className="text-gray-400 text-sm">Side-by-side competitive analysis</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-10">
  <label className="block text-sm font-medium text-gray-300 mb-2">
    Company A
  </label>
  <input
    type="text"
    value={companyA}
    onChange={handleInputChange(setCompanyA)}
    placeholder="e.g., Stripe"
    className={`w-full px-5 py-4 bg-gray-900 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
      validationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
    }`}
    autoFocus
  />
</div>

<div className="relative z-10">
  <label className="block text-sm font-medium text-gray-300 mb-2">
    Company B
  </label>
  <input
    type="text"
    value={companyB}
    onChange={handleInputChange(setCompanyB)}
    placeholder="e.g., Razorpay"
    className={`w-full px-5 py-4 bg-gray-900 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
      validationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
    }`}
  />
</div>
        </div>

        {validationError && (
  <p className="relative z-50 text-sm text-red-400 flex items-center gap-2">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {validationError}
  </p>
)}

<button
  type="submit"
  disabled={!companyA.trim() || !companyB.trim()}
  className="relative z-50 pointer-events-auto w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:active:scale-100"
>
  <span className="flex items-center justify-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    Compare Companies
  </span>
</button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          ⚡ Powered by AI • Comparison in under 60 seconds
        </p>
      </div>
    </div>
  );
};

export default CompareForm;
