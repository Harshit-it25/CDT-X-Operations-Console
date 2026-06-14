# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

# Hugging Face Spaces runs as user 1000 for security compliance
RUN chown -R 1000:1000 /app
USER 1000

ENV PORT=7860
ENV NODE_ENV=production
EXPOSE 7860

CMD ["node", "dist/server.cjs"]
