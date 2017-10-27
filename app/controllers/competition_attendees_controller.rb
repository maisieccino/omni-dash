class CompetitionAttendeesController < ApplicationController
  before_action :json_authenticate_user
  before_action :admin_only
  before_action :set_competition
  before_action :invite_attendee_params, only: :invite_attendees

  def list_attendees
    json_response(@competition.attendees, :ok)
  end

  def invite_attendee
    # check to see if invitecode already exists
    invite_params = invite_attendee_params
    code = @competition.invite_codes.find_by(email: invite_params[:email])
    return json_response({ message: "This email has already been invited" }, :bad_request) if code
    # check email, see if user already exists.
    # if not, create a new InviteCode
    user = User.find_by(email: invite_params[:email])
    if user
      invite_params[:user] = user
      user.send_reset_password_instructions
      user.update(deleted_at: nil)
    end
    invite = @competition.invite_codes.create!(invite_params)
    json_response(invite, :created)
  end

  private

  def invite_attendee_params
    params.permit(:email, :first_name, :last_name)
  end

  def set_competition
    return json_response({ message: "Competition not found" }, :not_found) if Competition.count.zero?
    @competition = Competition.first
  end
end
