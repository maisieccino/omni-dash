class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notification_channel-#{current_user.id}"
    LoggedInUserHelper.user_logs_in current_user.id
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    LoggedInUserHelper.user_logs_out current_user.id
  end
end
