#!/bin/bash

cat .env.prod > .env.final
cat .env >> .env.final
docker-compose -f common.yml -f docker-compose-prod.yml build
