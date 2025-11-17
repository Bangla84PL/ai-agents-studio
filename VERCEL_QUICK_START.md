# Vercel Quick Start - AI Agents Studio

**One-page reference for deploying to Vercel**

---

## ⚡ 60-Second Deploy

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Framework: **Next.js** (auto-detected)

3. **Add Environment Variables**

   **Required (3 variables):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Deploy** ✅ - Done!

---

## 📋 Pre-Deployment Checklist

### On Supabase:
- [ ] Database migrations applied (`supabase/migrations/001_initial_schema.sql`)
- [ ] All 4 tables exist (`agentsapp_users`, `agentsapp_agents`, `agentsapp_executions`, `agentsapp_templates`)
- [ ] RLS policies enabled on all tables
- [ ] Seed data added (templates)
- [ ] Site URL updated to your Vercel URL
- [ ] Redirect URLs include `/auth/callback`

### On Vercel:
- [ ] Repository connected
- [ ] 3 required environment variables set
- [ ] Build succeeds (should take ~2-3 minutes)
- [ ] Deployment URL accessible

---

## 🔑 Environment Variables

### Get from Supabase Dashboard → Settings → API:

| Variable | Location | Example |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key | `eyJhbGci...` (long) |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (SECRET!) | `eyJhbGci...` (longer) |

### Set in Vercel:
1. Project Settings → Environment Variables
2. Add each variable
3. Select: Production ✅ Preview ✅ Development ✅
4. Click Save

---

## 🧪 Test After Deployment

Visit your Vercel URL and test:

1. **Landing Page** - Should load with branding ✅
2. **Sign Up** - Enter email, receive magic link ✅
3. **Sign In** - Click magic link, redirect to dashboard ✅
4. **Create Agent** - Should save to database ✅
5. **Execute Agent** - Should create execution record ✅

---

## ⚠️ Expected Build Warnings (OK)

You'll see these warnings - **they're normal**:
```
⚠ Failed to download stylesheet for fonts
⚠ Dynamic server usage: cookies
⚠ Export encountered errors on /login
```

These don't prevent deployment. Vercel handles dynamic routes automatically.

---

## 🚨 Common Issues & Fixes

### Issue: Build fails with "Module not found"
**Fix:** Ensure all dependencies in package.json
```bash
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

### Issue: "Unauthorized" after deployment
**Fix:** Check environment variables
- Verify all 3 required vars are set in Vercel
- Ensure no typos in variable names
- Redeploy after adding vars

### Issue: "Database connection failed"
**Fix:** Check Supabase
- Verify project is active
- Check RLS policies allow access
- Verify migrations applied

### Issue: OAuth doesn't work
**Fix:** Update redirect URLs in Supabase
```
Site URL: https://your-app.vercel.app
Redirect URLs: https://your-app.vercel.app/auth/callback
```

---

## 🔄 Update Deployment

After making code changes:

```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel automatically rebuilds and deploys. ✅

---

## 📊 Monitor

- **Vercel Dashboard** → Your Project → Deployments
- **View Logs** → Click deployment → Function Logs
- **Analytics** → Enable in project settings

---

## 💰 Cost

**Free Tier includes:**
- 100 GB bandwidth/month
- 100 hours serverless execution/month
- Unlimited deployments
- **Perfect for this app!** 🎉

---

## 🆘 Need Help?

1. Check `VERCEL_DEPLOYMENT.md` (full guide)
2. Check `AUDIT_REPORT.md` (known issues)
3. [Vercel Docs](https://vercel.com/docs)
4. [Next.js Docs](https://nextjs.org/docs)

---

## ✅ Post-Deployment

1. **Update README** with your live URL
2. **Share with team** for testing
3. **Monitor errors** in Vercel dashboard
4. **Set up custom domain** (optional)

---

**Deployment Time:** ~5 minutes
**Status:** ✅ **Ready for Vercel**

_Last updated: 2025-11-17_
