# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
  first_name: ENV["RAILS_ADMIN_USER_FIRSTNAME"] || "Admin",
  last_name: ENV["RAILS_ADMIN_USER_LASTNAME"] || "User",
  email: ENV["RAILS_ADMIN_USER_EMAIL"] || "test@example.com",
  password: ENV["RAILS_ADMIN_USER_PASS"] || "password",
  password_confirmation: ENV["RAILS_ADMIN_USER_PASS"] || "password",
  admin: true
)
