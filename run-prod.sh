#!/bin/sh
export RAILS_DB_NAME=$RAILS_DB_NAME
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
export SECRET_KEY_BASE=$SECRET_KEY_BASE
test $POSTGRES_PASSWORD

bundle exec rake db:migrate
dbexists=$?


if [ $dbexists -ne 0 ]; then
  set -e
  echo
  echo "== Failed to migrate. Running setup first."
  echo
  bundle exec rake db:setup && \
  bundle exec rake db:migrate
  bundle exec rake db:seed
fi
set -e
bundle exec rails s -p 3000 -b '0.0.0.0'
