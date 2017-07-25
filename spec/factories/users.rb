FactoryGirl.define do
  factory :user do
    name { Faker::StarWars.character }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end
