# 🔒 Security Guide: Protecting Your OpenRouter API Key

## The Challenge

Your Vibe Hub is a **static site** (runs entirely in the browser), which means any API keys used must be accessible to client-side JavaScript. This creates a security consideration.

## ⚠️ Important: GitHub Secrets Don't Help Here

**GitHub Secrets are for:**
- ✅ Build-time configuration
- ✅ Server-side code
- ✅ CI/CD pipelines

**GitHub Secrets DON'T work for:**
- ❌ Client-side JavaScript (browser code)
- ❌ Static sites like GitHub Pages
- ❌ Runtime API calls from the browser

Why? Because the browser needs the key to make API calls, so it must be in the JavaScript bundle.

## 🎯 Two Solutions

### Option 1: Direct API Access with Domain Restrictions (Simpler)

**How it works:**
- API key is in your `.env.local` (not committed to git)
- Vite bundles it as `import.meta.env.VITE_OPENROUTER_API_KEY`
- Browser uses it to call OpenRouter directly
- **Anyone can see the key in browser DevTools**

**Security measures:**

1. **Set Domain Restrictions** (Most Important!)
   ```
   1. Go to https://openrouter.ai/keys
   2. Click on your API key
   3. Add "Allowed Domains": yourusername.github.io
   4. Save
   ```
   Now your key only works from your domain!

2. **Set Rate Limits**
   ```
   1. In OpenRouter dashboard
   2. Set monthly spending limit: $5 (or whatever you're comfortable with)
   3. Enable email alerts
   ```

3. **Monitor Usage**
   ```
   1. Check OpenRouter dashboard regularly
   2. Look for unusual patterns
   3. Rotate key if compromised
   ```

**Pros:**
- ✅ Simple setup
- ✅ No backend needed
- ✅ Fast (direct API calls)
- ✅ Free model = no cost risk

**Cons:**
- ❌ Key visible in browser
- ❌ Relies on OpenRouter's domain restrictions

### Option 2: Cloudflare Worker Proxy (More Secure - Recommended)

**How it works:**
- API key stored in Cloudflare Worker (server-side)
- Browser calls your worker
- Worker calls OpenRouter with the key
- **Key never exposed to browser**

**Setup:**

1. **Deploy the Proxy Worker**
   ```bash
   # Update wrangler.toml
   name = "vibe-hub-proxy"
   main = "workers/proxy.ts"
   
   # Set your API key as secret
   wrangler secret put OPENROUTER_API_KEY
   # Paste your key when prompted
   
   # Deploy
   wrangler deploy
   ```

2. **Update Your .env.local**
   ```bash
   VITE_USE_PROXY=true
   VITE_PROXY_URL=https://vibe-hub-proxy.YOUR_SUBDOMAIN.workers.dev
   ```

3. **Rebuild and Deploy**
   ```bash
   npm run build
   git add .
   git commit -m "feat: Use proxy for API calls"
   git push
   ```

**Pros:**
- ✅ API key completely hidden
- ✅ Full control over API calls
- ✅ Can add additional security (rate limiting, authentication)
- ✅ Free tier: 100k requests/day

**Cons:**
- ❌ Requires Cloudflare account
- ❌ Slightly more complex setup
- ❌ Extra network hop (minimal latency)

## 🔐 Your Specific Setup

### Your Model: `nex-agi/deepseek-v3.1-nex-n1:free`

Good news! This is a **free model**, so even if someone steals your key:
- ✅ No financial cost to you
- ✅ OpenRouter's rate limits prevent abuse
- ✅ You can rotate the key anytime

### Recommended Approach for You:

**Start with Option 1** (Direct API with domain restrictions):
1. Use domain restrictions on OpenRouter
2. Set a low spending limit ($1-5/month)
3. Monitor usage weekly
4. If you see abuse, switch to Option 2

**Upgrade to Option 2** if:
- You get significant traffic
- You see suspicious usage
- You want maximum security

## 📋 Security Checklist

### Before Deployment:
- [ ] API key is in `.env.local` (NOT committed to git)
- [ ] `.gitignore` includes `.env.local`
- [ ] Domain restrictions set on OpenRouter
- [ ] Spending limit set on OpenRouter
- [ ] Email alerts enabled on OpenRouter

### After Deployment:
- [ ] Test that API calls work
- [ ] Verify key works only from your domain
- [ ] Check OpenRouter dashboard for usage
- [ ] Set calendar reminder to check weekly

### If Key is Compromised:
1. **Immediately** delete the key on OpenRouter
2. Create a new key
3. Update `.env.local` with new key
4. Rebuild and redeploy
5. Consider switching to Option 2 (proxy)

## 🛡️ Additional Security Measures

### 1. Rate Limiting (Already Implemented)
```typescript
// In utils/rateLimiter.ts
// Limits: 3 submissions per IP per 24h
```

### 2. Input Validation (Already Implemented)
```typescript
// In utils/sanitizer.ts
// Prevents XSS, validates all inputs
```

### 3. URL Validation (Already Implemented)
```typescript
// In utils/urlValidator.ts
// Blocks malicious domains
```

### 4. HTTPS Enforcement
- GitHub Pages: Automatic HTTPS
- Cloudflare Workers: Automatic HTTPS

## 🎓 Understanding the Risk

### Low Risk Scenario (Your Case):
- ✅ Free model (no cost)
- ✅ Domain restrictions
- ✅ Rate limiting
- ✅ Spending limits
- **Risk Level: LOW** ✅

### High Risk Scenario:
- ❌ Paid model
- ❌ No domain restrictions
- ❌ No rate limiting
- ❌ No spending limits
- **Risk Level: HIGH** ⚠️

## 📊 Comparison Table

| Feature | Option 1: Direct | Option 2: Proxy |
|---------|-----------------|-----------------|
| Setup Complexity | ⭐ Easy | ⭐⭐⭐ Moderate |
| Security | ⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| Performance | ⭐⭐⭐⭐⭐ Fast | ⭐⭐⭐⭐ Fast |
| Cost | Free | Free |
| Key Visibility | Visible | Hidden |
| Backend Required | No | Yes (Cloudflare) |

## 🚀 Quick Start

### For Option 1 (Recommended to Start):

```bash
# 1. Create .env.local
echo "VITE_OPENROUTER_API_KEY=your_key_here" > .env.local

# 2. Set domain restrictions on OpenRouter
# Go to https://openrouter.ai/keys

# 3. Deploy
git push origin main
```

### For Option 2 (Maximum Security):

```bash
# 1. Deploy proxy
cd workers
wrangler secret put OPENROUTER_API_KEY
wrangler deploy

# 2. Update .env.local
echo "VITE_USE_PROXY=true" >> .env.local
echo "VITE_PROXY_URL=https://your-worker.workers.dev" >> .env.local

# 3. Deploy
npm run build
git push origin main
```

## 🆘 FAQ

**Q: Will my API key be in the GitHub repository?**
A: No, if you follow the guide. `.env.local` is in `.gitignore`.

**Q: Can people see my key in the browser?**
A: With Option 1: Yes. With Option 2: No.

**Q: Is Option 1 safe enough?**
A: Yes, with domain restrictions and a free model, the risk is minimal.

**Q: Should I use GitHub Secrets?**
A: No, they don't work for client-side apps. Use `.env.local` for development and domain restrictions for production.

**Q: What if someone steals my key?**
A: With a free model and domain restrictions, they can't do much. Just rotate the key.

**Q: How do I rotate my key?**
A: Create new key on OpenRouter → Update `.env.local` → Rebuild → Deploy

## 📞 Support

- OpenRouter Security: https://openrouter.ai/docs/security
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Report issues: Create GitHub issue

---

**Remember: With a free model and proper domain restrictions, your risk is minimal. Start with Option 1, monitor usage, and upgrade to Option 2 if needed!**
