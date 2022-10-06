#!/usr/bin/env bash
set -e

./build-images.sh

docker push nexus.beemo.eu:5555/alfabot/angular/client
