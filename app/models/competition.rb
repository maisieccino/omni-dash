class Competition < ApplicationRecord
  before_create :confirm_singleton
  has_many :invite_codes, dependent: :delete_all
  has_many :events, dependent: :delete_all
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
      { first_name: a.first_name, last_name: a.last_name, email: a.email, has_account: !a.user.nil? }
    end
  end

  def current_event
    events.to_a
          .select {|e| e.end_time >= Time.now && e.start_time <= Time.now }
          .sort_by(&:start_time)
          .first
  end

  def next_event
    events.to_a
          .select {|e| e.start_time > Time.now }
          .sort_by(&:start_time)
          .first
  end

  def as_json(options={})
    super(include: %i[current_event next_event])
  end

  private

  def full_address
    [country, city, street].compact.join(", ")
  end

  def confirm_singleton
    raise CompetitionExistsError, "Only one competition allowed to be stored at a time" if Competition.count > 0
  end
end
