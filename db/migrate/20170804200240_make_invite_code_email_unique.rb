class MakeInviteCodeEmailUnique < ActiveRecord::Migration[5.1]
  def change
    add_index :invite_codes, :email, unique: true 
  end
end
