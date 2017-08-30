class AdminViewController < ApplicationController
  layout "react"

  def index
    redirect_to root_path unless user_signed_in? && current_user.admin?
    @admin_view_props = { current_user: current_user }
  end
end
