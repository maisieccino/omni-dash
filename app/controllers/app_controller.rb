class AppController < ApplicationController
  layout "react"

  def index
    respond_to do |format|
      format.json { render json: {}.to_json }
      format.html do
        @event_name = event_name
        @props = { user: {user: current_user || {}} }
      end
    end
  end
end
