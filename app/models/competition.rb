class Competition < ApplicationRecord
  validates_presence_of %i[name description start_time end_time]
end
