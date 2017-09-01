class AddDeletedAtToCompetitions < ActiveRecord::Migration[5.1]
  def change
    add_column :competitions, :deleted_at, :boolean
  end
end
