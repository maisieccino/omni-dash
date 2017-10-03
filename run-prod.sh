#!/bin/sh -e
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
test $POSTGRES_PASSWORD
docker-compose -f common.yml -f docker-compose-prod.yml run web $@
