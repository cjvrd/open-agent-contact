# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false

FROM deps AS build
WORKDIR /app
COPY . .

# Prisma generate (for prisma-kysely types)
ENV DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
RUN npx prisma generate

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
