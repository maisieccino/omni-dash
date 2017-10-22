class NotificationsController < ApplicationController
  before_action :json_authenticate_user
  before_action :set_user
  before_action :set_notification, except: :index

  def index
    json_response(@user.notifications, :ok)
  end

  def show
    json_response(@notification, :ok)
  end

  def seen
    @notification.seen = true
    @notification.save
    json_response(@notification, :ok)
  end

  def dismissed
    @notification.dismissed = true
    @notification.save
    json_response(@notification, :ok)
  end

  private

  def set_user
    @user = current_user
  end

  def set_notification
    @notification = @user.notifications.find(params[:id])
    return json_response({ message: "Notification not found" }, :not_found) if @notification.nil?
  end
end
