class CompetitionEventsController< ApplicationController
  before_action :json_authenticate_user
  before_action :set_competition
  before_action :set_event, except: %i[index create]
  before_action :admin_only, except: %i[index show]
  before_action :event_params, only: :create

  def index
    json_response(@competition.events.order(:start_time, :end_time), :ok)
  end

  def show
    json_response(@event, :ok)
  end

  def create
    @event = @competition.events.create(event_params)
    json_response(@event, :created)
  end

  def update
    @event.update(event_params)
    head :no_content
  end

  def destroy
    @event.destroy
    head :no_content
  end

  private

  def set_competition
    return json_response({ message: "Competition not found" }, :not_found) if Competition.count.zero?
    @competition = Competition.first
  end

  def set_event
    @event = @competition.events.find(params[:id])
    return json_response({ message: "Event not found" }, :not_found) if @event.nil?
  end

  def event_params
    params.permit(
      :name,
      :description,
      :start_time,
      :end_time
    )
  end
end
