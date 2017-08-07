require "rails_helper"

RSpec.describe User, type: :model do
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }

  describe "soft_delete" do
    let(:user) { build(:user) }
    it "should set user's deleted_at attribute" do
      expect(user[:deleted_at]).to be_nil
      user.soft_delete
      expect(user[:deleted_at]).to_not be_nil
    end

    it "should make active_for_authentication? return false" do
      expect(user.active_for_authentication?).to be_truthy
      user.soft_delete
      expect(user.active_for_authentication?).to be_falsy
    end
  end
end
