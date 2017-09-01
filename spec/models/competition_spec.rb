require "rails_helper"

RSpec.describe Competition, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:start_time) }
  it { should validate_presence_of(:end_time) }


  it "should accept competition with correct values" do
    competition = build(:competition)
    competition.should respond_to(:name)
    competition.should respond_to(:description)
    competition.should respond_to(:start_time)
    competition.should respond_to(:end_time)
    competition.should respond_to(:capacity)
    competition.should respond_to(:location)
  end
end
