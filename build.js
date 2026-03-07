const { marked } = require('marked');
const fs = require('fs');
const puppeteer = require('puppeteer');

const date = new Date();
const month = date.toLocaleString('default', { month: 'short' });
const year = date.getFullYear();
const filename = `Alex-Wastell_CV_${month}-${year}.pdf`;

// Delete previous versions of your CV in root directory
const files = fs.readdirSync(__dirname);
for (const file of files) {
  if (file.startsWith('Alex-Wastell_CV_') && file.endsWith('.pdf')) {
    fs.unlinkSync(file);
    console.log(`Cleaned up previous version: ${file}`);
  }
}

(async () => {
    try {
        console.log('Generating PDF via Paged.js + Puppeteer...');
        const markdown = fs.readFileSync('resume.md', 'utf8');
        const html = marked.parse(markdown);

        const template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>${fs.readFileSync('style.css', 'utf8')}</style>
    <script src="file://${__dirname}/node_modules/pagedjs/dist/paged.polyfill.js"></script>
</head>
<body>
    ${html}
</body>
</html>`;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: filename,
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true
        });

        await browser.close();
        console.log(`✔ Generated ${filename}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
