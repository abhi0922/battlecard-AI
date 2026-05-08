// Generic topics/concepts that should be rejected
const GENERIC_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'climate change', 'global warming',
  'weather', 'politics', 'sports', 'news', 'technology', 'science', 'health',
  'education', 'finance', 'crypto', 'blockchain', 'web3', 'metaverse', 'blockchain technology'
];

// Verbs indicating user wants an explanation
const EXPLANATION_VERBS = ['explain', 'define', 'meaning of', 'what is', 'what are', 'describe'];

// Question starters
const QUESTION_STARTERS = /^(what|how|why|when|where|who)\b/i;

/**
 * Validate company name - only rejects clearly invalid inputs
 * Allows any plausible company name (even unknown/obscure ones)
 */
const basicValidation = (input) => {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input is required' };
  }

  const trimmed = input.trim();
  
  // Check if empty
  if (trimmed.length === 0) {
    return { valid: false, error: 'Company name is required' };
  }

  // Reject if it's a question (starts with question words)
  if (QUESTION_STARTERS.test(trimmed)) {
    return { valid: false, error: 'Please enter a company name, not a question' };
  }

  // Reject if it contains explanation verbs
  const lowerInput = trimmed.toLowerCase();
  for (const verb of EXPLANATION_VERBS) {
    if (lowerInput.includes(verb)) {
      return { valid: false, error: 'Please enter a company name only' };
    }
  }

  // Reject if it looks like a sentence (more than 5 words)
  const words = trimmed.split(/\s+/);
  if (words.length > 5) {
    return { valid: false, error: 'Please enter a company name (1-4 words)' };
  }

  // Reject generic concepts
  for (const keyword of GENERIC_KEYWORDS) {
    if (lowerInput === keyword || lowerInput === keyword + ' technology' || lowerInput === keyword + ' concept') {
      return { valid: false, error: 'Please enter a specific company name, not a general topic' };
    }
  }

  // If input passes all checks, allow it (even if obscure)
  return { valid: true };
};

/**
 * Check if company name might be obscure (for warning purposes only)
 */
const checkIfObscure = (companyName) => {
  const words = companyName.trim().split(/\s+/);
  const hasCapital = /[A-Z]/.test(companyName);
  const looksLikeName = words.length <= 4 && (hasCapital || /^[a-z]+$/.test(companyName));
  return !looksLikeName;
};

/**
 * Main validation function - only uses basic checks
 * Allows all plausible company names, even unknown ones
 */
const validateCompany = async (companyName) => {
  const result = basicValidation(companyName);
  
  if (!result.valid) {
    return result;
  }

  // Warning for potentially obscure companies (but still allow)
  const isObscure = checkIfObscure(companyName);
  
  return { 
    valid: true, 
    warning: isObscure ? 'This company may be less known. Results may be approximate.' : null 
  };
};

/**
 * Validate two companies for comparison
 */
const validateCompanies = async (companyA, companyB) => {
  const resultA = basicValidation(companyA);
  if (!resultA.valid) {
    return { valid: false, error: `"${companyA}" is not a valid company name. Please enter a company name.` };
  }

  const resultB = basicValidation(companyB);
  if (!resultB.valid) {
    return { valid: false, error: `"${companyB}" is not a valid company name. Please enter a company name.` };
  }

  // Check if either company might be obscure
  const obscureA = checkIfObscure(companyA);
  const obscureB = checkIfObscure(companyB);
  const warning = obscureA || obscureB ? 'One or more companies may be less known. Results may be approximate.' : null;

  return { valid: true, warning };
};

module.exports = {
  basicValidation,
  validateCompany,
  validateCompanies
};
