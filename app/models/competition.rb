class Competition < ApplicationRecord
  before_create :confirm_singleton

  validates_presence_of %i[name start_time end_time]

  private

  def confirm_singleton
    raise Exception, "Only one competition allowed to be stored at a time" if Competition.count > 0
  end
end
