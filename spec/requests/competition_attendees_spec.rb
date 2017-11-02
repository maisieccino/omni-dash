require "rails_helper"

RSpec.describe "Competition Attendees API", type: :request do
  let(:admin_user) { create(:user, admin: true) }
  let!(:competition) { create(:competition) }
  # get a list of 10 attendees. we'll test that they all get notifications etc.
  let!(:users) { create_list(:user, 10) }
  let!(:attendees) { users.map { |u| create(:invite_code, competition: competition, email: u.email) } }

  describe "POST /competition/invites/message" do
    let(:message_params) { { title: "Hellooo", message: "This is a test message" } }

    it "should be forbidden if not signed in" do
      post competition_attendees_message_path, params: message_params.to_json, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if signed in as non-admin user" do
      sign_in users[0]
      post competition_attendees_message_path, params: message_params.to_json, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be successful if signed in as an admin user" do
      sign_in admin_user
      post competition_attendees_message_path, params: message_params.to_json, headers: json_headers
      expect(response).to have_http_status(:no_content)

      users.each do |u|
        expect(u.notifications.count).to eq(1)
        expect(u.notifications.first.message) .to eq(message_params[:message])
      end
    end
  end
end
