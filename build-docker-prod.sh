#!/bin/bash

echo .env >> .env.prod
docker-compose -f common.yml -f docker-compose-prod.yml build
