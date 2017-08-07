class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_presence_of :first_name, :last_name, :email

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
