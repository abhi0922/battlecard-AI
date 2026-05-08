const battlecardService = require('../services/battlecardService');
const { validateCompany } = require('../utils/validation');

exports.generateBattlecard = async (req, res) => {
  try {
    const { competitor } = req.body;
    
    if (!competitor) {
      return res.status(400).json({ error: 'Competitor name is required' });
    }

    // Validate company name
    const validation = await validateCompany(competitor);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error || 'Invalid company name. Please enter a valid company.' 
      });
    }

    const battlecard = await battlecardService.generateBattlecard(competitor);
    
    // Include warning in response if company is potentially obscure
    if (validation.warning) {
      battlecard.warning = validation.warning;
    }
    
    res.status(200).json(battlecard);
  } catch (error) {
    console.error('Battlecard generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate battlecard', 
      message: error.message 
    });
  }
};
