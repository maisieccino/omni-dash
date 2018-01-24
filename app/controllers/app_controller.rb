class AppController < ApplicationController
  layout "react"

  def index
    @event_name = event_name
    redirect_to root_path unless user_signed_in?
    @props = { current_user: current_user }
  end
end
