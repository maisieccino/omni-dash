class HackerViewController < ApplicationController
  layout "react"

  def index
    redirect_to root_path unless user_signed_in?
    @event_name = event_name
    @hacker_view_props = { current_user: current_user }
  end
end
