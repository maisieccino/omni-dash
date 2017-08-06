class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def json_authenticate_user
    json_response({ message: "You are not signed in" }, 403) unless user_signed_in?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name provider uid])
  end
end
