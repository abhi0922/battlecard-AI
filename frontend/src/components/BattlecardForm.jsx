import React, { useState } from 'react';
import { generateBattlecard } from '../services/api';
import { validateCompanyInput } from '../utils/validation';

const BattlecardForm = ({ setLoading, setResult, setError }) => {
  const [competitor, setCompetitor] = useState('');
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    setError(null);

    // Frontend validation
    const validation = validateCompanyInput(competitor);
    if (validation) {
      setValidationError(validation);
      return;
    }

    if (!competitor.trim()) return;

    setLoading(true);

    try {
      const data = await generateBattlecard(competitor);
      setResult({ type: 'battlecard', data });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate battlecard');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCompetitor(e.target.value);
    setValidationError(null);
    setError(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Generate Battlecard</h2>
            <p className="text-gray-400 text-sm">Analyze a competitor and generate actionable insights</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={competitor}
            onChange={handleInputChange}
            placeholder="e.g., Stripe, PayPal, Razorpay"
            className={`w-full px-5 py-4 bg-gray-900 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
              validationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
            }`}
            autoFocus
          />
          {validationError && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {validationError}
            </p>
          )}
        </div>

        <button
  type="submit"
  disabled={!competitor.trim()}
  className="relative z-50 pointer-events-auto w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:active:scale-100"
>
  <span className="flex items-center justify-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    Generate Battlecard
  </span>
</button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          ⚡ Powered by AI • Results in under 60 seconds
        </p>
      </div>
    </div>
  );
};

export default BattlecardForm;
