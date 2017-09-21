class CreateCompetitions < ActiveRecord::Migration[5.1]
  def change
    create_table :competitions do |t|
      t.string :name
      t.text :description
      t.datetime :start
      t.datetime :end
      t.integer :capacity
      t.string :location

      t.timestamps
    end
  end
end
