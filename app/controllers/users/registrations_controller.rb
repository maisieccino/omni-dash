class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  before_action :configure_sign_up_form_params, only: [:new]
  before_action :soft_destroy, only: [:destroy]

  # GET /resource/sign_up
  def new
    @code = InviteCode.find_by(code: params[:code]) if params[:code]
    super
  end

  # POST /resource
  def create
    code = InviteCode.find_by(code: params[:user][:access_code], email: params[:user][:email])
    params[:user].delete :access_code
    if code
      super
    else
      flash[:alert] = "You either did not provide an access code or it was incorrect. Double check your email!"
      redirect_to(new_user_registration_path)
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message :success, :destroyed if is_flashing_format?
    yield resource if block_given?
    respond_with_navigational(resource) { redirect_to after_sign_out_path_for(resource) }
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def configure_sign_up_form_params
    params.permit(:code)
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name access_code])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: %i[first_name last_name access_code])
  end

  def soft_destroy
    resource.soft_delete
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
