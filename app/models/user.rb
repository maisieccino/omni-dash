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
end
