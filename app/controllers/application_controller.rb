class ApplicationController < ActionController::API
  rescue_from Mongoid::Errors::DocumentNotFound, with: :handle_not_found

  private

  def handle_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
end
