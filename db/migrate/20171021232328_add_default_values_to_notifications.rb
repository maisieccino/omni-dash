class AddDefaultValuesToNotifications < ActiveRecord::Migration[5.1]
  def change
    change_column :notifications, :dismissed, :boolean, default: false
    change_column :notifications, :seen, :boolean, default: false
  end
end
