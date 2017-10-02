# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170928173457) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "competitions", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "capacity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "deleted_at"
    t.float "latitude"
    t.float "longitude"
    t.string "location"
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "competition_id"
    t.index ["competition_id"], name: "index_events_on_competition_id"
  end

  create_table "invite_codes", force: :cascade do |t|
    t.string "code"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "competition_id"
    t.bigint "user_id"
    t.index ["code"], name: "index_invite_codes_on_code"
    t.index ["competition_id"], name: "index_invite_codes_on_competition_id"
    t.index ["email"], name: "index_invite_codes_on_email", unique: true
    t.index ["user_id"], name: "index_invite_codes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "last_name"
    t.text "bio"
    t.string "phone_number"
    t.text "dietary_info"
    t.integer "coding_experience"
    t.string "contact_twitter"
    t.string "contact_facebook"
    t.string "contact_website"
    t.string "contact_linkedin"
    t.string "contact_devpost"
    t.string "contact_github"
    t.boolean "admin", default: false
    t.boolean "mentor", default: false
    t.datetime "deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "events", "competitions"
  add_foreign_key "invite_codes", "competitions"
  add_foreign_key "invite_codes", "users"
end
