class Competition < ApplicationRecord
  validates_presence_of %i[name start_time end_time]
end
