#!/bin/sh -e
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
test $POSTGRES_PASSWORD
./run-prod.sh bundle exec rake db:create
./run-prod.sh bundle exec rake db:migrate
./run-prod.sh bundle exec rake db:seed
