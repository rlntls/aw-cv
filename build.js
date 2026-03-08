const { marked } = require('marked');
const fs = require('fs');
const puppeteer = require('puppeteer');

const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
const date = new Date();
const month = date.toLocaleString('default', { month: 'short' });
const year = date.getFullYear();
const prefix = `${settings.name.replace(/\s+/g, '-')}_CV`;
const baseName = `${prefix}_${month}-${year}`;
let filename = `${baseName}.pdf`;

if (settings.overwrite) {
  // Delete all previous PDF versions by this user
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file.startsWith(prefix) && file.endsWith('.pdf')) {
      fs.unlinkSync(file);
      console.log(`Cleaned up previous version: ${file}`);
    }
  }
} else {
  // Increment filename if duplicate exists
  let counter = 1;
  while (fs.existsSync(filename)) {
    filename = `${baseName}_v${counter}.pdf`;
    counter++;
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>${fs.readFileSync('style.css', 'utf8')}</style>
    <script src="file://${__dirname}/node_modules/pagedjs/dist/paged.polyfill.js"></script>
</head>
<body>
    ${html}
</body>
</html>`;

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--font-render-hinting=none' // Can sometimes help with font overhead
            ]
        });
        
        const page = await browser.newPage();
        
        // Block unnecessary resources to keep environment clean
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image', 'media', 'font'].includes(request.resourceType()) && !request.url().includes('fonts.googleapis.com') && !request.url().includes('fonts.gstatic.com')) {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.setContent(template, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: filename,
            format: 'A4',
            printBackground: false, // Minimise overhead as requested
            preferCSSPageSize: true,
            displayHeaderFooter: false, // Ensure no metadata headers are added
        });

        await browser.close();
        console.log(`✔ Generated ${filename}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
