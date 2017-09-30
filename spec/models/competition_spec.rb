require "rails_helper"

RSpec.describe Competition, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:start_time) }
  it { should validate_presence_of(:end_time) }

  it "should accept competition with correct values" do
    competition = build(:competition)
    expect(competition).to respond_to(:name)
    expect(competition).to respond_to(:description)
    expect(competition).to respond_to(:start_time)
    expect(competition).to respond_to(:end_time)
    expect(competition).to respond_to(:capacity)
    expect(competition).to respond_to(:location)
  end

  it "should only allow one competition object at any one time" do
    comp1 = create(:competition)
    expect(comp1).to_not be_nil
    expect { create(:competition) }.to raise_error(Exception)
  end

  # create some events and test current_event, next_event

end
