FactoryBot.define do
  factory :notification do
    title { Faker::Lorem.sentence }
    notification_type { "Event" }
    message { Faker::Lorem.paragraph }
  end
end
