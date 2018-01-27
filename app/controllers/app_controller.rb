class AppController < ApplicationController
  layout "react"

  def index
    @event_name = event_name
    @props = { current_user: current_user || {} }
  end
end
