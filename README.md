# AI Bookkeeping & Invoice Assistant

A Nigeria-focused MVP for small businesses and freelancers who need faster invoicing, cash-flow visibility, and simple expense review without a complicated bookkeeping stack.

## Product goal
This product helps a business owner:
- set up a default Nigeria-ready profile
- create branded invoices in NGN
- track payment status and upcoming due dates
- review expenses and get AI-style category suggestions
- understand the business health from a simple dashboard

## Default setup
- Currency: NGN (₦)
- Country: Nigeria
- VAT: configurable per business profile
- Payment provider: Paystack-ready flow

## Included in this MVP
- Business onboarding and profile setup
- Invoice builder with live totals and VAT calculation
- Saved invoice list with status tracking
- Expense capture with AI-style category suggestions
- Dashboard for cash position and summary metrics
- Settings page for business defaults

## Current status
This is a demo-ready MVP for learning, design validation, and portfolio presentation.

It is not yet a production-grade financial backend. The current version uses local browser storage for data and generates Paystack-ready invoice links, but it does not yet include real authentication, database persistence, webhook verification, or live payment processing.

## Tech stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Node.js test suite for finance logic

## Local setup
1. Install dependencies
   npm install

2. Start the app
   npm run dev

3. Open the app in your browser
   http://localhost:3000

## Run tests
npm test

## Environment variables
Create a .env.local file if you later add real service integrations.

Example values:
NEXT_PUBLIC_APP_NAME=AI Bookkeeping Assistant
NEXT_PUBLIC_DEFAULT_COUNTRY=Nigeria
NEXT_PUBLIC_DEFAULT_CURRENCY=NGN
NEXT_PUBLIC_PAYSTACK_ENABLED=true
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=

## Roadmap
### Phase 1 — MVP foundation
- Completed: onboarding, invoice creation, saved invoices, expense review, settings, dashboard

### Phase 2 — Workflow automation
- real Paystack integration
- recurring invoices and reminders
- receipt OCR and upload handling
- stronger forecast and alert logic

### Phase 3 — SaaS scale
- real database and auth
- multi-user access and audit trails
- accountant collaboration and exports
- richer analytics and reporting

## Notes
This repository is intentionally structured as a practical MVP scaffold for product exploration and extension, while staying focused on Nigerian small-business needs.
