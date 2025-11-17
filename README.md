# AI Agents Studio

**Build, Deploy & Manage AI Agents with Ease**

AI Agents Studio is a comprehensive platform for creating, managing, deploying, and monitoring AI agents. Visual builder, pre-built templates, and seamless integrations with n8n and Flowise.

![AI Agents Studio](./public/og-image.png)

---

## Features

- **Visual Agent Builder** - Drag-and-drop interface with code editor
- **Pre-built Templates** - Ready-made agents for common use cases
- **Powerful Integrations** - Connect with n8n workflows, Flowise chatflows, Gotenberg PDF
- **Real-time Monitoring** - Live execution logs, metrics, and analytics
- **Secure & Scalable** - Multi-tenant architecture with Row Level Security
- **API-First** - Full REST API for programmatic access

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **UI:** Custom components following SmartCampAI branding
- **State:** React Context + Zustand
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Docker + Traefik on VPS

---

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase instance (local or hosted)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bangla84PL/ai-agents-studio.git
   cd ai-agents-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials.

4. **Set up database:**

   Apply the schema migration to your Supabase instance:
   ```bash
   # Using Supabase CLI
   supabase db push

   # Or manually execute: supabase/migrations/001_initial_schema.sql
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Open browser:**
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
ai-agents-studio/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Authenticated pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   ├── agents/              # Agent components
│   └── templates/           # Template components
├── lib/                     # Utilities
│   ├── supabase/            # Supabase clients
│   ├── api/                 # API utilities
│   ├── integrations/        # n8n, Flowise, Gotenberg
│   ├── utils.ts             # General utilities
│   └── types.ts             # TypeScript types
├── public/                  # Static assets
├── supabase/               # Database migrations
│   └── migrations/
├── docs/                    # Documentation
│   └── ARCHITECTURE.md
├── branding/               # SmartCampAI branding
├── .env.example            # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── Dockerfile
├── docker-compose.yml
├── README.md               # This file
├── CLAUDE_MANIFEST.md      # Project manifest
├── PROGRESS.md             # Change log
├── DECISIONS.md            # Architectural decisions
├── API.md                  # API documentation
├── DEPLOYMENT.md           # Deployment guide
└── BRANDING_IMPLEMENTATION.md  # Branding docs
```

---

## Environment Variables

See `.env.example` for all required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-only)
- `N8N_API_URL` - n8n API endpoint
- `FLOWISE_API_URL` - Flowise API endpoint
- `GOTENBERG_API_URL` - Gotenberg API endpoint

---

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier

### Code Quality

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for styling

---

## Deployment

### Docker Deployment (Recommended)

1. **Build Docker image:**
   ```bash
   docker build -t ai-agents-studio .
   ```

2. **Run with docker-compose:**
   ```bash
   docker-compose up -d
   ```

3. **Configure Traefik** (see `DEPLOYMENT.md` for details)

### VPS Deployment (srv867044.hstgr.cloud)

The application is designed to deploy on SmartCampAI VPS:

- **Domain:** https://agents.smartcamp.ai
- **SSL:** Automatic via Traefik + Let's Encrypt
- **Networking:** Docker network `traefik`

See `DEPLOYMENT.md` for complete deployment instructions.

---

## Documentation

- **[Architecture](./docs/ARCHITECTURE.md)** - System architecture and design
- **[API Reference](./API.md)** - API endpoints and usage
- **[Deployment Guide](./DEPLOYMENT.md)** - Deployment instructions
- **[Branding Guide](./BRANDING_IMPLEMENTATION.md)** - Branding implementation
- **[Decisions Log](./DECISIONS.md)** - Architectural decisions
- **[Progress Log](./PROGRESS.md)** - Development progress
- **[Manifest](./CLAUDE_MANIFEST.md)** - Project orientation

---

## Branding

AI Agents Studio follows the **SmartCampAI branding guide** (Jungle Tech aesthetic):

- **Design System:** Glass morphism over jungle background
- **Colors:** White text, emerald accents (#10b981), forest green buttons (#1f4d2f)
- **Typography:** Jost font family
- **Effects:** Fixed jungle background with parallax, glass morphism cards

See `BRANDING_IMPLEMENTATION.md` and `branding/SmartCampAI_branding.md` for complete details.

---

## Contributing

This is a SmartCamp.AI project. For contributions or issues:

1. Check existing issues
2. Create a detailed issue or pull request
3. Follow the code style and branding guidelines

---

## License

Copyright © 2025 SmartCamp.AI. All rights reserved.

---

## Links

- **SmartCamp.AI:** https://smartcamp.ai
- **n8n Creator Profile:** https://n8n.io/creators/smart-camp-ai/
- **Email:** hello@smartcamp.ai
- **Phone:** +48 518 894 156

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Integrations: [n8n](https://n8n.io/), [Flowise](https://flowiseai.com/), [Gotenberg](https://gotenberg.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**© Created with ❤️ by [SmartCamp.AI](https://smartcamp.ai)**

*AI | Automations | Web Dev*
