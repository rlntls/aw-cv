# ATS-Readable Markdown CV Generator

A tool to generate professional, ATS-friendly PDF CVs from simple Markdown files using `Paged.js` and `Puppeteer`.

## Workflow

1. **Configure:** Update `settings.json` with your name and preferred filename prefix.
2. **Update Content:** Edit the `resume.md` file using standard Markdown syntax.
3. **Build:** Run `npm run build` to generate the PDF locally.
4. **Publish:** Run `npm run publish` to build, commit, and push changes to your repository.

## Core Files

- `resume.md`: Your CV content in Markdown.
- `settings.json`: Configuration for your name and whether to `overwrite` previous PDF versions (set to `false` to increment filenames).
- `style.css`: Styling rules ensuring high contrast and professional layout using CSS Paged Media.
- `build.js`: The build script using `Paged.js` and `Puppeteer`.
- `package.json`: Project dependencies and scripts.
