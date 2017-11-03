#!/bin/bash

cat .env.common > .env
cat .env.prod >> .env

if [ "$2" == "--deploy" ]; then
  docker-compose -f common.yml -f docker-compose-prod.yml up -d --build
else
  docker-compose -f common.yml -f docker-compose-prod.yml build
fi
