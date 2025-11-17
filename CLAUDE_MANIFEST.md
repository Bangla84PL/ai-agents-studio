# AI Agents Studio - Claude Manifest

**Project Status:** In Development
**Version:** 0.1.0
**Last Updated:** 2025-11-17

## Project Summary

AI Agents Studio is a comprehensive platform for creating, managing, deploying, and monitoring AI agents. It provides a visual builder interface, pre-built templates, and integrations with n8n workflows and Flowise chatflows.

**Core Value Proposition:** Empowers developers and technical users to build and deploy AI agents without complex infrastructure setup.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x + CSS Variables
- **UI Components:** Custom components following shadcn/ui patterns
- **State Management:** React Context (auth) + Zustand (app state)
- **Forms:** React Hook Form + Zod validation

### Backend
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth (Magic Links + OAuth)
- **API:** Next.js Route Handlers (RESTful)
- **Storage:** Supabase Storage (agent assets)
- **Real-time:** Supabase Realtime (execution updates)

### Infrastructure (VPS: srv867044.hstgr.cloud)
- **Reverse Proxy:** Traefik v2.10
- **Automation:** n8n (integrated via webhooks)
- **AI Chatflows:** Flowise (integrated via REST API)
- **PDF Generation:** Gotenberg v8
- **Backend:** Supabase (self-hosted)

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Git:** Conventional commits

---

## Folder Structure

```
ai-agents-studio/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, signup, etc.)
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Authenticated pages
│   │   ├── agents/               # Agent management
│   │   ├── templates/            # Agent templates
│   │   ├── executions/           # Execution history
│   │   ├── settings/             # User settings
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── agents/
│   │   ├── executions/
│   │   └── templates/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Slider.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardShell.tsx
│   ├── agents/                   # Agent-specific components
│   │   ├── AgentCard.tsx
│   │   ├── AgentBuilder.tsx
│   │   ├── AgentList.tsx
│   │   └── ...
│   └── templates/                # Template components
│
├── lib/                          # Utility functions
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Client-side client
│   │   ├── server.ts             # Server-side client
│   │   └── middleware.ts         # Middleware client
│   ├── api/                      # API utilities
│   ├── utils.ts                  # General utilities
│   └── types.ts                  # TypeScript types
│
├── public/                       # Static assets
│   ├── SmartCampAIpng.png        # Logo
│   ├── jungle background.png    # Background image
│   ├── Monkey_SmartCampAI-no-background.png
│   ├── n8n-certified-creator.png
│   ├── favicon.ico
│   └── ...
│
├── supabase/                     # Supabase schema & migrations
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql                  # Seed data (templates)
│
├── docs/                         # Additional documentation
│   └── ARCHITECTURE.md
│
├── branding/                     # SmartCampAI branding kit
│   └── ...
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md                     # Quick start guide
├── CLAUDE_MANIFEST.md            # This file
├── PROGRESS.md                   # Change log
├── DECISIONS.md                  # Architectural decisions
├── BRANDING_IMPLEMENTATION.md    # Branding documentation
├── API.md                        # API documentation
└── DEPLOYMENT.md                 # Deployment guide
```

---

## How to Run

### Development (Local)

1. **Prerequisites:**
   ```bash
   node >= 18.x
   npm >= 9.x
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with Supabase credentials
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Access Application:**
   ```
   http://localhost:3000
   ```

### Production (VPS)

See `DEPLOYMENT.md` for full deployment instructions.

**Quick Deploy:**
```bash
# Build Docker image
docker build -t ai-agents-studio .

# Run with docker-compose
cd /root/ai-agents-studio
docker-compose up -d
```

**Access:** https://agents.smartcamp.ai

---

## Database Schema

**Namespace:** All tables prefixed with `agentsapp_`

### Core Tables

#### `agentsapp_users`
Extended user profile beyond Supabase auth.users
- Preferences
- API keys
- Usage quotas

#### `agentsapp_agents`
Agent definitions and configurations
- Name, description, type
- JSONB config (flexible schema)
- Status (draft, active, paused, archived)

#### `agentsapp_executions`
Agent execution history
- Agent ID reference
- Input data
- Output data
- Status, duration, error logs

#### `agentsapp_templates`
Pre-built agent templates
- Category (chat, workflow, hybrid)
- Config template
- Tags for discovery

### Storage Buckets

- `agentsapp-uploads` - User-uploaded files
- `agentsapp-agent-assets` - Agent-specific assets

See `supabase/migrations/001_initial_schema.sql` for complete schema.

---

## Branding & VPS Documentation

### Branding Files
- `branding/SmartCampAI_branding.md` - Complete branding guide (95 pages)
- `branding/QUICK_IMPLEMENTATION.md` - Quick reference
- `branding/assets/` - All brand assets

**Key Branding Elements:**
- **Design System:** "Jungle Tech" - glass morphism over jungle background
- **Colors:** White text, emerald accents (#10b981), forest green buttons (#1f4d2f)
- **Typography:** Jost font family
- **Effects:** Glass morphism (`bg-white/15 backdrop-blur`)
- **Footer:** Always include "© Created with ❤️ by SmartCamp.AI" linking to smartcamp.ai

### VPS Documentation
- `VPS_CONFIGURATION_GUIDE.md` - Complete VPS setup
- `VPS_TECHNICAL_DOCUMENTATION.md` - Technical details

**VPS Services:**
- n8n: https://n8n.smartcamp.ai
- Flowise: https://flowise.smartcamp.ai
- Gotenberg: https://gotenberg.smartcamp.ai
- Supabase API: https://api.supabase.smartcamp.ai
- Supabase Studio: https://supabase.smartcamp.ai

---

## Environment Variables

See `.env.example` for complete list. Key variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://api.supabase.smartcamp.ai
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# n8n Integration
N8N_API_URL=https://n8n.smartcamp.ai
N8N_API_KEY=your_n8n_api_key

# Flowise Integration
FLOWISE_API_URL=https://flowise.smartcamp.ai
FLOWISE_API_KEY=your_flowise_api_key

# Gotenberg Integration
GOTENBERG_API_URL=https://gotenberg.smartcamp.ai

# Application
NEXT_PUBLIC_APP_URL=https://agents.smartcamp.ai
```

---

## Key Features

### 1. Agent Management
- Create, edit, delete agents
- Visual + code-based builder
- Categorization (chat, workflow, hybrid)
- Status management (draft, active, paused, archived)

### 2. Agent Templates
- Pre-built templates library
- Filter by category and tags
- One-click instantiation
- Customizable after creation

### 3. Agent Execution
- Manual triggers
- Real-time execution monitoring
- Execution history and logs
- Error tracking and debugging

### 4. Integrations
- **n8n:** Trigger workflows via webhooks
- **Flowise:** Call AI chatflows via API
- **Gotenberg:** Generate PDF reports

### 5. Analytics & Monitoring
- Execution metrics dashboard
- Success/failure rates
- Performance metrics
- Usage quotas

---

## API Overview

See `API.md` for complete documentation.

### Authentication
All endpoints require JWT token from Supabase Auth:
```
Authorization: Bearer <jwt_token>
```

### Core Endpoints

**Agents:**
- `GET /api/agents` - List user's agents
- `POST /api/agents` - Create new agent
- `GET /api/agents/[id]` - Get agent details
- `PUT /api/agents/[id]` - Update agent
- `DELETE /api/agents/[id]` - Delete agent
- `POST /api/agents/[id]/execute` - Execute agent

**Templates:**
- `GET /api/templates` - List templates
- `GET /api/templates/[id]` - Get template details

**Executions:**
- `GET /api/executions` - List executions
- `GET /api/executions/[id]` - Get execution details

---

## Development Workflow

### Adding a New Feature

1. **Update Documentation:**
   - Add decision to `DECISIONS.md` if architectural
   - Plan implementation steps

2. **Implement:**
   - Create components in `components/`
   - Add API routes in `app/api/`
   - Update database schema if needed
   - Implement UI pages in `app/`

3. **Test:**
   - Manual testing in development
   - Verify branding consistency
   - Check responsive behavior

4. **Document:**
   - Update `PROGRESS.md` with changes
   - Update `API.md` if API changed
   - Update `README.md` if setup changed

5. **Commit:**
   - Use conventional commits
   - Reference related issues/tasks

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Prefer named exports
- Document complex logic with comments
- Use descriptive variable names

---

## Common Tasks

### Reset Database
```bash
# Apply migrations
npm run db:reset
```

### Update Supabase Schema
```bash
# Create new migration
npm run db:migration:new "description"

# Apply migrations
npm run db:push
```

### Build for Production
```bash
npm run build
npm run start
```

### Lint & Format
```bash
npm run lint
npm run format
```

---

## Troubleshooting

### Issue: Supabase Connection Failed
- Verify environment variables in `.env.local`
- Check VPS Supabase is running: `docker ps | grep supabase`
- Verify network connectivity to VPS
- Check Supabase logs: `docker logs supabase-kong`

### Issue: Branding Not Applied
- Verify jungle background image in `/public`
- Check Jost font loaded in `layout.tsx`
- Verify Tailwind config has SmartCampAI colors
- Clear Next.js cache: `rm -rf .next`

### Issue: API Requests Failing
- Verify JWT token in request headers
- Check RLS policies in Supabase
- Verify namespace prefix on tables
- Check API route logs in terminal

### Issue: Build Failing
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`
- Check TypeScript errors: `npm run type-check`
- Verify all environment variables set

---

## Important Notes for Future Claude Sessions

1. **Always check `DECISIONS.md`** before making architectural changes
2. **Update `PROGRESS.md`** after each feature completion
3. **Never commit** `.env.local` or credentials
4. **Maintain** strict namespace prefix `agentsapp_` for all Supabase resources
5. **Follow** SmartCampAI branding guide strictly
6. **Test** on multiple screen sizes (mobile-first)
7. **Include** footer with SmartCamp.AI copyright
8. **Reference** VPS_CONFIGURATION_GUIDE.md for infrastructure details
9. **Use** existing VPS services (n8n, Flowise, Gotenberg, Supabase)
10. **Document** all significant decisions in `DECISIONS.md`

---

## Quick Links

- **Supabase Studio:** https://supabase.smartcamp.ai
- **n8n:** https://n8n.smartcamp.ai
- **Flowise:** https://flowise.smartcamp.ai
- **Production App:** https://agents.smartcamp.ai (when deployed)
- **SmartCamp.AI:** https://smartcamp.ai

---

## Contact & Resources

**SmartCamp.AI:**
- Website: https://smartcamp.ai
- Email: hello@smartcamp.ai
- Phone: +48 518 894 156
- n8n Creator Profile: https://n8n.io/creators/smart-camp-ai/

---

**For Detailed Information:**
- Architecture: `docs/ARCHITECTURE.md`
- API Reference: `API.md`
- Deployment: `DEPLOYMENT.md`
- Branding: `BRANDING_IMPLEMENTATION.md`
- Changes: `PROGRESS.md`
- Decisions: `DECISIONS.md`

**Status:** 🟢 Active Development
