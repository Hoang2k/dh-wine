FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
# Giá trị NEXT_PUBLIC_* được "nướng" vào bundle lúc build → truyền qua build args
ARG NEXT_PUBLIC_API_URL=/api
ARG NEXT_PUBLIC_API_URL_SSR=http://be:4000
ARG NEXT_PUBLIC_FILE_URL=/uploads
ARG NEXT_PUBLIC_SITE_URL=
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS=
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_URL_SSR=$NEXT_PUBLIC_API_URL_SSR \
    NEXT_PUBLIC_FILE_URL=$NEXT_PUBLIC_FILE_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GOOGLE_ANALYTICS=$NEXT_PUBLIC_GOOGLE_ANALYTICS
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Backend nội bộ cho SSR (trình duyệt dùng NEXT_PUBLIC_API_URL qua nginx)
ENV NEXT_PUBLIC_API_URL_SSR=http://be:4000
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nextjs /app/build ./build
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nextjs /app/next.config.ts ./next.config.ts
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
