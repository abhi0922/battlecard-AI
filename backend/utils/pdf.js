const puppeteer = require('puppeteer');
const marked = require('marked');

const generatePDFFromMarkdown = async (markdown) => {
  try {
    const html = marked.parse(markdown);
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                   padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
            h2 { color: #1e3a8a; margin-top: 30px; }
            h3 { color: #3730a3; }
            code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
            pre { background: #f1f5f9; padding: 15px; border-radius: 8px; overflow-x: auto; }
            ul, ol { padding-left: 25px; }
            a { color: #2563eb; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({ 
      format: 'A4', 
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
    });
    
    await browser.close();
    return pdf;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
};

module.exports = { generatePDFFromMarkdown };
