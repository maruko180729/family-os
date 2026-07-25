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
| 今天 | `/` | Daily overview, net assets, reminders |
| 経営 | `/management` | Monthly income & expense · Payment Management |
| 资产 | `/assets` | Net asset tracking, per-group editing |
| 未来 | `/growth` | Goals and growth milestones |
| 家 | `/family` | Family profile, vehicles, documents, reminders |

## Tech Stack

- **Framework**: Next.js 16 App Router
- **UI**: shadcn/ui + Tailwind CSS v4
- **Language**: TypeScript (strict)
- **Storage**: LocalStorage (→ Supabase in Beta)
- **Deploy**: Vercel

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

**Beta 0.2.2 — Multi-Currency Assets, Home Avatar, Variable Recurring Payments**

- ✅ Sprint 0–6: Foundation, 経営, Assets, Growth, Review, Family module, editing
- ✅ Hotfix: Income/expense date attribution by `date` field, not page month
- ✅ Beta 0.2: CreditCard + RecurringExpense data models, Payment Center UI
- ✅ Beta 0.2 Review Fix: Payment date defaults, expense source display
- ✅ Beta 0.2.2: China assets in CNY + exchange rate, family avatar, variable recurring payments
- 🔜 Beta 0.3: Auto recurring billing, Supabase migration

## Docs

See [`/docs`](./docs/) for ProductDNA, DesignSystem, Database schema, Roadmap, and CHANGELOG.
