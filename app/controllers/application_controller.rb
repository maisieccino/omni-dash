class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def event_name
    if Competition.first.nil?
      @event_name = ENV.fetch("SITE_NAME") { "Hackathon" }
    else
      @event_name = Competition.first.name
    end
  end

  protected

  def json_authenticate_user
    json_response({ message: "You are not signed in" }, 403) unless user_signed_in?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name provider uid])
  end

  def admin_only
    return head :forbidden unless current_user.admin?
  end
end
