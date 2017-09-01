class AddTimesToCompetitions < ActiveRecord::Migration[5.1]
  def change
    rename_column :competitions, :start, :start_time
    rename_column :competitions, :end, :end_time
  end
end
