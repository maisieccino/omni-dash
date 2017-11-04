#!/bin/bash

echo "Building env..."
cat .env.common > .env
cat .env.dev >> .env
echo "APP_VERSION=$(git describe --abbrev=0 --tags)" >> .env
echo "APP_REVISION=$(git log -1 --date=short --format="%ad-%h"|sed 's/-/./g')" >> .env

if [ "$1" == "--env-only" ]; then
  exit 0
fi

docker-compose -f common.yml -f docker-compose-dev.yml build
