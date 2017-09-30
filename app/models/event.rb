class Event < ApplicationRecord
  belongs_to :competition
  validates_presence_of %i[name start_time]
  validate :end_time_cannot_be_earlier_than_start_time

  private

  def end_time_cannot_be_earlier_than_start_time
    if !end_time.nil? && end_time < start_time
      errors.add(:end_time, "can't be earlier than start time")
    end
  end
end
