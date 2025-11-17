# Vercel Deployment Guide - AI Agents Studio

Complete guide for deploying AI Agents Studio to Vercel.

---

## Prerequisites

- Vercel account (free tier works)
- GitHub repository access
- Supabase project set up
- Environment variables ready

---

## Quick Deploy (Recommended)

### Option 1: Deploy from GitHub (Easiest)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your `ai-agents-studio` repository
   - Click "Import"

3. **Configure Environment Variables**

   Add these in the Vercel dashboard (Settings → Environment Variables):

   ```env
   # Supabase (Required)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Application URL (Vercel will set this automatically)
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

   # Integration URLs (Optional)
   NEXT_PUBLIC_N8N_URL=https://n8n.smartcamp.ai
   NEXT_PUBLIC_FLOWISE_URL=https://flowise.smartcamp.ai
   NEXT_PUBLIC_GOTENBERG_URL=https://gotenberg.smartcamp.ai
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait ~2-3 minutes for build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Environment Variables

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API → Project API keys → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (SECRET!) | Supabase Dashboard → Settings → API → Project API keys → service_role |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your app URL | Auto-set by Vercel |
| `NEXT_PUBLIC_N8N_URL` | n8n instance URL | https://n8n.smartcamp.ai |
| `NEXT_PUBLIC_FLOWISE_URL` | Flowise instance URL | https://flowise.smartcamp.ai |
| `NEXT_PUBLIC_GOTENBERG_URL` | Gotenberg instance URL | https://gotenberg.smartcamp.ai |

### Setting Environment Variables in Vercel

1. Go to your project in Vercel
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Select "Production", "Preview", and "Development"
5. Click "Save"

**Important:** After adding environment variables, you must redeploy:
```bash
vercel --prod
```

---

## Database Setup

Before deploying, ensure your Supabase database is set up:

1. **Run Migrations**
   - Go to Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and execute

2. **Verify Tables**
   - Check that these tables exist:
     - `agentsapp_users`
     - `agentsapp_agents`
     - `agentsapp_executions`
     - `agentsapp_templates`

3. **Check RLS Policies**
   - Ensure Row Level Security is enabled on all tables
   - Verify policies allow authenticated users to access their data

---

## Custom Domain (Optional)

1. **Go to Domains**
   - Click "Domains" in your Vercel project
   - Click "Add"

2. **Add Your Domain**
   - Enter your domain (e.g., `agents.yourdomain.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variable**
   ```env
   NEXT_PUBLIC_APP_URL=https://agents.yourdomain.com
   ```

4. **Redeploy**

---

## Vercel Configuration

### Build Settings (Automatic)

Vercel automatically detects Next.js and uses:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Framework Preset

- **Framework**: Next.js
- **Node Version**: 18.x (automatic)

### Function Configuration

API routes are configured for:
- **Max Duration**: 30 seconds (configurable in `vercel.json`)
- **Region**: US East (iad1)
- **Memory**: 1024 MB (default)

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Error: "Environment variable not found"**
- Check all required env vars are set in Vercel dashboard
- Redeploy after adding env vars

**Error: "Build exceeded maximum duration"**
- Check build logs in Vercel dashboard
- May need to upgrade Vercel plan for larger builds

### Runtime Errors

**Error: "Unauthorized" / Authentication fails**
```bash
# Verify Supabase credentials
# Check that NEXT_PUBLIC_SUPABASE_URL and keys are correct
# Ensure they're set for "Production" environment
```

**Error: "Database connection failed"**
- Check Supabase project is active
- Verify RLS policies allow access
- Check service role key is correct

**Error: "CORS issues"**
- Vercel automatically handles CORS for same-domain requests
- For external APIs, check `vercel.json` headers configuration

### Performance Issues

**Slow API responses**
- Check Supabase logs for slow queries
- Consider adding database indexes
- Check API route timeouts in `vercel.json`

**Build is slow**
- Large dependencies can slow builds
- Consider using `output: 'standalone'` for smaller builds (requires custom setup)

---

## Monitoring

### Vercel Analytics (Built-in)

1. Enable in Vercel dashboard
2. View real-time metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Geographic distribution

### Custom Logging

Add to your code:
```typescript
console.log('[INFO]', 'message') // Visible in Vercel logs
console.error('[ERROR]', error)  // Visible in Vercel logs
```

View logs:
- Vercel Dashboard → Deployments → Click deployment → Function Logs

### Supabase Logs

Monitor database queries:
- Supabase Dashboard → Logs
- Filter by error level
- Check slow queries

---

## Deployment Checklist

Before deploying to production:

- [ ] ✅ All environment variables set in Vercel
- [ ] ✅ Database migrations applied to Supabase
- [ ] ✅ Seed data added (templates)
- [ ] ✅ RLS policies tested
- [ ] ✅ Build succeeds locally (`npm run build`)
- [ ] ✅ Type check passes (`npm run type-check`)
- [ ] ✅ Tests pass (`npm test`)
- [ ] ✅ Custom domain configured (if applicable)
- [ ] ✅ OAuth redirect URLs updated in Supabase
- [ ] ✅ Email templates configured in Supabase

---

## OAuth Configuration

Update OAuth redirect URLs in Supabase:

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add Site URL:
   ```
   https://your-app.vercel.app
   ```
3. Add Redirect URLs:
   ```
   https://your-app.vercel.app/auth/callback
   https://your-app.vercel.app/**
   ```

For Google OAuth:
1. Google Cloud Console → Credentials
2. Add authorized redirect URI:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

For GitHub OAuth:
1. GitHub → Settings → Developer settings → OAuth Apps
2. Update Authorization callback URL:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

---

## CI/CD (Automatic)

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches and PRs

### GitHub Integration

Every pull request gets:
- Automatic preview deployment
- Unique URL for testing
- Comment on PR with deployment URL

---

## Rollback

If something goes wrong:

1. **Via Dashboard**
   - Go to Deployments
   - Find previous working deployment
   - Click "⋯" → Promote to Production

2. **Via CLI**
   ```bash
   vercel rollback
   ```

---

## Scaling

### Free Tier Limits
- 100 GB bandwidth/month
- 100 hours serverless function execution/month
- Unlimited deployments

### Upgrade for:
- More bandwidth
- Longer function execution
- Advanced analytics
- Team features

---

## Post-Deployment

### Test Everything

1. **Authentication**
   - Sign up with email (magic link)
   - Sign in with Google
   - Sign in with GitHub

2. **Core Features**
   - Create an agent
   - Execute an agent
   - View executions
   - Browse templates
   - Update profile
   - Generate API key

3. **Performance**
   - Check page load times
   - Monitor API response times
   - Verify no console errors

### Monitor

- Check Vercel Analytics daily
- Review Supabase logs weekly
- Set up alerts for errors

---

## Support

**Vercel Issues:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

**Application Issues:**
- Check `AUDIT_REPORT.md` for known issues
- Review `ISSUE_MANIFEST.md` for pending fixes
- Open GitHub issue

---

## Security Notes

**Important:**
- ✅ Never commit `.env` files
- ✅ Use Vercel environment variables for secrets
- ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- ✅ Enable RLS on all Supabase tables
- ✅ Use HTTPS only (Vercel enforces this)

---

## Cost Estimate

**Vercel Free Tier:**
- $0/month
- Perfect for development and small projects

**Vercel Pro:**
- $20/month
- More bandwidth and features
- Recommended for production

**Supabase Free Tier:**
- $0/month
- 500MB database
- 1GB file storage
- Perfect for MVP

**Total Monthly Cost:**
- Development: $0
- Production: $20 (Vercel Pro) + $0-25 (Supabase)

---

## Next Steps

After successful deployment:

1. **Set up monitoring** - Enable Vercel Analytics
2. **Configure custom domain** - Point your domain to Vercel
3. **Test thoroughly** - Run through all user flows
4. **Optimize** - Review performance metrics
5. **Monitor** - Watch logs for errors

---

_Last updated: 2025-11-17_

**Deployment Status**: ✅ Ready for Vercel
