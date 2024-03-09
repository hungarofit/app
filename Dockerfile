FROM node:18-alpine AS base
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build-only

FROM debian:10-slim AS wasm
WORKDIR /wasm
COPY ./wasm/evaluator/. ./
RUN apt update \
&& apt -y install wget \
&& wget https://go.dev/dl/go1.21.3.linux-amd64.tar.gz \
&& rm -rf /usr/local/go \
&& tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz \
&& export PATH=$PATH:/usr/local/go/bin \
&& wget https://github.com/tinygo-org/tinygo/releases/download/v0.31.1/tinygo_0.31.1_amd64.deb \
&& dpkg -i tinygo_0.31.1_amd64.deb \
&& rm -f tinygo_0.31.1_amd64.deb \
&& tinygo build -target wasm -no-debug -o evaluator.wasm

FROM m3ng9i/ran:latest
WORKDIR /web
COPY --from=base /app/dist /web
COPY --from=wasm /wasm/evaluator.wasm /web/wasm/evaluator.wasm
EXPOSE 8080
ENTRYPOINT [ "/ran", "-p=8080", "-r=/web" ]
