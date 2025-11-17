# Developer Onboarding Guide

Welcome to the AI Agents Studio development team! This guide will help you get up and running quickly.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** >= 2.30
- **Docker** (optional, for local Supabase)
- **Code Editor** (VS Code recommended)

---

## Day 1: Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ai-agents-studio.git
cd ai-agents-studio
```

### 2. Install Dependencies

```bash
npm install
```

This will install ~770 packages. Takes about 2-3 minutes.

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Integration URLs (Optional for local dev)
NEXT_PUBLIC_N8N_URL=https://n8n.smartcamp.ai
NEXT_PUBLIC_FLOWISE_URL=https://flowise.smartcamp.ai
NEXT_PUBLIC_GOTENBERG_URL=https://gotenberg.smartcamp.ai
```

**Getting Supabase Credentials:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the `Project URL` and `anon public` key
4. Copy the `service_role` key (keep this secret!)

### 4. Run Database Migrations

Apply the database schema to your Supabase instance:

```bash
# Option 1: Using Supabase CLI (recommended)
supabase db push

# Option 2: Manually via Supabase Dashboard
# Copy contents of supabase/migrations/001_initial_schema.sql
# Paste into SQL Editor in Supabase Dashboard
# Run the query
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** - you should see the landing page!

### 6. Create Your First Account

1. Click "Get Started"
2. Enter your email
3. Check your inbox for the magic link
4. Click the link to sign in
5. You're in the dashboard!

---

## Day 2: Project Structure

### Understanding the Codebase

```
ai-agents-studio/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── agents/           # Agent-specific components
│   ├── executions/       # Execution components
│   ├── layout/           # Layout components (Navbar, Sidebar)
│   ├── settings/         # Settings components
│   ├── templates/        # Template components
│   └── ui/               # Reusable UI primitives
├── lib/                   # Utility libraries
│   ├── integrations/     # n8n, Flowise, Gotenberg clients
│   ├── supabase/         # Supabase client utilities
│   ├── validators/       # Zod validation schemas
│   ├── api-response.ts   # Standardized API responses
│   ├── constants.ts      # Application constants
│   ├── env.ts            # Environment validation
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── supabase/
│   └── migrations/       # Database migrations
├── public/               # Static assets (branding)
├── docs/                 # Documentation
└── tests/                # Test files
```

### Key Concepts

#### 1. **Namespace Strategy**
All database objects use the `agentsapp_` prefix to avoid conflicts in the shared Supabase instance.

```typescript
// ✅ Good
const { data } = await supabase.from('agentsapp_agents').select()

// ❌ Bad
const { data } = await supabase.from('agents').select()
```

#### 2. **Server vs. Client Components**
- **Server Components**: Fetch data, access DB, default in App Router
- **Client Components**: Interactive, use hooks, marked with `'use client'`

```typescript
// Server Component (default)
export default async function AgentsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('agentsapp_agents').select()
  return <div>...</div>
}

// Client Component
'use client'
export function AgentEditor() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

#### 3. **API Route Pattern**
All API routes follow this structure:

```typescript
export async function GET(request: Request) {
  try {
    // 1. Authenticate
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return apiErrors.unauthorized()

    // 2. Validate input
    const validation = schema.safeParse(input)
    if (!validation.success) return apiErrors.validationError(validation.error)

    // 3. Database operation
    const { data, error } = await supabase.from('table').select()
    if (error) return apiErrors.databaseError(error)

    // 4. Return response
    return successResponse(data)
  } catch (error) {
    return apiErrors.internalError()
  }
}
```

#### 4. **SmartCampAI Branding**
All UI uses the "Jungle Tech" design system:
- **Colors**: White text (`#ffffff`), Emerald accents (`#10b981`), Forest green (`#1f4d2f`)
- **Fonts**: Jost from Google Fonts
- **Effects**: Glass morphism (`glass-card` class), jungle background
- **Components**: All use SmartCampAI styling

```tsx
// Correct branding usage
<div className="glass-card p-6">
  <h1 className="text-white">Title</h1>
  <Button variant="emerald">Action</Button>
</div>
```

---

## Day 3: Making Your First Contribution

### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow existing code patterns
   - Use TypeScript strictly
   - Add tests for new features
   - Follow the style guide

3. **Run Tests**
   ```bash
   npm test                # Run all tests
   npm run test:coverage   # Check coverage
   ```

4. **Lint and Format**
   ```bash
   npm run lint           # Check linting
   npm run format         # Auto-format code
   npm run type-check     # Check TypeScript
   ```

5. **Build and Verify**
   ```bash
   npm run build          # Production build
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   **Commit Message Format:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Formatting, missing semicolons, etc.
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

7. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub.

---

## Common Development Tasks

### Adding a New API Endpoint

1. Create the route file in `app/api/`
2. Import standardized utilities:
   ```typescript
   import { apiErrors, successResponse } from '@/lib/api-response'
   import { createClient } from '@/lib/supabase/server'
   ```

3. Implement the handler:
   ```typescript
   export async function GET(request: Request) {
     const supabase = await createClient()

     // Auth check
     const { data: { user } } = await supabase.auth.getUser()
     if (!user) return apiErrors.unauthorized()

     // Your logic here
     const { data } = await supabase.from('table').select()

     return successResponse(data)
   }
   ```

4. Add tests in `__tests__/route.test.ts`

### Adding a New UI Component

1. Create the component in `components/`
2. Use TypeScript for props:
   ```typescript
   interface MyComponentProps {
     title: string
     onAction: () => void
   }

   export function MyComponent({ title, onAction }: MyComponentProps) {
     return <div>...</div>
   }
   ```

3. Apply SmartCampAI styling
4. Add tests in `__tests__/MyComponent.test.tsx`
5. Export from index if needed

### Adding a Database Migration

1. Create a new file in `supabase/migrations/`
   ```
   002_add_new_feature.sql
   ```

2. Write your SQL (use `agentsapp_` prefix!)
   ```sql
   CREATE TABLE agentsapp_new_table (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     -- ...
   );

   -- Add RLS policies
   ALTER TABLE agentsapp_new_table ENABLE ROW LEVEL SECURITY;
   ```

3. Apply locally and test
4. Document in migration file

### Working with Integrations

**n8n Example:**
```typescript
import { triggerN8nWorkflow } from '@/lib/integrations/n8n'

const result = await triggerN8nWorkflow(
  { webhookUrl: 'https://n8n.smartcamp.ai/webhook/abc' },
  { data: 'payload' }
)
```

**Flowise Example:**
```typescript
import { sendFlowiseMessage } from '@/lib/integrations/flowise'

const response = await sendFlowiseMessage(
  { chatflowId: 'chatflow-123' },
  { question: 'Hello!' }
)
```

**Gotenberg Example:**
```typescript
import { htmlToPdf } from '@/lib/integrations/gotenberg'

const pdfBlob = await htmlToPdf('<h1>Hello PDF</h1>')
```

---

## Debugging Tips

### Common Issues

#### 1. "Unauthorized" Error
- Check `.env.local` has correct Supabase keys
- Verify you're signed in (check cookies in DevTools)
- Confirm RLS policies allow the operation

#### 2. Database Query Fails
- Check table name has `agentsapp_` prefix
- Verify RLS policy allows access
- Check Supabase logs for actual error

#### 3. Build Fails
- Run `npm run type-check` to see TypeScript errors
- Check for import/export issues
- Verify all dependencies are installed

#### 4. Tests Fail
- Make sure mocks are set up correctly
- Check jest.setup.js for environment
- Verify test data is valid

### Useful Commands

```bash
# See all available scripts
npm run

# Clear Next.js cache
rm -rf .next

# Reset node_modules
rm -rf node_modules package-lock.json
npm install

# Check for outdated dependencies
npm outdated

# Security audit
npm audit
```

---

## Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Internal Docs
- **ARCHITECTURE.md** - System architecture
- **API.md** - API documentation
- **BRANDING_IMPLEMENTATION.md** - Design system
- **DIAGRAMS.md** - Visual architecture
- **DECISIONS.md** - Design decisions

### Tools
- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Getting Help
- Check existing documentation first
- Ask in team chat
- Review similar code in the codebase
- Check GitHub issues

---

## Next Steps

Now that you're set up:

1. **Read ARCHITECTURE.md** - Understand the system design
2. **Browse the codebase** - Familiarize yourself with patterns
3. **Pick a "good first issue"** - Start contributing!
4. **Pair with a senior dev** - Shadow and learn
5. **Review PRs** - Learn from others' code

Welcome to the team! 🚀

---

_Last updated: 2025-11-17_
