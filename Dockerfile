# builder
FROM node:18.17.0-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-web

# web service
FROM nginx:1.25.1-alpine

ARG BASE_PATH="alfabotclient"
ENV BASE_PATH=$BASE_PATH

# Locale support de_DE and timezone CET
ENV TZ Europe/Berlin
RUN chmod 755 docker-entrypoint.sh && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Europe/Berlin /etc/localtime && \
    echo "Europe/Berlin" > /etc/timezone

COPY --from=builder /usr/src/app/dist/alfabot /usr/share/nginx/html/$BASE_PATH
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["/docker-entrypoint.sh"]
