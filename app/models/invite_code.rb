class InviteCode < ApplicationRecord
  validates_presence_of :email
  before_save :generate_code
  after_create :send_email
  belongs_to :competition, optional: true

  protected

  def send_email
    InviteCodeMailer.invite(self).deliver_now unless used
  end

  # generates random invite code
  def generate_code
    # if collision, try again
    loop do
      self.code = SecureRandom.hex
      break unless InviteCode.find_by(code: code)
    end
  end
end
