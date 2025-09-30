# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npm run dev"]

# Build Next.js & generate Prisma client
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production runner
FROM node:18-alpine AS runner
ENV NODE_ENV=production

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
WORKDIR /app
USER nextjs

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Run migrations + start server at container runtime
CMD ["sh", "-c", "npx prisma migrate deploy && node .next/standalone/server.js"]