# ATS-Readable Markdown CV Generator

## Workflow

1. **Update Content:** Edit the `resume.md` file using standard Markdown syntax.
2. **Publish:** Run `npm run publish` in your terminal. This will:
   - Generate your `resume.pdf` locally.
   - Stage your changes in Git.
   - Commit the changes with a standard "Update CV" message.
   - Push everything to your GitHub repository.

## Core Files

- `resume.md`: The content of your CV.
- `style.css`: Styling rules ensuring high contrast and ATS readability.
- `md-to-pdf.js`: Configuration for the PDF generator (page size, margins).
- `package.json`: Contains the `md-to-pdf` dependency and the build/publish scripts.
