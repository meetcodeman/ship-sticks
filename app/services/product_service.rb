# frozen_string_literal: true

class ProductService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def find_closest_product
    Product.collection.aggregate([
                                   project_fields,
                                   sort_by_distance,
                                   limit_to_one
                                 ]).first
  end

  private

  def project_fields
    { '$project' => {
      '_id' => 1,
      'name' => 1,
      'distance' => {
        '$sqrt' => {
          '$add' => [
            distance_calculation('$length', length.to_i),
            distance_calculation('$width', width.to_i),
            distance_calculation('$height', height.to_i),
            distance_calculation('$weight', weight.to_i)
          ]
        }
      }
    } }
  end

  def distance_calculation(product_attr, query_value)
    { '$pow' => [{ '$subtract' => [product_attr, query_value] }, 2] }
  end

  def sort_by_distance
    { '$sort' => { 'distance' => 1 } }
  end

  def limit_to_one
    { '$limit' => 1 }
  end

  def length
    params[:length] || 0
  end

  def width
    params[:width] || 0
  end

  def height
    params[:height] || 0
  end

  def weight
    params[:weight] || 0
  end
end
