class Notification < ApplicationRecord
  belongs_to :user
  validates_presence_of %i[title type]
end
