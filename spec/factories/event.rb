FactoryGirl.define do
  start = Faker::Time.between(Time.now, 1.day.since)
  event_length = 3600 + rand(7200)
  factory :event do
    name { Faker::Lorem.words(2).join(" ") }
    description { Faker::Lorem.paragraphs(2).join(" ") }
    start_time { start }
    end_time { start + event_length }
  end
end
