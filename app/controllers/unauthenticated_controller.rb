class UnauthenticatedController < ApplicationController
  def index
    @event_name = event_name
    return unless user_signed_in?
    if current_user.admin?
      redirect_to admin_path
    else
      redirect_to hackers_path
    end
  end
end
