require 'rails_helper'

RSpec.describe Api::V1::ProductsController, type: :controller do
  describe 'GET index' do
    it 'returns a list of all products' do
      create(:product)
      create(:product)

      get :index

      expect(response).to have_http_status(:ok)
      expect(response_json.length).to eq(2)
    end
  end

  describe 'GET product_by_dimensions_and_weight' do
    context 'when a closest product is found' do
      it 'returns the closest product' do
        product1 = create(:product, length: 10, width: 10, height: 10, weight: 10)
        create(:product, length: 30, width: 20, height: 20, weight: 20)

        get :product_by_dimensions_and_weight, params: { length: 15, width: 15, height: 15, weight: 15 }

        expect(response).to have_http_status(:ok)
        expect(response_json[:name]).to eq(product1.name)
      end
    end

    context 'when no closest product is found' do
      it 'returns a not found error' do
        get :product_by_dimensions_and_weight, params: { length: 100, width: 100, height: 100, weight: 100 }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to eq({ error: 'Product not found' }.to_json)
      end
    end
  end

  describe 'POST create' do
    context 'with valid parameters' do
      it 'creates a new product' do
        product_params = attributes_for(:product)

        expect do
          post :create, params: { product: product_params }
        end.to change(Product, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.body).to eq(Product.last.to_json)
      end
    end

    context 'with invalid parameters' do
      it 'returns an unprocessable entity error' do
        product_params = attributes_for(:product, name: nil)

        expect do
          post :create, params: { product: product_params }
        end.not_to change(Product, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to eq({ name: ["can't be blank"] }.to_json)
      end
    end
  end

  describe 'PUT update' do
    context 'with valid parameters' do
      it 'updates the specified product' do
        product = create(:product)
        new_params = { name: 'New Name' }

        put :update, params: { id: product.id, product: new_params }

        expect(response).to have_http_status(:ok)
        expect(response.body).to eq(product.reload.to_json)
        expect(product.reload.name).to eq('New Name')
      end
    end

    context 'with invalid parameters' do
      it 'returns an unprocessable entity error' do
        product = create(:product)
        new_params = { name: nil }

        put :update, params: { id: product.id, product: new_params }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to eq({ name: ["can't be blank"] }.to_json)
        expect(product.reload.name).not_to be_nil
      end
    end
  end

  describe 'DELETE destroy' do
    context 'with valid id' do
      it 'deletes the specified product' do
        product = create(:product)

        delete :destroy, params: { id: product.id }

        expect(response).to have_http_status(:no_content)
        expect(Product.count).to eq(0)
      end
    end

    context 'with invalid id' do
      it 'returns an unprocessable entity error' do
        put :update, params: { id: 123 }

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  def response_json
    JSON.parse(try(:response_body) || response.body, symbolize_names: true)
  end
end
