FROM node:20-alpine AS builder
WORKDIR /app

ARG PERPLEXITY_API_KEY
ARG YOUTUBE_API_KEY

ENV PERPLEXITY_API_KEY=$PERPLEXITY_API_KEY
ENV YOUTUBE_API_KEY=$YOUTUBE_API_KEY

COPY package.json package-lock.json ./
RUN npm install

COPY . .

#dummy DB URL so no real secret needed
RUN DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" \
    PRISMA_GENERATE_SKIP_SCHEMA_ENV_VALIDATION=1 \
    npx prisma generate

RUN npm run build



FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib/generated/prisma ./lib/generated/prisma
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
