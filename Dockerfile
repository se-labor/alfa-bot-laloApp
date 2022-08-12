FROM nginx:1.20.2-alpine

# Locale support de_DE and timezone CET
ENV TZ Europe/Berlin
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 755 docker-entrypoint.sh && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Europe/Berlin /etc/localtime && \
    echo "Europe/Berlin" > /etc/timezone
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/alfabot /usr/share/nginx/html

CMD ["/docker-entrypoint.sh"]
