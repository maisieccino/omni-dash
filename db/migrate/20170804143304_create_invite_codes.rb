class CreateInviteCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :invite_codes do |t|
      t.string :code
      t.string :first_name
      t.string :last_name
      t.string :email

      t.timestamps
    end
    add_index :invite_codes, :code
  end
end
