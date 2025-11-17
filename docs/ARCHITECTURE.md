# AI Agents Studio - System Architecture

**Version:** 1.0
**Last Updated:** 2025-11-17
**Status:** Design Document

---

## Table of Contents

1. [Overview](#overview)
2. [System Context](#system-context)
3. [Architecture Style](#architecture-style)
4. [Component Architecture](#component-architecture)
5. [Data Architecture](#data-architecture)
6. [Security Architecture](#security-architecture)
7. [Integration Architecture](#integration-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Scalability & Performance](#scalability--performance)
10. [Technology Stack](#technology-stack)

---

## Overview

AI Agents Studio is a modern web application for creating, managing, and deploying AI agents. The architecture follows a **monolithic Next.js application** pattern with clear separation between frontend and backend concerns, leveraging Supabase for backend services.

### Architecture Goals

1. **Simplicity** - Easy to understand, develop, and deploy
2. **Security** - Multi-tenant isolation, secure authentication, RLS policies
3. **Performance** - Fast page loads, real-time updates, optimized queries
4. **Scalability** - Support growth from 10 to 10,000 users
5. **Maintainability** - Clear code organization, comprehensive documentation
6. **Integration** - Seamless connection with n8n, Flowise, Gotenberg

### Non-Goals (Phase 1)

- Complex microservices architecture
- GraphQL API (RESTful is sufficient)
- Real-time collaboration (can add later)
- Mobile native apps (responsive web first)

---

## System Context

### External Systems

```
┌──────────────────────────────────────────────────────────────┐
│                        External Users                         │
│                  (Developers, Technical Users)                │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ HTTPS
                 ▼
┌──────────────────────────────────────────────────────────────┐
│                     Traefik Reverse Proxy                     │
│              (SSL Termination, Routing, Auth)                 │
└────────────────┬─────────────────────────────────────────────┘
                 │
      ┌──────────┼──────────┐
      │          │           │
      ▼          ▼           ▼
┌───────────┐ ┌────────────────┐ ┌──────────────┐
│ AI Agents │ │    Supabase    │ │     n8n      │
│  Studio   │ │  (Auth, DB,    │ │ (Automation) │
│           │ │   Storage)     │ │              │
└─────┬─────┘ └────────────────┘ └──────────────┘
      │
      ├─────────┐
      │         │
      ▼         ▼
┌──────────┐ ┌─────────────┐
│ Flowise  │ │  Gotenberg  │
│ (AI Chat)│ │    (PDF)    │
└──────────┘ └─────────────┘
```

### System Boundaries

**In Scope:**
- AI Agents Studio application
- Supabase schema (namespaced with `agentsapp_`)
- Integration adapters for n8n, Flowise, Gotenberg
- API endpoints
- UI components and pages

**Out of Scope:**
- Traefik configuration (managed separately)
- Supabase core services (managed separately)
- n8n workflows (created by users)
- Flowise chatflows (created by users)

---

## Architecture Style

### Monolithic Next.js Application

**Why Monolithic?**
1. Simpler deployment and operations
2. Faster development velocity
3. No network latency between services
4. Easier to maintain with small team
5. Can refactor to microservices later if needed

**Why Next.js?**
1. React Server Components reduce client bundle
2. Built-in API routes (no separate backend)
3. Excellent TypeScript support
4. SSR + ISR for performance
5. Best-in-class developer experience

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                     │
│         (React Components, Pages, UI State)              │
├─────────────────────────────────────────────────────────┤
│                   Application Layer                      │
│         (API Routes, Business Logic, Validation)         │
├─────────────────────────────────────────────────────────┤
│                   Integration Layer                      │
│    (Supabase Client, n8n Adapter, Flowise Adapter)      │
├─────────────────────────────────────────────────────────┤
│                   Data Layer                             │
│           (PostgreSQL via Supabase, Storage)             │
└─────────────────────────────────────────────────────────┘
```

**Layer Responsibilities:**

1. **Presentation Layer**
   - User interface components
   - Client-side state management (Zustand)
   - Form handling and validation
   - Responsive layouts

2. **Application Layer**
   - API endpoint implementations
   - Business logic and rules
   - Data transformation
   - Error handling

3. **Integration Layer**
   - Database access (Supabase client)
   - External service adapters
   - Authentication middleware
   - Real-time subscriptions

4. **Data Layer**
   - PostgreSQL database (via Supabase)
   - Row Level Security (RLS)
   - File storage
   - Caching (future)

---

## Component Architecture

### Frontend Components

```
app/
├── (auth)/                    # Authentication pages (public)
│   ├── login/
│   │   └── page.tsx          # Login page with magic link
│   ├── signup/
│   │   └── page.tsx          # Signup page
│   └── layout.tsx            # Auth layout (no navbar/sidebar)
│
├── (dashboard)/              # Authenticated pages
│   ├── layout.tsx            # Dashboard shell (navbar + sidebar)
│   ├── page.tsx              # Dashboard home
│   │
│   ├── agents/               # Agent management
│   │   ├── page.tsx          # Agent list
│   │   ├── new/
│   │   │   └── page.tsx      # Create new agent
│   │   └── [id]/
│   │       ├── page.tsx      # Agent details
│   │       ├── edit/
│   │       │   └── page.tsx  # Edit agent
│   │       └── executions/
│   │           └── page.tsx  # Agent execution history
│   │
│   ├── templates/            # Agent templates
│   │   ├── page.tsx          # Template library
│   │   └── [id]/
│   │       └── page.tsx      # Template details
│   │
│   ├── executions/           # All executions
│   │   ├── page.tsx          # Execution list
│   │   └── [id]/
│   │       └── page.tsx      # Execution details
│   │
│   └── settings/             # User settings
│       └── page.tsx          # Settings page
│
├── api/                      # API routes
│   ├── agents/
│   │   ├── route.ts          # GET (list), POST (create)
│   │   └── [id]/
│   │       ├── route.ts      # GET, PUT, DELETE
│   │       └── execute/
│   │           └── route.ts  # POST (execute agent)
│   ├── templates/
│   │   ├── route.ts          # GET (list)
│   │   └── [id]/
│   │       └── route.ts      # GET (details)
│   ├── executions/
│   │   ├── route.ts          # GET (list)
│   │   └── [id]/
│   │       └── route.ts      # GET (details)
│   └── auth/
│       └── callback/
│           └── route.ts      # OAuth callback
│
├── layout.tsx                # Root layout
├── page.tsx                  # Landing page
└── globals.css               # Global styles
```

### Component Library Structure

```
components/
├── ui/                       # Base UI components
│   ├── Button.tsx            # All button variants
│   ├── Card.tsx              # Glass morphism cards
│   ├── Input.tsx             # Text inputs
│   ├── Textarea.tsx          # Text areas
│   ├── Select.tsx            # Select dropdowns
│   ├── Slider.tsx            # Banana emoji slider
│   ├── Checkbox.tsx          # Checkboxes
│   ├── Radio.tsx             # Radio buttons
│   ├── Toggle.tsx            # Toggle switches
│   ├── Badge.tsx             # Status badges
│   ├── Spinner.tsx           # Loading spinner
│   ├── Skeleton.tsx          # Loading skeleton
│   └── ...
│
├── layout/                   # Layout components
│   ├── Navbar.tsx            # Top navigation
│   ├── Sidebar.tsx           # Side navigation
│   ├── Footer.tsx            # Footer with branding
│   ├── DashboardShell.tsx    # Dashboard wrapper
│   └── Container.tsx         # Content container
│
├── agents/                   # Agent-specific components
│   ├── AgentCard.tsx         # Agent display card
│   ├── AgentList.tsx         # Agent list view
│   ├── AgentBuilder.tsx      # Agent builder interface
│   ├── AgentPreview.tsx      # Agent preview panel
│   ├── AgentExecutor.tsx     # Execute agent component
│   └── AgentStatus.tsx       # Status indicator
│
├── templates/                # Template components
│   ├── TemplateCard.tsx      # Template display card
│   ├── TemplateList.tsx      # Template grid
│   └── TemplateFilter.tsx    # Filter UI
│
├── executions/               # Execution components
│   ├── ExecutionCard.tsx     # Execution display
│   ├── ExecutionList.tsx     # Execution list
│   ├── ExecutionLogs.tsx     # Log viewer
│   └── ExecutionChart.tsx    # Metrics visualization
│
└── forms/                    # Form components
    ├── AgentForm.tsx         # Agent creation/edit form
    └── SettingsForm.tsx      # User settings form
```

### Backend (API) Components

```
lib/
├── supabase/                 # Supabase clients
│   ├── client.ts             # Client-side (browser)
│   ├── server.ts             # Server-side (API routes)
│   ├── middleware.ts         # Middleware (RSC)
│   └── types.ts              # Database types (generated)
│
├── api/                      # API utilities
│   ├── agents.ts             # Agent operations
│   ├── executions.ts         # Execution operations
│   ├── templates.ts          # Template operations
│   └── auth.ts               # Auth utilities
│
├── integrations/             # External integrations
│   ├── n8n.ts                # n8n webhook client
│   ├── flowise.ts            # Flowise API client
│   └── gotenberg.ts          # Gotenberg client
│
├── validators/               # Zod schemas
│   ├── agent.ts              # Agent validation
│   ├── execution.ts          # Execution validation
│   └── user.ts               # User validation
│
├── utils.ts                  # General utilities
├── constants.ts              # App constants
└── types.ts                  # TypeScript types
```

---

## Data Architecture

### Database Schema

**Namespace:** All tables prefixed with `agentsapp_`

#### Entity Relationship Diagram (Text Format)

```
┌─────────────────────┐
│   auth.users        │  (Supabase managed)
│─────────────────────│
│ id (PK)             │
│ email               │
│ created_at          │
└──────────┬──────────┘
           │
           │ 1:1
           │
┌──────────▼──────────┐
│ agentsapp_users     │  (Extended profile)
│─────────────────────│
│ id (PK, FK)         │
│ display_name        │
│ avatar_url          │
│ api_key             │
│ preferences (JSON)  │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│ agentsapp_agents    │
│─────────────────────│
│ id (PK)             │
│ user_id (FK)        │◄───────┐
│ name                │         │
│ description         │         │
│ type                │         │ 1:N
│ config (JSONB)      │         │
│ status              │         │
│ created_at          │         │
│ updated_at          │         │
└─────────────────────┘         │
                                │
                     ┌──────────┴──────────┐
                     │ agentsapp_executions│
                     │─────────────────────│
                     │ id (PK)             │
                     │ agent_id (FK)       │
                     │ user_id (FK)        │
                     │ input_data (JSONB)  │
                     │ output_data (JSONB) │
                     │ status              │
                     │ duration_ms         │
                     │ error_message       │
                     │ started_at          │
                     │ completed_at        │
                     └─────────────────────┘

┌─────────────────────┐
│ agentsapp_templates │  (Pre-built templates)
│─────────────────────│
│ id (PK)             │
│ name                │
│ description         │
│ category            │
│ config (JSONB)      │
│ tags (TEXT[])       │
│ is_public           │
│ created_at          │
│ updated_at          │
└─────────────────────┘
```

#### Table Definitions

##### `agentsapp_users`
Extended user profile beyond Supabase auth.users.

```sql
CREATE TABLE agentsapp_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  api_key TEXT UNIQUE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies:**
- Users can read/update their own profile only

##### `agentsapp_agents`
Agent definitions and configurations.

```sql
CREATE TABLE agentsapp_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES agentsapp_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('chat', 'workflow', 'hybrid')),
  config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agents_user_id ON agentsapp_agents(user_id);
CREATE INDEX idx_agents_status ON agentsapp_agents(status);
CREATE INDEX idx_agents_type ON agentsapp_agents(type);
```

**RLS Policies:**
- Users can CRUD their own agents only

**Config Schema:**
```typescript
interface AgentConfig {
  // Visual builder state
  nodes?: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: any;
  }>;
  edges?: Array<{
    id: string;
    source: string;
    target: string;
  }>;

  // Code editor state
  code?: string;

  // Integrations
  n8n?: {
    webhookUrl: string;
    enabled: boolean;
  };
  flowise?: {
    chatflowId: string;
    enabled: boolean;
  };

  // Execution settings
  timeout?: number;
  retries?: number;

  // Custom metadata
  metadata?: Record<string, any>;
}
```

##### `agentsapp_executions`
Agent execution history and logs.

```sql
CREATE TABLE agentsapp_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agentsapp_agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES agentsapp_users(id) ON DELETE CASCADE,
  input_data JSONB,
  output_data JSONB,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'success', 'failed', 'timeout')),
  duration_ms INTEGER,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_executions_agent_id ON agentsapp_executions(agent_id);
CREATE INDEX idx_executions_user_id ON agentsapp_executions(user_id);
CREATE INDEX idx_executions_status ON agentsapp_executions(status);
CREATE INDEX idx_executions_started_at ON agentsapp_executions(started_at DESC);
```

**RLS Policies:**
- Users can read executions for their own agents only
- Users can create executions for their own agents only

##### `agentsapp_templates`
Pre-built agent templates.

```sql
CREATE TABLE agentsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('chat', 'workflow', 'hybrid', 'utility')),
  config JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON agentsapp_templates(category);
CREATE INDEX idx_templates_tags ON agentsapp_templates USING GIN(tags);
```

**RLS Policies:**
- All users can read public templates
- No write access (templates managed via seed data)

### Storage Buckets

#### `agentsapp-uploads`
User-uploaded files (agent inputs, test data).

**Policies:**
- Users can upload to their own folder: `{user_id}/*`
- Users can read from their own folder only
- Max file size: 10MB

#### `agentsapp-agent-assets`
Agent-specific assets (icons, images, documents).

**Policies:**
- Users can upload to their agents' folders: `{user_id}/{agent_id}/*`
- Users can read their own agents' assets
- Max file size: 5MB

---

## Security Architecture

### Authentication Flow

```
User                    AI Agents Studio           Supabase Auth
  │                            │                         │
  ├─── Request Login ─────────►│                         │
  │                            ├── Send Magic Link ─────►│
  │                            │                         │
  │◄───── Email ───────────────┼─────────────────────────┤
  │                            │                         │
  ├─── Click Link ────────────►│                         │
  │                            ├── Verify Token ────────►│
  │                            │◄── JWT + Session ───────┤
  │◄── Set Cookie ─────────────┤                         │
  │                            │                         │
  ├─── API Request + JWT ─────►│                         │
  │                            ├── Validate JWT ────────►│
  │                            │◄── User Data ───────────┤
  │◄── Response ───────────────┤                         │
```

### Row Level Security (RLS)

All tables have RLS enabled with policies enforcing:

1. **User Isolation**
   - Users can only access their own data
   - Checked via `auth.uid() = user_id`

2. **Read Policies**
   - `agentsapp_users`: Own profile only
   - `agentsapp_agents`: Own agents only
   - `agentsapp_executions`: Own executions only
   - `agentsapp_templates`: All public templates

3. **Write Policies**
   - INSERT: Authenticated users for their own resources
   - UPDATE: Authenticated users for their own resources
   - DELETE: Authenticated users for their own resources

4. **Service Role Bypass**
   - API routes can use service role key for admin operations
   - Must validate user ownership in application code

### API Security

**Authentication:**
```typescript
// Middleware validates JWT on every API request
export async function authenticate(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;

  return user;
}
```

**Input Validation:**
```typescript
// All inputs validated with Zod
import { z } from 'zod';

const createAgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['chat', 'workflow', 'hybrid']),
  config: z.object({}).passthrough(),
});

// Validate before processing
const validatedData = createAgentSchema.parse(requestBody);
```

**Rate Limiting (Future):**
- 60 requests/minute per user for read operations
- 20 requests/minute per user for write operations
- 5 agent executions/minute per user

---

## Integration Architecture

### n8n Integration

**Flow:**
```
AI Agents Studio           n8n Workflow
       │                        │
       ├── Execute Agent ───────►
       │   (POST to webhook)    │
       │                        ├── Process
       │                        │
       │◄── Webhook Response ───┤
       │   (or callback)        │
```

**Implementation:**
```typescript
// lib/integrations/n8n.ts
export async function triggerN8nWorkflow(
  webhookUrl: string,
  data: any
): Promise<any> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('n8n webhook failed');
  }

  return response.json();
}
```

### Flowise Integration

**Flow:**
```
AI Agents Studio           Flowise API
       │                        │
       ├── Send Message ────────►
       │   (POST to chatflow)   │
       │                        ├── Process AI
       │                        │
       │◄── Stream Response ────┤
       │   (SSE or JSON)        │
```

**Implementation:**
```typescript
// lib/integrations/flowise.ts
export async function callFlowiseChatflow(
  chatflowId: string,
  message: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    `${FLOWISE_API_URL}/api/v1/prediction/${chatflowId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ question: message }),
    }
  );

  const data = await response.json();
  return data.text;
}
```

### Gotenberg Integration

**Use Cases:**
1. Export agent execution logs as PDF
2. Generate agent documentation
3. Create audit reports

**Implementation:**
```typescript
// lib/integrations/gotenberg.ts
export async function generatePDF(
  html: string,
  filename: string
): Promise<Blob> {
  const formData = new FormData();
  formData.append('files', new Blob([html], { type: 'text/html' }), 'index.html');

  const response = await fetch(
    `${GOTENBERG_API_URL}/forms/chromium/convert/html`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.blob();
}
```

---

## Deployment Architecture

### VPS Deployment (srv867044.hstgr.cloud)

```
Internet
   │
   │ HTTPS (443)
   ▼
┌─────────────────────┐
│  Traefik (Port 80,  │
│   443, 8080)        │
│  - SSL Termination  │
│  - Routing          │
│  - Auth Middleware  │
└──────────┬──────────┘
           │
           │ Docker Network: traefik
           │
    ┌──────┴──────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌──────────────────┐           ┌─────────────────────┐
│ AI Agents Studio │           │   Supabase Stack    │
│  (Next.js)       │◄──────────┤  (13 services)      │
│  Port: 3000      │ Internal  │  - PostgreSQL       │
│  Domain:         │ Network   │  - Kong (API GW)    │
│  agents.smart    │           │  - Auth (GoTrue)    │
│  camp.ai         │           │  - Storage          │
└──────────────────┘           │  - Realtime         │
                               │  - etc.             │
                               └─────────────────────┘
```

### Docker Configuration

**Dockerfile:**
```dockerfile
# Multi-stage build
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  ai-agents-studio:
    build: .
    restart: always
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - N8N_API_URL=${N8N_API_URL}
      - FLOWISE_API_URL=${FLOWISE_API_URL}
      - GOTENBERG_API_URL=${GOTENBERG_API_URL}
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - traefik
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.agents.rule=Host(`agents.smartcamp.ai`)"
      - "traefik.http.routers.agents.entrypoints=websecure"
      - "traefik.http.routers.agents.tls.certresolver=letsencrypt"
      - "traefik.http.services.agents.loadbalancer.server.port=3000"

networks:
  traefik:
    external: true
```

---

## Scalability & Performance

### Performance Targets

- **Page Load:** < 2s (first contentful paint)
- **Time to Interactive:** < 3s
- **API Response:** < 500ms (p95)
- **Agent Execution:** < 30s (timeout)
- **Real-time Updates:** < 1s latency

### Optimization Strategies

1. **Next.js Optimizations**
   - Server Components (reduce client JS)
   - Image optimization (next/image)
   - Font optimization (next/font)
   - Code splitting (automatic)
   - Static generation where possible

2. **Database Optimizations**
   - Indexes on frequently queried columns
   - Pagination for large result sets
   - JSONB indexes for config searches
   - Connection pooling (Supabase Pooler)

3. **Caching Strategy (Future)**
   - Redis for API response caching
   - CDN for static assets
   - Browser caching headers
   - Stale-while-revalidate patterns

4. **Bundle Size**
   - Tree shaking
   - Dynamic imports for heavy components
   - Minimize third-party dependencies
   - Target: < 300KB initial JS bundle

### Scalability Approach

**Vertical Scaling (Phase 1):**
- Increase VPS resources (RAM, CPU)
- Simple and cost-effective initially

**Horizontal Scaling (Phase 2):**
- Multiple Next.js instances behind Traefik
- Supabase connection pooling
- Read replicas for database
- CDN for static assets

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4+
- **UI Components:** Custom + Radix UI primitives
- **State Management:** React Context + Zustand
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Charts:** Recharts (for analytics)

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL 15.8+ (via Supabase)
- **ORM:** Supabase JS Client (no ORM needed)
- **Validation:** Zod
- **Authentication:** Supabase Auth

### Infrastructure
- **Hosting:** VPS (Ubuntu 22.04)
- **Reverse Proxy:** Traefik 2.10
- **Containerization:** Docker + Docker Compose
- **SSL:** Let's Encrypt (via Traefik)
- **Domain:** agents.smartcamp.ai

### Integrations
- **Automation:** n8n (https://n8n.smartcamp.ai)
- **AI Chatflows:** Flowise (https://flowise.smartcamp.ai)
- **PDF Generation:** Gotenberg (https://gotenberg.smartcamp.ai)
- **Backend Services:** Supabase (https://api.supabase.smartcamp.ai)

### Development Tools
- **Version Control:** Git
- **Package Manager:** npm
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript compiler

### Future Additions
- **Testing:** Vitest + Playwright
- **Monitoring:** Sentry (error tracking)
- **Analytics:** PostHog (product analytics)
- **CI/CD:** GitHub Actions
- **Caching:** Upstash Redis

---

## Diagram: Request Flow

```
User Browser
    │
    │ 1. HTTPS Request (agents.smartcamp.ai/agents)
    ▼
Traefik Reverse Proxy
    │
    │ 2. Route to Next.js container
    ▼
Next.js Server
    │
    ├─── 3a. SSR Page ─────┐
    │                       │
    │                       ▼
    │              React Server Component
    │                       │
    │                       │ 4. Fetch data
    │                       ▼
    │              Supabase Client (server)
    │                       │
    │                       │ 5. Query DB
    │                       ▼
    │              PostgreSQL + RLS
    │                       │
    │                       │ 6. Return data
    │                       ▼
    │              React Server Component
    │                       │
    │                       │ 7. Render HTML
    │                       ▼
    │◄────── 8. Return HTML ┘
    │
    │ 9. Send to browser
    ▼
User Browser
    │
    │ 10. Hydrate + Client Components
    ▼
Interactive UI
```

---

## Conclusion

This architecture provides:
- ✅ Simple, maintainable structure
- ✅ Strong security with RLS and JWT
- ✅ Scalable foundation (vertical → horizontal)
- ✅ Clear integration patterns
- ✅ Performance-optimized stack
- ✅ Aligned with SmartCampAI infrastructure

The design prioritizes **speed to market** while maintaining **quality and security**. It can scale from MVP to production-grade application with incremental enhancements.

**Next Steps:**
1. Initialize Next.js project
2. Implement Supabase schema
3. Build core UI components
4. Develop authentication flow
5. Create agent management features

---

**Document Version:** 1.0
**Last Updated:** 2025-11-17
**Next Review:** After MVP deployment
