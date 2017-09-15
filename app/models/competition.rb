class Competition < ApplicationRecord
  before_create :confirm_singleton
  has_many :invite_codes

  validates_presence_of %i[name start_time end_time]

  class CompetitionExistsError < StandardError
  end

  private

  def confirm_singleton
    raise CompetitionExistsError, "Only one competition allowed to be stored at a time" if Competition.count > 0
  end
end
