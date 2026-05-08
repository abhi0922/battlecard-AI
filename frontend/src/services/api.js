import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://battlecard-ai.onrender.com');

export const generateBattlecard = async (competitor) => {
  const response = await axios.post(`${API_BASE_URL}/api/generate`, { competitor });
  return response.data;
};

export const compareCompanies = async (companyA, companyB) => {
  const response = await axios.post(`${API_BASE_URL}/api/compare`, { companyA, companyB });
  return response.data;
};

export const generateIntelligence = async (company) => {
  const response = await axios.post(`${API_BASE_URL}/api/intelligence`, { company });
  return response.data;
};
