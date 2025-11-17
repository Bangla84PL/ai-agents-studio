# AI Agents Studio - Architectural Decisions

**Last Updated:** 2025-11-17

## Purpose
This document tracks all significant architectural, technical, and product decisions made during the autonomous development of AI Agents Studio.

---

## Product Vision Decision

**Context:** The PRD was a placeholder, requiring autonomous product definition.

**Decision:** AI Agents Studio is a comprehensive platform for creating, managing, deploying, and monitoring AI agents with the following core capabilities:
- Visual + code-based agent builder
- Pre-built agent templates library
- Integration with n8n workflows and Flowise chatflows
- Real-time agent execution and monitoring
- Multi-tenant architecture with team collaboration
- API-first design for programmatic access

**Rationale:**
1. Aligns with SmartCampAI's "AI | Automations | Web Dev" mission
2. Leverages existing VPS infrastructure (n8n, Flowise, Supabase)
3. Fills market gap for accessible AI agent development platform
4. Scalable architecture supports both individual developers and teams
5. Integration strategy provides unique competitive advantage

---

## Technical Stack Decisions

### Frontend Framework: Next.js 14 (App Router)

**Options Considered:**
- Next.js 14 (App Router)
- Next.js Pages Router
- Remix
- Plain React with Vite

**Decision:** Next.js 14 with App Router

**Rationale:**
1. Server Components reduce client-side JavaScript bundle size
2. Built-in API routes for backend logic
3. Excellent TypeScript support
4. Image optimization out of the box
5. Best-in-class SEO capabilities
6. Aligns with modern React best practices
7. Strong community and documentation

### Styling: Tailwind CSS + CSS Variables

**Decision:** Tailwind CSS v3 with SmartCampAI design tokens as CSS variables

**Rationale:**
1. Perfect match for SmartCampAI's glass morphism aesthetic
2. Utility-first approach speeds development
3. Responsive design built-in
4. Tree-shaking eliminates unused styles
5. CSS variables allow dynamic theming while maintaining branding

### State Management: React Context + Zustand

**Decision:** React Context for auth state, Zustand for complex client state

**Rationale:**
1. React Context sufficient for authentication
2. Zustand provides lightweight, scalable state management
3. No prop drilling issues
4. Minimal boilerplate compared to Redux
5. DevTools support for debugging

### Database & Backend: Supabase (PostgreSQL)

**Decision:** Use existing VPS Supabase instance with namespaced schema

**Rationale:**
1. Already deployed and configured on VPS
2. PostgreSQL provides robust relational data model
3. Row Level Security (RLS) for multi-tenant isolation
4. Real-time subscriptions for live updates
5. Built-in authentication
6. S3-compatible storage for agent assets
7. Edge functions for serverless compute

### Database Namespace: `agentsapp_*`

**Decision:** All tables, buckets, and functions prefixed with `agentsapp_`

**Examples:**
- Tables: `agentsapp_users`, `agentsapp_agents`, `agentsapp_executions`
- Buckets: `agentsapp-uploads`, `agentsapp-agent-assets`
- Functions: `agentsapp_handle_execution(...)`

**Rationale:**
1. VPS Supabase is shared across multiple projects
2. Prevents naming conflicts
3. Clear ownership and scope
4. Simplified backup/restore operations
5. Easy to identify project-specific resources

### UI Component Library: Custom + shadcn/ui principles

**Decision:** Build custom components following shadcn/ui patterns

**Rationale:**
1. Full control over SmartCampAI branding
2. No bloated dependencies
3. Copy-paste philosophy allows customization
4. Radix UI primitives provide accessibility
5. Tailwind styling aligns with design system

---

## Architecture Decisions

### Monorepo vs Single App: Single Next.js App

**Decision:** Single Next.js application (not a monorepo)

**Rationale:**
1. Simpler deployment and configuration
2. Faster initial development velocity
3. No workspace complexity
4. Easy to refactor to monorepo later if needed
5. Sufficient for current scope

### Multi-Tenancy Strategy: Row Level Security

**Decision:** Use Supabase RLS policies for tenant isolation

**Rationale:**
1. Database-level security enforcement
2. Prevents data leakage bugs
3. Simpler than separate databases per tenant
4. Scales to thousands of tenants
5. Leverages PostgreSQL's proven security model

### Authentication: Supabase Auth with Magic Links + OAuth

**Decision:** Email magic links as primary, OAuth as secondary (Google, GitHub)

**Rationale:**
1. Passwordless reduces friction and security risk
2. OAuth provides enterprise-friendly SSO
3. Supabase Auth handles all complexity
4. JWT-based sessions integrate with RLS
5. Built-in email verification

### API Design: RESTful with Next.js Route Handlers

**Decision:** RESTful API using Next.js App Router route handlers

**Endpoints:**
- `POST /api/agents` - Create agent
- `GET /api/agents` - List agents
- `GET /api/agents/[id]` - Get agent details
- `PUT /api/agents/[id]` - Update agent
- `DELETE /api/agents/[id]` - Delete agent
- `POST /api/agents/[id]/execute` - Execute agent
- `GET /api/executions` - List executions
- `GET /api/templates` - Get agent templates

**Rationale:**
1. RESTful conventions are well-understood
2. Next.js route handlers co-locate API with frontend
3. Type-safe end-to-end with TypeScript
4. Easy to add OpenAPI documentation later
5. Supports both client-side and server-side calls

### Real-Time Updates: Supabase Realtime

**Decision:** Use Supabase Realtime for live agent execution updates

**Rationale:**
1. No additional WebSocket infrastructure needed
2. Automatic connection management
3. Works seamlessly with RLS policies
4. Low latency for monitoring dashboards
5. Scales automatically

---

## Integration Decisions

### n8n Integration: Webhook-Based

**Decision:** Agents can trigger n8n workflows via webhooks

**Implementation:**
- Store n8n webhook URL in agent configuration
- POST execution data to webhook when agent runs
- Receive results via callback URL

**Rationale:**
1. Loose coupling between systems
2. n8n already configured on VPS
3. Supports complex automation workflows
4. No direct database dependencies
5. Can leverage existing n8n workflows

### Flowise Integration: API-Based

**Decision:** Agents can call Flowise chatflows via REST API

**Implementation:**
- Store Flowise chatflow ID in agent configuration
- POST messages to Flowise API endpoint
- Stream responses back to agent execution

**Rationale:**
1. Flowise provides AI chatflow capabilities
2. API integration is straightforward
3. Supports both streaming and non-streaming responses
4. Can leverage pre-built Flowise chatflows
5. Already deployed on VPS

### Gotenberg Integration: PDF Generation

**Decision:** Use Gotenberg for PDF report generation

**Use Cases:**
- Export agent execution logs as PDF
- Generate agent documentation
- Create audit reports

**Rationale:**
1. Already deployed on VPS
2. High-quality PDF conversion
3. Supports HTML to PDF (easy templating)
4. Protected by authentication
5. No additional infrastructure cost

---

## Data Model Decisions

### Agent Structure

**Decision:** Agents consist of:
```typescript
interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: 'chat' | 'workflow' | 'hybrid';
  config: AgentConfig;
  status: 'draft' | 'active' | 'paused' | 'archived';
  created_at: timestamp;
  updated_at: timestamp;
}
```

**Rationale:**
1. Simple, extensible schema
2. Type field allows for different agent categories
3. JSONB config allows flexible agent definitions
4. Status field enables lifecycle management
5. Timestamps for auditing

### Execution History: Separate Table

**Decision:** Store executions in separate `agentsapp_executions` table

**Rationale:**
1. Prevents bloating agents table
2. Enables efficient pagination
3. Simplifies retention policies
4. Better query performance
5. Can be partitioned for scale

### Agent Templates: JSON Files + Database

**Decision:** Templates stored as JSON files in codebase, cached in database

**Rationale:**
1. Version controlled with code
2. Easy to update and deploy
3. Database cache provides fast access
4. Can be extended with user-created templates later
5. Simple to seed initial templates

---

## Security Decisions

### API Authentication: JWT from Supabase

**Decision:** All API routes verify Supabase JWT token

**Implementation:**
```typescript
const token = req.headers.authorization?.split(' ')[1];
const { data: user } = await supabase.auth.getUser(token);
if (!user) return unauthorized();
```

**Rationale:**
1. Consistent with Supabase Auth
2. Stateless authentication
3. Supports fine-grained permissions
4. Easy to validate on server
5. Works with RLS policies

### Input Validation: Zod Schemas

**Decision:** Use Zod for runtime type validation

**Rationale:**
1. TypeScript-first design
2. Runtime validation catches malformed data
3. Excellent error messages
4. Type inference from schemas
5. Prevents injection attacks

### Rate Limiting: Upstash Redis (future)

**Decision:** Implement rate limiting in Phase 2

**Rationale:**
1. Not critical for MVP
2. Can add later with Upstash Redis
3. Focus on core functionality first
4. Traefik provides some protection
5. Document in API.md for future implementation

---

## UX/UI Decisions

### Layout Structure: Authenticated Shell

**Decision:** Authenticated users see:
- Fixed navbar (logo, nav links, user menu)
- Sidebar navigation (dashboard, agents, templates, settings)
- Main content area
- Footer with SmartCampAI branding

**Rationale:**
1. Standard SaaS layout pattern
2. Easy navigation
3. Consistent across all pages
4. Sidebar can collapse on mobile
5. Branding always visible

### Agent Builder: Tabs Interface

**Decision:** Agent builder has 3 tabs:
1. **Configure** - Name, description, type, basic settings
2. **Build** - Visual builder + code editor
3. **Test** - Test execution with mock data

**Rationale:**
1. Logical workflow progression
2. Reduces cognitive load
3. Each tab has clear purpose
4. Can save progress between tabs
5. Familiar pattern (similar to n8n/Flowise)

### Color Scheme: Follow SmartCampAI Branding

**Decision:** Strict adherence to SmartCampAI branding guide
- White text on glass morphism
- Emerald green (#10b981) for accents only
- Jungle background fixed
- Forest green (#1f4d2f) on white buttons
- Banana emoji 🍌 for sliders

**Rationale:**
1. Maintains brand consistency
2. Professional + playful aesthetic
3. Differentiates from competitors
4. Leverages comprehensive design system
5. All assets and guidelines already provided

### Mobile Experience: Progressive Enhancement

**Decision:** Mobile-first responsive design
- Stack layouts vertically on mobile
- Collapsible sidebar
- Touch-friendly targets (min 44px)
- Optimized font sizes per breakpoint

**Rationale:**
1. Mobile usage is significant
2. SmartCampAI brand guide emphasizes mobile-first
3. Better UX on all devices
4. Easier to enhance than degrade
5. SEO benefits

---

## Deployment Decisions

### Deployment Target: VPS (srv867044.hstgr.cloud)

**Decision:** Deploy to existing SmartCampAI VPS

**Configuration:**
- Docker container for Next.js app
- Traefik routing on agents.smartcamp.ai
- Supabase connection via internal network
- Let's Encrypt SSL via Traefik

**Rationale:**
1. Infrastructure already exists
2. Consistent with other SmartCampAI services
3. No additional hosting costs
4. Traefik provides SSL and routing
5. Easy integration with n8n/Flowise/Supabase

### Environment Variables Strategy

**Decision:** Three-tier configuration
1. `.env.example` - Template (committed)
2. `.env.local` - Development secrets (gitignored)
3. VPS environment file - Production secrets

**Rationale:**
1. Clear documentation via .env.example
2. Prevents secret leakage
3. Easy local development setup
4. Flexible deployment configuration
5. Standard practice

### Build Process: Docker Multi-Stage

**Decision:** Multi-stage Dockerfile
1. Dependencies stage (npm install)
2. Build stage (next build)
3. Runtime stage (minimal image)

**Rationale:**
1. Smaller production image
2. Faster deployments
3. Separates build and runtime dependencies
4. Security best practice
5. Standard for Next.js apps

---

## Testing Strategy Decisions

### Testing Approach: MVP Focus

**Decision:** Minimal testing for MVP
- Critical business logic only
- API endpoint validation
- Manual E2E testing
- Comprehensive testing in Phase 2

**Rationale:**
1. Speed to market is priority
2. Can add tests incrementally
3. TypeScript provides type safety
4. Focus on feature completeness
5. User feedback drives test coverage

### Testing Tools (Phase 2)

**Decision (for future):**
- Vitest for unit tests
- Playwright for E2E tests
- MSW for API mocking

**Rationale:**
1. Vitest is fastest Jest alternative
2. Playwright is most comprehensive E2E tool
3. MSW enables realistic API mocking
4. All integrate well with Next.js
5. Active communities and support

---

## Documentation Decisions

### Documentation Structure

**Decision:** Maintain these files:
1. `CLAUDE_MANIFEST.md` - Project orientation
2. `PROGRESS.md` - Chronological change log
3. `DECISIONS.md` - This file (architectural decisions)
4. `BRANDING_IMPLEMENTATION.md` - How branding was applied
5. `API.md` - API endpoint documentation
6. `DEPLOYMENT.md` - Deployment procedures
7. `README.md` - Quick start guide
8. `.env.example` - Environment variables template

**Rationale:**
1. Enables future Claude sessions to continue work
2. Clear separation of concerns
3. Easy to update incrementally
4. Serves as knowledge base
5. Required by project instructions

### Documentation Update Frequency

**Decision:** Update after each major milestone

**Milestones:**
- Architecture complete → Update DECISIONS.md
- Feature complete → Update PROGRESS.md + API.md
- Branding applied → Update BRANDING_IMPLEMENTATION.md
- Deployment ready → Update DEPLOYMENT.md

**Rationale:**
1. Documentation stays current
2. Captures decisions while fresh
3. Prevents documentation debt
4. Makes work traceable
5. Enables seamless handoffs

---

## Assumptions

1. **User Assumption:** Primary users are developers and technical users comfortable with JSON/code
2. **Scale Assumption:** Initial target <1000 users, <10,000 agent executions/day
3. **Infrastructure Assumption:** VPS resources (8GB RAM, 96GB disk) are sufficient
4. **Integration Assumption:** n8n and Flowise APIs remain stable
5. **Security Assumption:** Supabase RLS provides sufficient tenant isolation
6. **Performance Assumption:** SSR + client hydration provides acceptable UX
7. **Browser Assumption:** Target modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
8. **Mobile Assumption:** Mobile users primarily monitor, desktop users primarily build

---

## Risks & Mitigations

### Risk 1: VPS Resource Constraints
- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** Monitor resource usage, optimize queries, implement pagination, add caching

### Risk 2: Supabase Shared Tenant Conflicts
- **Likelihood:** Low
- **Impact:** High
- **Mitigation:** Strict namespace enforcement, RLS policies, thorough testing

### Risk 3: n8n/Flowise API Changes
- **Likelihood:** Medium
- **Impact:** Medium
- **Mitigation:** Version API integrations, graceful error handling, fallback modes

### Risk 4: Authentication Issues
- **Likelihood:** Low
- **Impact:** High
- **Mitigation:** Use battle-tested Supabase Auth, implement comprehensive logging

### Risk 5: Browser Compatibility
- **Likelihood:** Medium
- **Impact:** Low
- **Mitigation:** Test on multiple browsers, use PostCSS for vendor prefixes, progressive enhancement

---

## Future Considerations

### Phase 2 Features (Post-MVP)
1. Team collaboration (shared agents, permissions)
2. Agent marketplace (share templates)
3. Advanced monitoring (metrics, alerts, logs)
4. Scheduled execution (cron-like triggers)
5. Version control for agents (git-like history)
6. API rate limiting and usage quotas
7. Comprehensive testing suite
8. Performance optimizations
9. Agent versioning and rollback
10. Webhook support for external triggers

### Potential Tech Debt
1. No test coverage initially
2. Basic error handling only
3. Limited logging and monitoring
4. No CI/CD pipeline
5. Manual deployment process
6. No database migrations tooling

**Plan:** Address in Phase 2 based on user feedback and usage patterns

---

**Decision Authority:** Autonomous Claude Code Agent
**Review Cadence:** Updated throughout implementation
**Next Review:** After MVP deployment
