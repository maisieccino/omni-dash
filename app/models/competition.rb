class Competition < ApplicationRecord
  validates_presence_of %i[name description start end]
end
