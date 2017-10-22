class AddSeenDismissedUserToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :seen, :boolean, defualt: false
    add_column :notifications, :dismissed, :boolean, defualt: false
    add_reference :notifications, :user, foreign_key: true
  end
end
