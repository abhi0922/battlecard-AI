const express = require('express');
const router = express.Router();
const { generatePDFFromMarkdown } = require('../utils/pdf');

router.post('/generate-pdf', async (req, res) => {
  try {
    const { markdown } = req.body;
    
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }

    const pdf = await generatePDFFromMarkdown(markdown);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=battlecard.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
