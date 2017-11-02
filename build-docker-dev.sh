#!/bin/bash

cat .env.common > .env
cat .env.dev >> .env
docker-compose -f common.yml -f docker-compose-dev.yml build
