FROM node:20-slim AS base

RUN corepack enable

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

FROM base AS build
RUN pnpm build

FROM base AS production
COPY --from=build /app /app
EXPOSE 80
WORKDIR /app/apps
CMD ["pnpm", "--filter", "backend", "start:prod"]
