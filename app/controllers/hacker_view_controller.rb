class HackerViewController < ApplicationController
  layout "hacker_view"

  def index
    redirect_to root_path unless user_signed_in?
    @hacker_view_props = { user: { user: current_user } }
  end
end
