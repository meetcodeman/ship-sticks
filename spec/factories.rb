FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    type { Faker::Commerce.product_name }
    length { rand(1..50) }
    width { rand(1..50) }
    height { rand(1..50) }
    weight { rand(1..50) }
  end
end
