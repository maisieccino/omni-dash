#!/bin/sh -e
export RAILS_DB_NAME=$RAILS_DB_NAME
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
test $POSTGRES_PASSWORD
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
gem install foreman
gem install guard

foreman start -f Procfile.dev
