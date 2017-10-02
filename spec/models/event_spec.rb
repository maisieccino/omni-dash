require "rails_helper"

RSpec.describe Event, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:start_time) }

  let!(:competition) { create(:competition) }
  it "should validate successfully" do
    expect(build(:event, competition: competition)).to be_valid
  end

  it "should fail validation if start date later than end date" do
    expect(build(:event, competition: competition, end_time: 1.day.ago)).to_not be_valid
  end
end
