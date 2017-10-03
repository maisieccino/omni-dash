#!/bin/bash

cat .env.prod > .env.prod.final
cat .env >> .env.prod.final
docker-compose -f common.yml -f docker-compose-prod.yml build
