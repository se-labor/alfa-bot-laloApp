#!/usr/bin/env sh
set -e

# export APP_VERSION=$(cat version)
# export APP_VERSION_TS=$(cat version_ts)

if [ -n "${BOT_CONFIG}" ]
then
  cd "/usr/share/nginx/html/$BASE_PATH"
  envsubst < assets/env.template.jstmp > assets/env.js
fi

exec nginx -g 'daemon off;'
