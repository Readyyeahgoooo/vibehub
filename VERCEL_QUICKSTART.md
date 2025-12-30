# ⚡ Vercel Deployment - Quick Start

## 🎯 3-Step Deployment (5 minutes)

### Step 1: Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New Project"**
3. Import **`Readyyeahgoooo/Vibehub-`**
4. Click **"Deploy"** (that's it!)

Your site will be live at: `https://vibehub-[random].vercel.app`

### Step 2: Add API Key

1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Add new variable:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: Your key from https://openrouter.ai/keys
   - **Environment**: ✅ Production
3. Click **"Save"**
4. Go to **Deployments** → Click **"..."** → **"Redeploy"**

**That's it!** The code uses Google Gemini Flash (free vision model) for both search and screenshot verification. Just add the key and it works automatically! 🎉

### Step 3: Test It!

Visit your site and try:
- ✅ Browse apps (works immediately)
- ✅ AI search (type a query)
- ✅ Click app names (shareable pages)
- ✅ Language switcher

---

## ✨ What You Get

### Secure API Key Management
- API key stored in Vercel environment variables
- **Never exposed to browser**
- Serverless functions handle all API calls

### AI Models Used (Both FREE!)
- **Search**: `google/gemini-2.0-flash-exp:free` (text analysis)
- **Verification**: `google/gemini-2.0-flash-exp:free` (vision model for screenshots)
- Just add your OpenRouter API key - models are already configured!

### Features That Work Immediately
- Browse all apps
- Filter by category
- Sort columns
- Language switching (EN, 繁體, 简体)
- Shareable app detail pages
- Mobile responsive

### Features That Need API Key
- AI semantic search
- Screenshot verification (for submissions)

---

## 💰 Cost: $0/month

- Vercel Free Tier: 100GB bandwidth
- Gemini Flash (vision + text): **FREE**
- Total: **$0** 🎉

---

## 🔄 Updates

Every time you push to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "Update"
git push origin main
```

---

## 📖 Full Guide

See `VERCEL_DEPLOY.md` for detailed instructions and troubleshooting.

---

## 🎉 That's It!

Much simpler than Cloudflare Workers, right? 😊
