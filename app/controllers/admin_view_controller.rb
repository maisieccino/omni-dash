class AdminViewController < ApplicationController
  layout "react"

  def index
    @event_name = event_name
    redirect_to root_path unless user_signed_in?
    @react_props = { current_user: current_user }
  end
end
