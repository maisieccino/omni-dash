#!/bin/bash

cat .env.common > .env
cat .env.prod >> .env
docker-compose -f common.yml -f docker-compose-prod.yml build
