class AddUsedColumnToInviteCodes < ActiveRecord::Migration[5.1]
  def change
    add_column :invite_codes, :used, :boolean, default: false
  end
end
