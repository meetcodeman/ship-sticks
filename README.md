# README

#### Ruby on Rails version
* ruby '2.6.5'
* rails '6.1.7'

#### System dependencies
*  [You will need to setup Ruby on Rails on the system](https://gorails.com/setup/macos/13-ventura)
*  [Mongodb is required to be installed on the system to run API server locally
](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
#### Database initialization
* run `rails db:seed` seed up test data

#### How to run the rails server locally
* run `./start_servers.sh` to start rails (:3000) and react(:3001) servers
#### How to run the test suite
* run `rspec` to run test suite

#### API Documentation
- GET localhost:3000/products
    - response: [{...}, {...}]
- GET localhost:3000/api/v1/product?height=14&length=52&weight=56&width=16
    - - response: {...}
- POST localhost:3000/api/v1/products
    - body: {
      "name" : "name",
      "type" : "type",
      "length" : 12,
      "height" : "12",
      "width" : "12",
      "weight" : "12",
    }
    - response: {...}
- PATCH localhost:3000/api/v1/products/1
    - body: {
      "name" : "name",
      "type" : "type",
    }
    - response: {...}
- DELETE localhost:3000/api/v1/products/1
    - response: no_content

