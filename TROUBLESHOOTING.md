# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: "Verification failed: API key not configured"

**What it means**: The Vercel serverless function cannot find your OpenRouter API key.

**Solution**:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project (vibehub)
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: Your key from https://openrouter.ai/keys
   - **Environment**: ✅ Production (and optionally Preview/Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click the **"..."** menu on the latest deployment
8. Click **"Redeploy"**
9. Wait 1-2 minutes for redeployment to complete

**After adding the key, the error will change to a proper verification result!**

---

### ❌ Error: "Verification failed: Verification API error: 500"

**What it means**: Same as above - this is the old error message format. After the latest update, you'll see "API key not configured" instead.

**Solution**: Follow the steps above to add your API key.

---

### ❌ Error: "Verification failed: OpenRouter API error: 401"

**What it means**: Your API key is invalid or expired.

**Solution**:

1. Go to https://openrouter.ai/keys
2. Check if your key is still active
3. If expired, create a new key
4. Update the `OPENROUTER_API_KEY` in Vercel environment variables
5. Redeploy

---

### ❌ Error: "Verification failed: OpenRouter API error: 429"

**What it means**: You've hit the rate limit (too many requests).

**Solution**:

1. Wait a few minutes before trying again
2. Check your OpenRouter dashboard for usage limits
3. Consider upgrading your OpenRouter plan if needed (though free tier is usually sufficient)

---

### ❌ Submit form just says "Verifying..." forever

**Possible causes**:

1. **API key not configured** - Add it to Vercel (see above)
2. **Network issue** - Check browser console for errors
3. **Image too large** - Try a smaller screenshot (< 5MB)

**Debug steps**:

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try submitting again
4. Look for error messages
5. Share the error message for help

---

### ❌ AI Search returns "API key not configured"

**What it means**: Same issue - API key not in Vercel.

**Solution**: Follow the API key setup steps above.

---

### ✅ How to verify API key is working

After adding your API key and redeploying:

1. **Test AI Search**:
   - Type a query in the search box
   - If it works, API key is configured correctly!

2. **Test Submit Form**:
   - Fill in all fields
   - Upload a screenshot showing your username
   - If you see "Verification failed: API key not configured" → Key not added yet
   - If you see "Verification failed: Username mismatch" → Key is working! (just wrong username)
   - If you see success → Everything works! 🎉

---

## Step-by-Step: Adding API Key to Vercel

### 1. Get Your OpenRouter API Key

```
1. Go to: https://openrouter.ai/keys
2. Sign in or create account (free)
3. Click "Create Key"
4. Copy the key (starts with "sk-or-v1-...")
5. Save it somewhere safe
```

### 2. Add to Vercel

```
1. Go to: https://vercel.com/dashboard
2. Click your project name
3. Click "Settings" (top menu)
4. Click "Environment Variables" (left sidebar)
5. Click "Add New"
6. Fill in:
   - Key: OPENROUTER_API_KEY
   - Value: [paste your key]
   - Environment: ✅ Production
7. Click "Save"
```

### 3. Redeploy

```
1. Click "Deployments" (top menu)
2. Find the latest deployment
3. Click "..." menu
4. Click "Redeploy"
5. Wait 1-2 minutes
```

### 4. Test

```
1. Visit your site
2. Try AI search
3. Try submitting an app
4. Should work now! 🎉
```

---

## Error Messages Explained

### Before API Key Added

```
❌ "Verification failed: API key not configured"
```
→ Add API key to Vercel

### After API Key Added (Testing)

```
✅ "Verification failed: Username mismatch"
```
→ API key works! Just need correct username in screenshot

```
✅ "Verification failed: Could not extract username from image"
```
→ API key works! Screenshot needs clearer username

```
🎉 Success! Shows category, tags, confidence
```
→ Everything works perfectly!

---

## Still Having Issues?

### Check Vercel Logs

1. Go to Vercel dashboard
2. Click your project
3. Click "Deployments"
4. Click the latest deployment
5. Click "Functions" tab
6. Look for errors in `/api/verify` or `/api/classify`

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Share the error for help

### Common Mistakes

- ❌ Added key to wrong project
- ❌ Forgot to redeploy after adding key
- ❌ Typo in environment variable name (must be exactly `OPENROUTER_API_KEY`)
- ❌ Added key to Development only (need Production too)

---

## Quick Reference

### Environment Variable Name
```
OPENROUTER_API_KEY
```
(Must be exactly this, case-sensitive!)

### Where to Get Key
```
https://openrouter.ai/keys
```

### Models Used (Both FREE!)
```
Search: google/gemini-2.0-flash-exp:free
Verification: google/gemini-2.0-flash-exp:free
```

### Cost
```
$0/month (free models!)
```

---

## Success Checklist

After setup, you should be able to:

- [ ] AI search returns results
- [ ] Submit form accepts screenshots
- [ ] Verification shows category and tags
- [ ] No "API key not configured" errors
- [ ] No 500 errors

**If all checked, you're good to go!** 🎉

---

## Need More Help?

1. Read `VERCEL_QUICKSTART.md` for deployment guide
2. Read `API_SETUP_EXPLAINED.md` for API details
3. Check Vercel logs for server errors
4. Check browser console for client errors
5. Ask for help with specific error messages
