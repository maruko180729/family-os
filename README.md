# Family OS

家庭経営システム — A mobile-first family management app built with Next.js and shadcn/ui.

## What is Family OS?

Family OS is not accounting software. It's a system for running your household like a business — monthly reviews, asset tracking, and growth goals in one clean interface.

**Core principles:**
- One number on the home screen: net assets
- Monthly review over daily bookkeeping
- Mobile-first (390px base)
- Apple/Linear warm minimal design

## Pages

| Page | Route | Description |
|------|-------|-------------|
| 今天 | `/` | Daily overview, reminders, member status |
| 経営 | `/management` | Monthly income & expense recording |
| 资产 | `/assets` | Net asset tracking, allocation chart |
| 成长 | `/growth` | Goals and growth milestones |
| 更多 | `/more` | Tax optimization, settings |

## Tech Stack

- **Framework**: Next.js 16 App Router
- **UI**: shadcn/ui + Tailwind CSS v4
- **Language**: TypeScript (strict)
- **Storage**: LocalStorage (→ Supabase in Alpha 0.7)
- **Deploy**: Vercel

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

**Alpha 0.5 — Sprint 1 complete**

- ✅ Sprint 0: Foundation (types, storage, 10 UI components, docs)
- ✅ Sprint 1: 経営 page — income/expense recording with LocalStorage
- 🔜 Sprint 2: Monthly review
- 🔜 Sprint 3: Assets deep edit

## Docs

See [`/docs`](./docs/) for ProductDNA, DesignSystem, Database schema, Roadmap, and CHANGELOG.
