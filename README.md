# Bharat Raj's portfolio

Portfolio and case studies of Bharat Raj, a software developer who builds AI-powered products end to end with Node.js, NestJS, Next.js, LangChain, and AWS.

**Live site:** https://bharatraj08.github.io/demo-portfolio-website/

## Built with

- Next.js (App Router, static export) and React, in TypeScript
- Hand-written CSS and one variable font (Archivo), using its width axis for the display type
- Architecture diagrams drawn as SVG from plain data (`components/SystemDiagram.tsx`)
- GitHub Actions deploying to GitHub Pages on every push to `main`

## Editing content

| What | Where |
| --- | --- |
| Profile, services, process, experience, stack, about | `content/site.ts` |
| Projects, case studies, and their diagrams | `content/projects.ts` |

To add a project, copy an entry in `content/projects.ts` and give it a new `slug`. Its case study page is generated at `/projects/<slug>/`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```
