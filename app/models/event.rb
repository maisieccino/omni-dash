class Event < ApplicationRecord
  belongs_to :competition
  validates_presence_of %i[name start_time]
end
