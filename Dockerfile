FROM node:18-alpine AS build

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:18-alpine AS runtime

WORKDIR /app
COPY package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000