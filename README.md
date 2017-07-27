# Hatch Site
The one-stop shop for the Hatch hackathon.

# Getting up and running

## Prerequisites

* Ruby 2.3 or later (Matt is developing using 2.4.1)
* Yarn or NPM (yarn is recommended)
* PostgreSQL server, either local or otherwise

Some gems you'll need beforehand:
* `foreman` (for running webpack + rails + livereload)
* `bundler` (for grabbing project dependencies)

## Install gems and javascript dependencies
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
```

* `RAILS_DB_HOST` - Leave as `localhost` if you're running locally.
* `RAILS_DB_PORT` - Leave this unchanged unless you changed the port.
* `RAILS_DB_USER` - Username for the database. It's normally `postgres`.
* `RAILS_DB_PASS` - Password for the database user, if it exists.

Create the development and test databases, and migrate the tables.

```bash
$ bundle exec rake db:create
$ bundle exec rake db:migrate
```

# Run in development mode

Start the fans!

```bash
$ foreman start -f Procfile.dev
```

Now visit `http://localhost:3000` to see the app!

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
