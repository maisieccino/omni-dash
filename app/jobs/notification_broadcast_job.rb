class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast "notification_channel-#{notification.user.id}", notification
  end
end
