require "rails_helper"

RSpec.describe "Competition Attendees API", type: :request do
  let(:user) { create(:user) }
  let(:admin_user) { create(:user, admin: true) }
  let!(:competition) { create(:competition) }

  describe "GET /competition/attendees" do
    it "should be forbidden if not signed in" do
      get competition_attendees_path, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden for non-admin user" do
      sign_in user
      get competition_invites_path, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should return list of invites for admin user" do
      sign_in admin_user
      get competition_invites_path, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(0)
    end
  end
end
