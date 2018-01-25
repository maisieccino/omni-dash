class UnauthenticatedController < ApplicationController
  def index
    @event_name = event_name
    return unless user_signed_in?
      redirect_to home_path
  end
end
