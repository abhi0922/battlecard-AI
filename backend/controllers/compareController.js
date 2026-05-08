const compareService = require('../services/compareService');
const { validateCompanies } = require('../utils/validation');

exports.compareCompanies = async (req, res) => {
  try {
    const { companyA, companyB } = req.body;
    
    if (!companyA || !companyB) {
      return res.status(400).json({ error: 'Both company names are required' });
    }

    // Validate both company names
    const validation = await validateCompanies(companyA, companyB);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error || 'Invalid company names. Please enter valid companies.' 
      });
    }

    const comparison = await compareService.compareCompanies(companyA, companyB);
    
    // Include warning in response if companies are potentially obscure
    if (validation.warning) {
      comparison.warning = validation.warning;
    }
    
    res.status(200).json(comparison);
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({ 
      error: 'Failed to compare companies', 
      message: error.message 
    });
  }
};
