# Hatch Site
[![Build Status](https://travis-ci.org/hatchucl/hatch-site.svg?branch=master)](https://travis-ci.org/hatchucl/hatch-site)
[![Code Climate](https://codeclimate.com/github/hatchucl/hatch-site/badges/gpa.svg)](https://codeclimate.com/github/hatchucl/hatch-site)

The one-stop shop for all information, news, and courses for the upcoming Hatch hackathon.

# Getting up and running

## Prerequisites

* Ruby 2.3 or later (Matt is developing using 2.4.1)
* Yarn or NPM (yarn is recommended)
* PostgreSQL server, either local or otherwise (MacOS users use https://postgresapp.com/)
* Redis server (required from 3b90062 onwards)

Some gems you'll need beforehand:
* `foreman` (for running webpack + rails + livereload)
* `bundler` (for grabbing project dependencies)
* `guard` (for running livereload)

## Install gems and javascript dependencies
**NOTE**

If you're using MacOS with Postgres.app, you need to configure bundler like so:

```bash
$ bundle config build.pg --with-pg-config=/Applications/Postgres.app/Contents/Versions/latest/bin/pg_config
```

Get Rails + dependencies (you can run `bundle install` instead, but this keeps
your local files nice and tidy):

```bash
$ bundle install --path=vendor/bundle
```

Install node dependencies. Use the `--pure-lockfile` option to ensure
dependencies are exactly the same as the ones found in yarn.lock (recommended):

```bash
$ yarn --pure-lockfile
```

# Setup the database

Copy the `.env.example` file to `.env` and edit with your favourite editor:

```bash
$ cp .env{.example,}
$ nano .env

RAILS_DB_HOST=localhost
RAILS_DB_PORT=5432
RAILS_DB_USER=postgres
RAILS_DB_PASS=
RAILS_ADMIN_USER_EMAIL=admin@example.com
RAILS_ADMIN_USER_FIRSTNAME=Admin
RAILS_ADMIN_USER_LASTNAME=User
RAILS_ADMIN_USER_PASS=password
```

* `RAILS_DB_HOST` - Leave as `localhost` if you're running locally.
* `RAILS_DB_PORT` - Leave this unchanged unless you changed the port.
* `RAILS_DB_USER` - Username for the database. It's normally `postgres`.
* `RAILS_DB_PASS` - Password for the database user, if it exists.
* `RAILS_ADMIN_USER_EMAIL` - Email address for admin account
* `RAILS_ADMIN_USER_FIRSTNAME` - First name of the admin account
* `RAILS_ADMIN_USER_LASTNAME` - Last name of the admin account
* `RAILS_ADMIN_USER_PASS` - Password of the admin account
* `RAILS_MAILER_FROM` - "From" address for emails. Ignore for dev environment

We recommend leaving the `RAILS_ADMIN_USER` settings as the default values when
developing. Never set the real password in your env file. You'll see why
shortly.

Create the development and test databases, and migrate the tables.

```bash
$ bundle exec rake db:create
$ bundle exec rake db:migrate
```

Create the admin user, using the real password instead of `<password>` here.

```bash
$ RAILS_ADMIN_USER_PASS=<password> bundle exec rake db:seed
```

# Run in development mode

Start the fans!

```bash
$ foreman start -f Procfile.dev
```

Now visit `http://localhost:3000` to see the app!

# Email tester
Install the `mailcatcher` gem as described on the [project website](https://mailcatcher.me/)

Then run the gem to start the mailserver and open the web interface to intercept
app emails.

# Testing

Rails tests are run with `rspec`:

```bash
$ bundle exec rspec
```

React app testing doesn't yet exist, but will almost certainly use `jest` like
so:

```bash
$ yarn run test
```
