// Generic topics/keywords that should be rejected
const GENERIC_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'climate change', 'global warming',
  'weather', 'politics', 'sports', 'news', 'technology', 'science', 'health',
  'education', 'finance', 'crypto', 'blockchain', 'web3', 'metaverse', 'bitcoin'
];

const QUESTION_PATTERNS = [
  /^(what|how|why|when|where|who|is|are|can|does|do|will|would|should|could)\b/i,
  /\?$/,
  /^tell me about/i,
  /^explain/i,
  /^describe/i
];

/**
 * Validate company name input on frontend
 * Returns error message if invalid, or null if valid
 */
export const validateCompanyInput = (input) => {
  if (!input || typeof input !== 'string') {
    return 'Company name is required';
  }

  const trimmed = input.trim();
  
  // Check if empty
  if (trimmed.length === 0) {
    return 'Company name is required';
  }

  // Check length - company names are typically 1-4 words
  const words = trimmed.split(/\s+/);
  if (words.length > 5) {
    return 'Please enter a valid company name (e.g., Stripe, Razorpay)';
  }

  // Check for question patterns
  for (const pattern of QUESTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return 'Please enter a company name, not a question';
    }
  }

  // Check for generic keywords
  const lowerInput = trimmed.toLowerCase();
  for (const keyword of GENERIC_KEYWORDS) {
    if (lowerInput === keyword || lowerInput.startsWith(keyword + ' ')) {
      return 'Please enter a specific company name';
    }
  }

  // Block inputs that are sentences (have verbs)
  const sentencePattern = /\b(is|are|was|were|be|being|been|have|has|had|do|does|did|will|would|shall|should|may|might|must|can|could)\b/i;
  if (sentencePattern.test(trimmed) && words.length > 2) {
    return 'Please enter a company name only';
  }

  return null; // Valid
};

/**
 * Validate both companies for comparison
 */
export const validateComparisonInput = (companyA, companyB) => {
  const errorA = validateCompanyInput(companyA);
  if (errorA) {
    return `"${companyA}" is not a valid company name`;
  }

  const errorB = validateCompanyInput(companyB);
  if (errorB) {
    return `"${companyB}" is not a valid company name`;
  }

  return null; // Valid
};
