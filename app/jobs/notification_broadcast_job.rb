class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    # check if user is logged in or not
    # send email if not.
    NotificationMailer.notification(notification).deliver_now unless LoggedInUserHelper.user_logged_in? notification.user.id
    ActionCable.server.broadcast "notification_channel-#{notification.user.id}", notification
  end
end
