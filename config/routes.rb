# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :products
      get '/product', to: 'products#product_by_dimensions_and_weight'
    end
  end
end
