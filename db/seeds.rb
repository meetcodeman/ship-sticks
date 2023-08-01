require 'json'

# Parse the JSON data from the file
json_data = File.read(Rails.root.join('db', 'data.json'))
data = JSON.parse(json_data)

# Loop through each product and create a new record
puts '***** Data seeding start *******'
data['products'].each do |product|
  Product.create(
    name: product['name'],
    type: product['type'],
    length: product['length'],
    width: product['width'],
    height: product['height'],
    weight: product['weight']
  )
end
puts '***** Data seeding success *******'
