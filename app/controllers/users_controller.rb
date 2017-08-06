class UsersController < ApplicationController
  before_action :json_authenticate_user
  before_action :set_user, only: [:show]

  def show
    if current_user[:id] == @user[:id] || current_user.admin?
      json_response(@user, :ok)
    else
      json_response(@user.public_attributes_to_json)
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
