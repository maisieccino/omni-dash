class Competition < ApplicationRecord
  before_create :confirm_singleton
  has_many :invite_codes, dependent: :delete_all

  validates_presence_of %i[name start_time end_time]

  class CompetitionExistsError < StandardError
  end

  def attendees
    attendees = invite_codes
    attendees.map do |a|
      print a.email
      return { first_name: a.first_name, last_name: a.last_name, email: a.email, has_account: false } unless a.used
      u = User.find_by(email: a.email)
      { first_name: u.first_name, last_name: u.last_name, email: u.email, has_account: true }
    end
  end

  private

  def confirm_singleton
    raise CompetitionExistsError, "Only one competition allowed to be stored at a time" if Competition.count > 0
  end
end
