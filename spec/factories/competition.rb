FactoryBot.define do
  factory :competition do
    name { "Hack #{Faker::Address.city}" }
    description { Faker::Lorem.paragraphs(2).join(" ") }
    start_time { Faker::Time.forward(20, :all) }
    end_time { Faker::Time.between(20.days.since, 30.days.since) }
  end
end
