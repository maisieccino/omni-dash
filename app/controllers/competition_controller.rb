class CompetitionController < ApplicationController
  before_action :json_authenticate_user, except: %i[ show ]
  before_action :admin_only, except: %i[show]
  before_action :set_competition, except: %i[create]

  def create
    @competition = Competition.create!(competition_params)
    json_response(@competition, :created)
  rescue Competition::CompetitionExistsError
    json_response({ message: "Competition already exists" }, :bad_request)
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

  def set_competition
    return json_response({ message: "Competition not found" }, :not_found) if Competition.count.zero?
    @competition = Competition.first
  end
end
