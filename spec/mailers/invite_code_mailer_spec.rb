require "rails_helper"

RSpec.describe InviteCodeMailer, type: :mailer do
  describe "invite code mailer" do
    let(:invite_code) { build(:invite_code) }

    it "should send email to user" do
      email = InviteCodeMailer.invite(invite_code)

      expect(email.to).to eq([invite_code.email])
      expect(email.subject).to eq("Welcome to Hatch!")
    end
  end
end
