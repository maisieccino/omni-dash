require "rails_helper"

RSpec.describe InviteCode, type: :model do
  it { should validate_presence_of(:email) }

  it "should generate an invite code on creation" do
    invite_code = InviteCode.create(email: "test@example.com")
    expect(invite_code.code).to_not be_nil
  end

  it "should ignore any user-defined code attribute" do
    code = "hello world"
    invite_code = InviteCode.create(email: "test@example.com", code: code)
    expect(invite_code).to_not equal(code)
  end

  it "won't allow codes to be created if code exists with same user" do
    email = "test@example.com"
    InviteCode.create(email: email)

    expect { InviteCode.create(email: email) }.to raise_error(ActiveRecord::RecordNotUnique)
  end
end
