class AddLatitudeAndLongitudeToCompetition < ActiveRecord::Migration[5.1]
  def change
    add_column :competitions, :latitude, :float
    add_column :competitions, :longitude, :float
  end
end
