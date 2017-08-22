bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed

#bundle exec rails s -p 3000 -b '0.0.0.0'

# I really don't want to have foreman for prod, but
# for now adding it. We will optimize for prod in
# a second time
gem install foreman
gem install guard
yarn add webpack --dev

foreman start -f Procfile.dev
