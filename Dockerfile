FROM node:18-alpine

WORKDIR /app

RUN npm install pnpm -g

COPY apps/api/package.json pnpm-lock.yaml ./
COPY apps/api ./

RUN pnpm install -r
RUN pnpm prisma generate

EXPOSE 5555
EXPOSE 8000

CMD ["pnpm", "dev"]