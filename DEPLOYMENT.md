# AI Agents Studio - Deployment Guide

**Target:** VPS (srv867044.hstgr.cloud) via Docker + Traefik
**Domain:** agents.smartcamp.ai
**Last Updated:** 2025-11-17

---

## Prerequisites

- VPS with Docker and Docker Compose installed
- Traefik reverse proxy configured (already set up on SmartCampAI VPS)
- Supabase instance (already running on VPS)
- Domain DNS pointing to VPS IP

---

## Deployment Steps

### 1. Clone Repository

```bash
ssh root@srv867044.hstgr.cloud
cd /root
git clone https://github.com/Bangla84PL/ai-agents-studio.git
cd ai-agents-studio
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env
```

Set all required environment variables:
- Supabase credentials
- n8n, Flowise, Gotenberg URLs and keys
- Application URL

### 3. Set Up Database

Apply schema migration to Supabase:

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Manual execution
# Copy contents of supabase/migrations/001_initial_schema.sql
# Execute in Supabase Studio SQL Editor
```

### 4. Build and Deploy

```bash
# Build Docker image
docker build -t ai-agents-studio .

# Start with docker-compose
docker-compose up -d

# Verify container is running
docker ps | grep ai-agents-studio
```

### 5. Verify Deployment

```bash
# Check container logs
docker logs ai-agents-studio

# Check Traefik dashboard
# https://traefik.smartcamp.ai

# Test application
curl https://agents.smartcamp.ai
```

### 6. Monitor

```bash
# View logs
docker logs -f ai-agents-studio

# Check resource usage
docker stats ai-agents-studio
```

---

## Traefik Configuration

The `docker-compose.yml` includes Traefik labels:

- **Router:** `agents.smartcamp.ai`
- **Entry Point:** `websecure` (HTTPS)
- **TLS:** Let's Encrypt automatic certificates
- **Network:** `traefik` (external)

No additional Traefik configuration needed.

---

## Environment Variables (Production)

Create `/root/ai-agents-studio/.env`:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://agents.smartcamp.ai

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://api.supabase.smartcamp.ai
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Integrations
N8N_API_URL=https://n8n.smartcamp.ai
N8N_API_KEY=your_n8n_api_key
FLOWISE_API_URL=https://flowise.smartcamp.ai
FLOWISE_API_KEY=your_flowise_api_key
GOTENBERG_API_URL=https://gotenberg.smartcamp.ai
```

---

## Updating the Application

```bash
cd /root/ai-agents-studio

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker build -t ai-agents-studio .
docker-compose up -d
```

---

## Backup and Restore

### Database Backup

Supabase database is backed up automatically (see VPS_CONFIGURATION_GUIDE.md).

For manual backup:
```bash
# Export schema and data
supabase db dump > backup.sql
```

### Application Backup

```bash
# Backup configuration
tar -czf ai-agents-studio-backup.tar.gz /root/ai-agents-studio/.env
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs ai-agents-studio

# Check environment variables
docker exec ai-agents-studio env | grep SUPABASE
```

### Cannot Connect to Supabase

- Verify `NEXT_PUBLIC_SUPABASE_URL` in .env
- Check Supabase container is running: `docker ps | grep supabase`
- Test Supabase API: `curl https://api.supabase.smartcamp.ai`

### SSL Certificate Issues

- Check Traefik logs: `docker logs root-traefik-1`
- Verify DNS is pointing to VPS
- Ensure domain is in Traefik router rule

---

## Monitoring

### Health Check

```bash
# Application health
curl https://agents.smartcamp.ai/api/health

# Container health
docker inspect ai-agents-studio | grep -A 5 Health
```

### Resource Usage

```bash
# Real-time stats
docker stats ai-agents-studio

# Disk usage
du -sh /var/lib/docker/volumes/
```

---

## Security

- All secrets stored in `.env` (gitignored)
- Application runs as non-root user (nextjs)
- Traefik handles SSL/TLS
- Supabase RLS enforces multi-tenant isolation
- Regular security updates: `docker pull node:18-alpine`

---

**For VPS infrastructure details, see:** `VPS_CONFIGURATION_GUIDE.md`
