FROM node:18-alpine AS base

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build-only

FROM node:18-alpine

WORKDIR /app

COPY --from=base /app/dist ./dist

RUN yarn global add http-server --prefix=/app

EXPOSE 8080

CMD [ "bin/http-server", "dist" ]
