const intelligenceService = require('../services/ai/intelligenceService');
const { validateCompany } = require('../utils/validation');

exports.generateIntelligence = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    const validation = await validateCompany(company);
    if (!validation.valid) {
      return res.status(400).json({
        error: validation.error || 'Invalid company name. Please enter a valid company.'
      });
    }

    const report = await intelligenceService.generateIntelligence(company);

    if (validation.warning) {
      report.warning = validation.warning;
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Intelligence generation error:', error);
    res.status(500).json({
      error: 'Failed to generate intelligence dashboard',
      message: error.message
    });
  }
};
