# ATS-Readable Markdown CV Generator

## Workflow

1. **Update Content:** Edit the `resume.md` file using standard Markdown syntax.
2. **Publish:** Run `npm run publish` in your terminal. This will:
   - Generate your CV as a PDF (e.g., `Alex-Wastell_CV_Mar-2026.pdf`) locally.
   - Stage your changes in Git.
   - Commit the changes with a standard "Update CV" message.
   - Push everything to your GitHub repository.

## Core Files

- `resume.md`: The content of your CV.
- `style.css`: Styling rules ensuring high contrast and professional layout using CSS Paged Media.
- `build.js`: The build script using `Paged.js` and `Puppeteer` to generate the PDF.
- `package.json`: Contains project dependencies (`marked`, `pagedjs`, `puppeteer`) and scripts.
