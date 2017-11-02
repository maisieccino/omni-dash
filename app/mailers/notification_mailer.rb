class NotificationMailer < ApplicationMailer
  def notification(notification)
    @notification = notification
    mail(to: @notification.user.email, subject: "New notification: #{@notification.title}")
  end
end
