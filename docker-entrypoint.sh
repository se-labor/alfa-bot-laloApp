#!/usr/bin/env sh
set -e

# export APP_VERSION=$(cat version)
# export APP_VERSION_TS=$(cat version_ts)

if [ -z "${BOT_CONFIG}" ]
then
  export BOT_CONFIG="[]"
fi

envsubst < /usr/share/nginx/html/assets/env.template.jstmp > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'
