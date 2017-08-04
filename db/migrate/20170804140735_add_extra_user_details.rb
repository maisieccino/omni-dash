class AddExtraUserDetails < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.text :bio
      t.string :phone_number
      t.text :dietary_info
      t.integer :coding_experience

      t.string :contact_twitter
      t.string :contact_facebook
      t.string :contact_website
      t.string :contact_linkedin
      t.string :contact_devpost
      t.string :contact_github
    end
  end
end
