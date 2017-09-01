class CompetitionsController < ApplicationController
  before_action :json_authenticate_user
  before_action :admin_only, only: %i[create]

  before_action :set_competition, only: %i[show update destroy]
  before_action :competition_not_deleted, only: %i[show update destroy]

  def create
    @competition = Competition.create!(competition_params)
    json_response(@competition, :created)
  end

  def index
    json_response(Competition.all.select { |c| c.deleted_at.nil? }, :ok)
  end

  def show
    json_response(@competition, :ok)
  end

  private

  def competition_not_deleted
    json_response({ message: "Competition not found" }, :not_found) if @competition[:deleted_at]
  end

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
    @competition = Competition.find(params[:id])
  end
end
