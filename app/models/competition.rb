class Competition < ApplicationRecord
  before_create :confirm_singleton
  has_many :invite_codes, dependent: :delete_all
  validates_presence_of %i[name start_time end_time]
  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude, address: :location
  after_validation :geocode, if: ->(obj) { obj.location.present? && obj.location_changed? }
  after_validation :reverse_geocode, unless: ->(obj) { obj.location.present? },
                                     if: (lambda do |obj|
                                       obj.latitude.present? &&
                                         obj.latitude_changed? &&
                                         obj.longitude.present? &&
                                         obj.longitude_changed?
                                     end)

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

  def full_address
    [country, city, street].compact.join(", ")
  end

  def confirm_singleton
    raise CompetitionExistsError, "Only one competition allowed to be stored at a time" if Competition.count > 0
  end
end
