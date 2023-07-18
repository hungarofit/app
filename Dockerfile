FROM node:18-alpine AS base

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build-only

FROM m3ng9i/ran:latest

WORKDIR /web

COPY --from=base /app/dist /web

EXPOSE 8080

ENTRYPOINT [ "/ran", "-p=8080", "-r=/web" ]
