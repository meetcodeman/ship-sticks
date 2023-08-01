# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: %i[update destroy]

      def index
        @products = Product.all

        render json: @products
      end

      def product_by_dimensions_and_weight
        @product = ::ProductService.new(params).find_closest_product

        if @product
          render json: @product, status: :ok
        else
          render json: { error: 'Product not found' }, status: :not_found
        end
      end

      def create
        @product = Product.new(product_params)

        if @product.save
          render json: @product, status: :created
        else
          render json: @product.errors, status: :unprocessable_entity
        end
      end

      def update
        if @product.update(product_params)
          render json: @product, status: :ok
        else
          render json: @product.errors, status: :unprocessable_entity
        end
      end

      def destroy
        if @product.destroy
          head :no_content
        else
          render json: { error: 'Unable to delete product' }, status: :unprocessable_entity
        end
      end

      private

      def set_product
        @product = Product.find(params[:id])
      end

      def product_params
        params.require(:product).permit(:name, :type, :length, :width, :height, :weight)
      end
    end
  end
end
