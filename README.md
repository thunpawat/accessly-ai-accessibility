# Accessly — AI Accessibility Marketing Assistant

[![Live demo](https://img.shields.io/badge/Live_Demo-Open_Accessly-5B5BD6)](https://accessly-ai-accessibility.vercel.app)

Accessly is a production-ready **Build for Good** hackathon MVP that helps small organizations turn public-facing marketing content into clearer, more inclusive communication.

**Live demo:** https://accessly-ai-accessibility.vercel.app

## The problem

Small businesses, schools, nonprofits, and community organizations often lack specialist accessibility knowledge, budget, and time. As a result, useful campaigns can unintentionally exclude people with visual, cognitive, reading, or language-access needs.

## Who it helps

- Small businesses and social enterprises creating marketing without an accessibility team
- Schools and educators communicating with students and families
- Nonprofits and community organizations serving diverse audiences
- Marketing and communications teams that need a fast accessibility first pass

## How it will be used

Users paste marketing copy or upload an image, choose the content type and audience, then run one guided workflow:

**Upload → Analyze → Fix → Compare → Export**

Accessly identifies high-priority barriers, explains why they matter, and produces practical content that a human can review before publishing. It is designed for campaign copy, social posts, event announcements, fundraising messages, and other public communications.

## Core workflow

**Upload → Analyze → Fix → Compare → Export**

- Accessibility score and prioritized issues
- Suggested image alt text
- Easy-to-read version
- Accessible marketing rewrite
- Before/after comparison
- Copy, text download, and report export
- Live OpenAI analysis plus a reliable demo mode
- Responsive, keyboard-accessible UI with reduced-motion-safe behavior

## How Codex helped

Codex was used as the engineering partner across the full delivery cycle:

- Converted the product concept into a scoped MVP and implementation plan
- Created the Next.js and TypeScript repository structure
- Built the UI, analysis workflow, OpenAI server route, and deterministic Demo Mode
- Added schema validation, graceful fallback behavior, tests, and deployment configuration
- Ran unit tests, production builds, HTTP smoke tests, and fixed implementation issues
- Prepared the project for secure deployment without exposing the OpenAI API key

## Technology

- Next.js App Router
- React and TypeScript
- OpenAI API with structured output validation
- Vitest
- Vercel

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The app starts in Demo Mode, so the judging flow works without an API call. Choose **Live AI** in the header to use the server-side OpenAI route.

## Environment

Copy `.env.example` to `.env.local` and set:

```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

The API key is read only by the server route and must never use a `NEXT_PUBLIC_` prefix.

## Quality checks

```bash
npm test
npm run build
```

Current validation status:

- Unit tests: 2/2 passing
- Production build: passing
- Live analysis API: HTTP 200 smoke-tested
- Demo Mode: available without an API key

## Deploy

Deploy to Vercel or any Node.js host that supports Next.js. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` as server-side environment variables. Demo Mode remains available if the AI service is unavailable.

## Responsible use

Accessly provides practical accessibility guidance; it does not certify WCAG or legal compliance. Human review and testing with disabled users remain essential before publishing important communications.

## Hackathon submission

- **Project:** Accessly — AI Accessibility Marketing Assistant
- **Challenge:** Build for Good
- **Public repository:** add the GitHub URL after publishing
- **Live demo:** https://accessly-ai-accessibility.vercel.app
