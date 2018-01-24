class AddPronounsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :pronouns, :text
  end
end
