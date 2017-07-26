class UnauthenticatedController < ApplicationController
  def index
    redirect_to hackers_path if user_signed_in?
  end
end
