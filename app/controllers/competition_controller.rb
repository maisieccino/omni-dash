class CompetitionController < ApplicationController
  before_action :json_authenticate_user
  before_action :admin_only, only: %i[create list_attendees invite_attendee update destroy create_event update_event]
  before_action :admin_only, except: %i[show list_events]
  before_action :set_competition, except: %i[create]
  before_action :set_event, only: %i[update_event delete_event]
  before_action :invite_attendee_params, only: :invite_attendees
  before_action :event_params, only: :create_event

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
    if user
      invite_params[:user] = user
      user.send_reset_password_instructions
      user.update(deleted_at: nil)
    end
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

  def list_events
    json_response(@competition.events.order(:start_time, :end_time), :ok)
  end

  def create_event
    @event = @competition.events.create(event_params)
    json_response(@event, :created)
  end

  def update_event
    @event.update(event_params)
    head :no_content
  end

  def delete_event
    @event.destroy
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

  def event_params
    params.permit(
      :name,
      :description,
      :start_time,
      :end_time
    )
  end

  def invite_attendee_params
    params.permit(:email, :first_name, :last_name)
  end

  def set_competition
    return json_response({ message: "Competition not found" }, :not_found) if Competition.count.zero?
    @competition = Competition.first
  end

  def set_event
    @event = @competition.events.find(params[:id])
    return json_response({ message: "Event not found" }, :not_found) if @event.nil?
  end
end
