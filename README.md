# Yasmine Landolsi — Portfolio

A dark, editorial-style portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS animations
- **Fonts**: Playfair Display, JetBrains Mono, DM Sans (Google Fonts)
- **Deployment**: Vercel

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

---

## Deploy to Vercel

### Option A — Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy from the project directory
vercel

# For production deployment
vercel --prod
```

### Option B — Vercel Dashboard (Recommended for first time)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/yasmine-portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site will be live at `https://yasmine-portfolio.vercel.app` (or a custom domain)

---

## Customize

- **Content**: Edit `app/page.tsx` — all data is in plain arrays/objects at the top of each section
- **Colors**: Edit `tailwind.config.ts` and `app/globals.css` CSS variables
- **Fonts**: Change the Google Fonts import in `app/globals.css`
- **Sections**: Each section is a standalone React component — easy to add/remove

---

## Project Structure

```
yasmine-portfolio/
├── app/
│   ├── globals.css      # Global styles, fonts, animations
│   ├── layout.tsx       # Root layout + metadata
│   └── page.tsx         # All portfolio sections
├── public/              # Static assets (add your photo here)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```
