class AddMentorToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :mentor, :boolean, default: false
  end
end
