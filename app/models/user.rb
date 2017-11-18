class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_presence_of :first_name, :last_name, :email
  after_create :update_invite_code
  has_one :invite_code, dependent: :destroy
  has_many :notifications, dependent: :destroy

  has_attached_file :avatar, styles: { medium: "512x512>", thumb: "128x128>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  def public_attributes_to_json
    to_json(only:
    %i[
      id
      first_name
      last_name
      bio
      contact_twitter
      contact_facebook
      contact_website
      contact_linkedin
      contact_linkedin
      contact_devpost
      contact_github
      admin
      mentor
    ])
  end

  def update_invite_code
    invite_code = InviteCode.find_by(email: email)
    return if invite_code.nil?
    invite_code.user = self
    invite_code.save
  end

  def soft_delete
    update_attribute(:deleted_at, Time.current)
  end

  def active_for_authentication?
    super && !deleted_at
  end

  def inactive_message
    !deleted_at ? super : :deleted_account
  end
end
