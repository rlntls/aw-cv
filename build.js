const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

const date = new Date();
const month = date.toLocaleString('default', { month: 'short' });
const year = date.getFullYear();
const filename = `Alex-Wastell_CV_${month}-${year}.pdf`;

(async () => {
    try {
        const pdf = await mdToPdf({ path: 'resume.md' }, {
            config_file: 'md-to-pdf.js',
            dest: filename
        });

        if (pdf) {
            fs.writeFileSync(pdf.filename, pdf.content);
        }
        
        console.log(`✔ Generated ${filename}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
