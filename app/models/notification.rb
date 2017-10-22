class Notification < ApplicationRecord
  belongs_to :user
  validates_presence_of %i[title notification_type]
  after_create_commit { NotificationBroadcastJob.perform_later self }
end
