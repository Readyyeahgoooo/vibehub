# 🔑 API Key Security - Quick Answer

## Your Question:
> "Should I add my OpenRouter API key to GitHub Secrets to prevent it from leaking?"

## Short Answer:
**For a static site (GitHub Pages): GitHub Secrets won't help.** But you have two good options!

## ✅ Recommended Solution for You

### Option 1: Direct API + Domain Restrictions (Start Here)

**Setup (2 minutes):**

1. **Create `.env.local`** (never commit this!)
   ```bash
   echo "VITE_OPENROUTER_API_KEY=your_key_here" > .env.local
   ```

2. **Set domain restrictions on OpenRouter:**
   - Go to https://openrouter.ai/keys
   - Click your API key
   - Add "Allowed Domains": `yourusername.github.io`
   - Set spending limit: $5/month
   - Save

3. **Deploy:**
   ```bash
   git push origin main
   ```

**Result:**
- ✅ Your key works only from your domain
- ✅ Free model = no cost risk
- ✅ Simple setup
- ⚠️ Key visible in browser DevTools (but protected by domain restrictions)

### Option 2: Cloudflare Worker Proxy (Maximum Security)

**Setup (5 minutes):**

1. **Deploy proxy worker:**
   ```bash
   wrangler secret put OPENROUTER_API_KEY
   # Paste your key
   wrangler deploy
   ```

2. **Update `.env.local`:**
   ```bash
   VITE_USE_PROXY=true
   VITE_PROXY_URL=https://your-worker.workers.dev
   ```

3. **Deploy:**
   ```bash
   npm run build
   git push origin main
   ```

**Result:**
- ✅ API key completely hidden
- ✅ Maximum security
- ✅ Still free (Cloudflare Workers free tier)
- ✅ Your model: `nex-agi/deepseek-v3.1-nex-n1:free` works perfectly

## 🎯 For Your Specific Case

**Your Model:** `nex-agi/deepseek-v3.1-nex-n1:free`

**Good News:**
- ✅ It's a **FREE** model
- ✅ Even if someone gets your key, no cost to you
- ✅ OpenRouter has built-in rate limiting
- ✅ You can rotate keys anytime

**Recommendation:**
1. **Start with Option 1** (domain restrictions)
2. **Monitor usage** on OpenRouter dashboard
3. **Upgrade to Option 2** if you see any abuse

## 📋 Security Checklist

### ✅ What's Already Protected:
- [x] `.gitignore` includes `.env.local`
- [x] API key never committed to git
- [x] Rate limiting implemented (3 submissions/24h per IP)
- [x] Input sanitization (XSS prevention)
- [x] URL validation (malicious link detection)

### ✅ What You Need to Do:
- [ ] Create `.env.local` with your API key
- [ ] Set domain restrictions on OpenRouter
- [ ] Set spending limit on OpenRouter
- [ ] Deploy and test

## 🚫 Common Misconceptions

### ❌ "I'll use GitHub Secrets"
**Why it won't work:** GitHub Secrets are for build-time/server-side. Your app runs in the browser and needs the key at runtime.

### ❌ "I'll hide it in environment variables"
**Why it won't work:** Environment variables in Vite (`VITE_*`) are bundled into the JavaScript. Anyone can see them in DevTools.

### ✅ "I'll use domain restrictions"
**This works!** OpenRouter checks the domain making the request. Your key only works from your domain.

### ✅ "I'll use a proxy worker"
**This works best!** The key stays on the server, never exposed to the browser.

## 📊 Risk Assessment

### Your Risk Level: **LOW** ✅

**Why:**
- Free model (no financial risk)
- Domain restrictions available
- Rate limiting in place
- Can rotate key anytime

### When to Worry: **HIGH RISK** ⚠️

- Paid model without spending limits
- No domain restrictions
- No rate limiting
- High-value API access

## 🎓 Understanding the Architecture

```
┌─────────────────────────────────────────────────┐
│  Option 1: Direct API (Simpler)                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  Browser → OpenRouter API                       │
│  (Key visible but domain-restricted)            │
│                                                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Option 2: Proxy (More Secure)                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Browser → Cloudflare Worker → OpenRouter API   │
│  (Key hidden in worker)                         │
│                                                  │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start Commands

### For Option 1:
```bash
# 1. Create .env.local (local development)
echo "VITE_OPENROUTER_API_KEY=sk-or-your-key" > .env.local

# 2. Set domain restrictions on OpenRouter dashboard

# 3. Deploy
git push origin main

# Done! Your key is protected by domain restrictions
```

### For Option 2:
```bash
# 1. Deploy proxy
wrangler secret put OPENROUTER_API_KEY
wrangler deploy

# 2. Update .env.local
echo "VITE_USE_PROXY=true" >> .env.local
echo "VITE_PROXY_URL=https://your-worker.workers.dev" >> .env.local

# 3. Deploy
npm run build
git push origin main

# Done! Your key is completely hidden
```

## 📖 Full Documentation

- **Detailed Guide:** See `SECURITY.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Quick Start:** See `QUICKSTART.md`

## 🎯 Bottom Line

**For your use case (free model on GitHub Pages):**

1. ✅ **Use Option 1** to start (domain restrictions)
2. ✅ **Monitor usage** on OpenRouter dashboard
3. ✅ **Upgrade to Option 2** if needed (proxy)
4. ✅ **Don't worry** about GitHub Secrets (they won't help here)

**Your API key will be safe with domain restrictions and a free model!** 🔒
