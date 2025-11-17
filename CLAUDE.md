# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**AI Agents Studio** is currently in the planning phase. The project structure consists of:

- **AI_Agents_Studio_PRD.md** - Product Requirements Document (placeholder - needs to be completed)
- **VPS_CONFIGURATION_GUIDE.md** - VPS server configuration for SmartCamp infrastructure
- **branding/** - Complete SmartCampAI branding kit (Jungle Tech design system)

---

## Important Context Files

### Product Requirements
Before implementing any features, review and complete the PRD:
- `AI_Agents_Studio_PRD.md` - Define product vision, features, technical requirements

### Infrastructure
The VPS infrastructure is already configured and documented:
- `VPS_CONFIGURATION_GUIDE.md` - Complete VPS setup for srv867044.hstgr.cloud
- Hosted services: Traefik (reverse proxy), n8n (automation), Supabase (backend), Flowise (AI workflows), Gotenberg (PDF)
- All services accessible via `smartcamp.ai` subdomains

### Design System
SmartCampAI branding is available for use:
- `branding/SmartCampAI_branding.md` - Complete 95-page branding guide
- `branding/QUICK_IMPLEMENTATION.md` - Fast reference for implementing Jungle Tech aesthetic
- `branding/ASSET_INVENTORY.md` - All available assets and specifications
- `branding/assets/` - Logos, backgrounds, favicons, badges

**Key Branding Elements:**
- **Design System:** "Jungle Tech" aesthetic - glass morphism over jungle background
- **Colors:** White text (`#ffffff`), Emerald accents (`#10b981`), Forest green buttons (`#1f4d2f`)
- **Typography:** Jost font family (Google Fonts)
- **Effects:** Glass morphism (`bg-white/15 backdrop-blur`), fixed jungle background
- **Components:** All UI should use transparent cards with backdrop blur

---

## Development Workflow

### When Starting Development

1. **Complete the PRD First**
   - Define product goals, features, user stories
   - Specify technical architecture and tech stack
   - Document API requirements and data models

2. **Use Global Claude Workflow**
   - Follow documentation-first approach per global CLAUDE.md
   - Use `/generate-docs-from-prd` to create architecture, API, DB docs
   - Use `/orchestrate` to coordinate specialized subagents

3. **Choose Technology Stack**
   - Consider: Next.js 14+, React, TypeScript, Tailwind CSS
   - Backend options: Supabase (already hosted), Next.js API routes, separate Node.js
   - Integration with existing VPS services (n8n, Flowise, Supabase)

### VPS Integration

The VPS is already configured with:
- **Supabase:** https://api.supabase.smartcamp.ai (PostgreSQL, Auth, Storage, Realtime)
- **n8n:** https://n8n.smartcamp.ai (workflow automation)
- **Flowise:** https://flowise.smartcamp.ai (AI chatflow builder)
- **Gotenberg:** https://gotenberg.smartcamp.ai (PDF generation)

**When integrating:**
- Credentials are stored separately (not in repo)
- Use environment variables for all API keys and connection strings
- Reference VPS_CONFIGURATION_GUIDE.md for service URLs and configuration

### Branding Implementation

**Apply SmartCampAI branding by default unless specified otherwise.**

Quick setup (detailed in branding/QUICK_IMPLEMENTATION.md):
1. Copy `branding/assets/*` to `public/` directory
2. Install Jost font from Google Fonts
3. Set up CSS variables with glass morphism theme
4. Use jungle background as fixed body background
5. Apply white text with transparency for all content
6. Use emerald green (`#10b981`) for accents only

**Common patterns:**
```jsx
// Glass card
<div className="bg-white/15 backdrop-blur border border-white/20 rounded-lg p-6">

// Primary button
<button className="bg-white text-[#1f4d2f] px-4 py-2 rounded-md hover:bg-white/90">

// Accent text
<span className="text-emerald-500">
```

---

## Project Structure (To Be Created)

When development begins, follow this structure:

```
ai-agents-studio/
├── docs/                    # Generated from PRD
│   ├── architecture.md
│   ├── API.md
│   ├── db-schema.md
│   └── features.md
├── src/ or app/            # Application code
├── public/                 # Static assets (copy branding here)
├── .env.example           # Environment variables template
├── .env.local            # Local secrets (gitignored)
└── package.json          # Dependencies
```

---

## Key Guidelines

### Documentation
- Keep AI_Agents_Studio_PRD.md as source of truth
- Use `/update-docs` after code changes
- Maintain docs/ folder with technical specifications

### Security
- Never commit `.env` files or credentials
- Use VPS infrastructure for sensitive operations
- Reference VPS_CONFIGURATION_GUIDE.md for access patterns

### Design Consistency
- Follow SmartCampAI branding kit strictly
- Use glass morphism for all UI components
- Maintain Jungle Tech aesthetic (organic + technological)
- Test on mobile (mobile-first approach)

### VPS Services
- Leverage existing Supabase for database, auth, storage
- Use n8n for automation workflows
- Integrate Flowise for AI chatflows if needed
- Use Gotenberg for PDF generation/conversion

---

## Next Steps

1. **Complete the PRD** - Define what AI Agents Studio will be
2. **Run `/generate-docs-from-prd`** - Generate architecture, API, DB documentation
3. **Initialize project** - Run `/claude-config-init` to set up full structure
4. **Choose tech stack** - Document in docs/architecture.md
5. **Apply branding** - Copy assets and implement Jungle Tech design
6. **Connect to VPS** - Configure Supabase and other service integrations

---

## Reference Documentation

- **VPS Services:** See VPS_CONFIGURATION_GUIDE.md for all hosted services
- **Design System:** See branding/SmartCampAI_branding.md for complete specifications
- **Quick Reference:** See branding/QUICK_IMPLEMENTATION.md for fast lookups
- **Global Workflow:** See ~/.claude/CLAUDE.md for subagent orchestration

---

**Project Status:** Planning Phase
**Last Updated:** 2025-11-17
