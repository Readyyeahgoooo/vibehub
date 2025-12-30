# 🚀 Deploy to Vercel (Super Simple!)

## Why Vercel?

✅ **Much simpler than Cloudflare Workers**  
✅ **API key stays hidden server-side** (in environment variables)  
✅ **Free tier is generous** (100GB bandwidth, unlimited requests)  
✅ **Automatic HTTPS and CDN**  
✅ **Zero configuration needed**

---

## 📋 Deployment Steps (5 minutes)

### Step 1: Push to GitHub (if not done already)

```bash
git add .
git commit -m "feat: Add Vercel serverless functions for API security"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "Add New Project"**
3. **Import your repository**: `Readyyeahgoooo/Vibehub-`
4. **Click "Deploy"** (no configuration needed!)

That's it! Vercel will automatically:
- Detect it's a Vite project
- Build your app
- Deploy the serverless functions in `/api`
- Give you a URL like `https://vibehub.vercel.app`

### Step 3: Add Your API Key (Environment Variable)

1. **Go to your project** on Vercel dashboard
2. **Click "Settings" → "Environment Variables"**
3. **Add a new variable**:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key from https://openrouter.ai/keys
   - **Environment**: Production (check the box)
4. **Click "Save"**
5. **Redeploy**: Go to "Deployments" → Click "..." on latest → "Redeploy"

---

## 🔑 How It Works

### Before (Insecure - API key exposed):
```
Browser → OpenRouter API (with API key visible in browser)
```

### After (Secure - API key hidden):
```
Browser → Vercel Function → OpenRouter API
         (no API key)      (API key from env var)
```

Your API key is stored in Vercel's environment variables and **never sent to the browser**!

---

## ✅ What's Included

### Serverless Functions Created:

1. **`/api/search.ts`** - AI semantic search
   - Handles OpenRouter API calls
   - API key hidden server-side
   - Automatic fallback to local search

2. **`/api/verify.ts`** - Screenshot verification
   - Analyzes images with AI vision
   - API key hidden server-side
   - Images discarded after verification

### Updated Client Services:

- `services/openrouterService.ts` - Now calls `/api/search`
- `services/verificationService.ts` - Now calls `/api/verify`

---

## 🎯 Testing Your Deployment

After deployment, test these features:

1. **Browse apps** - Should work immediately ✅
2. **AI search** - Type a query and click "AI Search" ✅
3. **Submit app** - Upload screenshot for verification ✅
4. **Share links** - Click app names to get shareable URLs ✅

---

## 💰 Cost

**Free tier includes:**
- 100GB bandwidth/month
- Unlimited serverless function invocations
- Automatic HTTPS
- Global CDN

**OpenRouter costs:**
- Your model (`nex-agi/deepseek-v3.1-nex-n1:free`) is **FREE**!
- Backup model (`google/gemini-2.0-flash-exp:free`) is also **FREE**!

**Total: $0/month** 🎉

---

## 🔧 Local Development

To test locally with the serverless functions:

```bash
# Install Vercel CLI
npm i -g vercel

# Run local dev server (includes serverless functions)
vercel dev
```

This will run your app at `http://localhost:3000` with the API functions working locally.

---

## 🆘 Troubleshooting

### AI search not working?
1. Check environment variable is set: `OPENROUTER_API_KEY`
2. Redeploy after adding the variable
3. Check browser console for errors

### Functions returning 500 error?
1. Check Vercel function logs: Dashboard → Functions → View logs
2. Verify API key is correct
3. Check OpenRouter dashboard for API usage

### Site not loading?
1. Check build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check for TypeScript errors

---

## 📚 Vercel Resources

- **Dashboard**: https://vercel.com/dashboard
- **Docs**: https://vercel.com/docs
- **Function Logs**: Dashboard → Your Project → Functions
- **Environment Variables**: Dashboard → Your Project → Settings → Environment Variables

---

## 🎉 You're Done!

Your Vibe Hub is now deployed with:
- ✅ Secure API key management (hidden server-side)
- ✅ AI-powered search
- ✅ Screenshot verification
- ✅ Shareable app pages
- ✅ Multi-language support
- ✅ Free hosting

**No Cloudflare Workers complexity needed!** 🚀

---

## 🔄 Future Updates

To update your site:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel automatically redeploys on every push to `main`!
