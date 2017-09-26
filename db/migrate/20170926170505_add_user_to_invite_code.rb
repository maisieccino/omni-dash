class AddUserToInviteCode < ActiveRecord::Migration[5.1]
  def change
    add_reference :invite_codes, :user, foreign_key: true
    remove_column :invite_codes, :used
  end
end
