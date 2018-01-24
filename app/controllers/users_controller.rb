class UsersController < ApplicationController
  before_action :json_authenticate_user
  before_action :admin_only, only: %i[create index index_deleted destroy hard_destroy]
  before_action :set_user, only: %i[show update destroy hard_destroy]
  before_action :set_user_self, only: %i[show_self update_self change_password]
  before_action :user_not_deleted, only: %i[show update destroy]
  before_action :password_params, only: %i[change_password]

  def create
    @user = User.create!(user_create_params)
    json_response(@user, :created)
  end

  def index
    json_response(User.all.select { |i| i.deleted_at.nil? }, :ok)
  end

  def index_deleted
    json_response(User.where.not(deleted_at: nil), :ok)
  end

  def show
    if current_user[:id] == @user[:id] || current_user.admin?
    json_response(@user.private_attributes_to_json, :ok)
    else
      json_response(@user.public_attributes_to_json)
    end
  end

  def show_self
    json_response(@user.private_attributes_to_json)
  end

  def update
    return head :forbidden unless current_user[:id] == @user[:id] || current_user.admin?
    @user.update(user_params)
    head :no_content
  end

  def update_self
    @user.update(user_params)
    head :no_content
  end

  def change_password
    return json_response({ message: "Password is incorrect" }, :bad_request) unless @user.valid_password?(password_params[:old_password])
    return json_response({ message: "New passwords do not match" }, :bad_request) unless password_params[:new_password] == password_params[:new_password_confirm]
    @user.update(password: password_params[:new_password],
                 password_confirmation: password_params[:new_password_confirm])
    bypass_sign_in @user
    head :no_content
  end

  def destroy
    @user.soft_delete
    head :no_content
  end

  def hard_destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def set_user_self
    @user = User.find_by_id(current_user[:id])
  end

  def user_not_deleted
    json_response({ message: "User not found" }, :not_found) if @user[:deleted_at]
  end

  def user_create_params
    params.permit(
      :admin,
      :first_name,
      :last_name,
      :email,
      :password,
      :mentor,
      :contact_twitter,
      :contact_facebook,
      :contact_website,
      :contact_linkedin,
      :contact_linkedin,
      :contact_devpost,
      :contact_github,
      :bio,
      :pronouns
    )
  end

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :mentor,
      :contact_twitter,
      :contact_facebook,
      :contact_website,
      :contact_linkedin,
      :contact_linkedin,
      :contact_devpost,
      :contact_github,
      :bio,
      :avatar,
      :pronouns
    )
  end

  def password_params
    params.permit(:old_password, :new_password, :new_password_confirm)
  end
end
