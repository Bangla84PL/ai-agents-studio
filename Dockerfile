# AI Agents Studio - Dockerfile
# Multi-stage build for optimized production image

# ============================================================================
# Stage 1: Dependencies
# ============================================================================
FROM node:18-alpine AS deps

WORKDIR /app

# Install dependencies based on package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# ============================================================================
# Stage 2: Builder
# ============================================================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN npm run build

# ============================================================================
# Stage 3: Runner
# ============================================================================
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
