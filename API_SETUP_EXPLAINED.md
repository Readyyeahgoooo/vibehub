# 🔑 API Key Setup - Simple Explanation

## Your Questions Answered

### ✅ Question 1: "Can I just add the environment variable of my API key as OPENROUTER?"

**Answer: YES! Exactly right!** 

Just add one environment variable in Vercel:
- **Name**: `OPENROUTER_API_KEY`
- **Value**: Your API key from https://openrouter.ai/keys

That's it! Nothing else needed.

### ✅ Question 2: "Will it automatically use DeepSeek?"

**Answer: YES! It's already configured!**

The code is already set up to use your preferred model:
- **For verification**: `nex-agi/deepseek-v3.1-nex-n1:free` (your DeepSeek model)
- **For search**: `google/gemini-2.0-flash-exp:free` (backup model)

You don't need to configure anything - just add the API key and it works!

---

## 🎯 How It Works

### Step 1: You Add API Key in Vercel
```
Vercel Dashboard → Settings → Environment Variables
Name: OPENROUTER_API_KEY
Value: sk-or-v1-xxxxx...
```

### Step 2: Code Uses It Automatically

**For Screenshot Verification** (`api/verify.ts`):
```typescript
model: "nex-agi/deepseek-v3.1-nex-n1:free"  // ← Your DeepSeek model
```

**For AI Search** (`api/search.ts`):
```typescript
model: "google/gemini-2.0-flash-exp:free"  // ← Backup model
```

Both are **FREE** models! 🎉

### Step 3: It Just Works!
- User uploads screenshot → Vercel function → DeepSeek analyzes it
- User searches apps → Vercel function → Gemini finds matches
- API key stays hidden server-side ✅

---

## 🔐 Security Flow

```
┌─────────┐         ┌──────────────┐         ┌─────────────┐
│ Browser │────────▶│ Vercel       │────────▶│ OpenRouter  │
│         │         │ Function     │         │ API         │
│ No key  │         │ (has key)    │         │             │
└─────────┘         └──────────────┘         └─────────────┘
                           ▲
                           │
                    Environment Variable
                    OPENROUTER_API_KEY
```

Your API key is **never sent to the browser**!

---

## 💰 Cost Breakdown

### OpenRouter API Key
- **DeepSeek model**: FREE (your verification model)
- **Gemini model**: FREE (search backup model)
- **Cost**: $0/month

### Vercel Hosting
- **Free tier**: 100GB bandwidth
- **Serverless functions**: Unlimited invocations
- **Cost**: $0/month

### Total: $0/month 🎉

---

## 🚀 Deployment Steps (Simplified)

1. **Deploy to Vercel**
   - Go to vercel.com
   - Import your GitHub repo
   - Click "Deploy"

2. **Add API Key**
   - Settings → Environment Variables
   - Add `OPENROUTER_API_KEY` = your key
   - Save and redeploy

3. **Done!**
   - DeepSeek verification: ✅ Working
   - AI search: ✅ Working
   - API key: ✅ Hidden

---

## 🧪 Testing After Deployment

### Test 1: Browse Apps (No API Key Needed)
- Visit your site
- Should see all apps immediately ✅

### Test 2: AI Search (Needs API Key)
- Type a search query
- Click "AI Search"
- Should see relevant results ✅

### Test 3: Screenshot Verification (Needs API Key)
- Click "Submit Your App"
- Upload a screenshot
- Should verify with DeepSeek ✅

---

## ❓ Common Questions

**Q: Do I need to configure which model to use?**  
A: No! It's already configured in the code.

**Q: Can I change the models later?**  
A: Yes! Edit `api/verify.ts` and `api/search.ts` to change models.

**Q: Will the API key be visible in my code?**  
A: No! It's stored in Vercel environment variables, never in code.

**Q: What if I want to use a different model?**  
A: Just edit the `model:` line in the API files and redeploy.

---

## 🎉 Summary

**You were exactly right!**

1. ✅ Just add `OPENROUTER_API_KEY` environment variable
2. ✅ DeepSeek is already configured
3. ✅ Everything works automatically
4. ✅ API key stays hidden
5. ✅ Cost: $0/month

**No complex setup needed!** 😊
