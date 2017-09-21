class CompetitionController < ApplicationController
  before_action :json_authenticate_user
  before_action :admin_only, only: %i[create list_attendees invite_attendee update destroy]
  before_action :set_competition, only: %i[show list_attendees invite_attendee update destroy]
  before_action :invite_attendee_params, only: :invite_attendees

  def create
    @competition = Competition.create!(competition_params)
    json_response(@competition, :created)
  rescue Competition::CompetitionExistsError
    json_response({ message: "Competition already exists" }, :bad_request)
  end

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
    invite_params[:used] = !!user
    invite = @competition.invite_codes.create!(invite_params)
    json_response(invite, :created)
  end

  def destroy
    @competition.destroy
    head :no_content
  end

  def show
    json_response(@competition, :ok)
  end

  def update
    @competition.update(competition_params)
    head :no_content
  end

  private

  def competition_params
    params.permit(
      :name,
      :description,
      :start_time,
      :end_time,
      :location,
      :capacity
    )
  end

  def invite_attendee_params
    params.permit(:email, :first_name, :last_name, :used)
  end

  def set_competition
    return json_response({ message: "Competition not found" }, :not_found) if Competition.count.zero?
    @competition = Competition.first
  end
end
