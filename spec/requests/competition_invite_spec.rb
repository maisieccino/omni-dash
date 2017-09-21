require "rails_helper"

RSpec.describe "Competition Invite API", type: :request do
  let(:user) { create(:user) }
  let(:admin_user) { create(:user, admin: true) }
  let!(:competition) { create(:competition) }

  describe "GET /competition/invites" do
    it "should be forbidden if not signed in" do
      get competition_invites_path, headers: json_headers
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

  describe "POST /competition/invites" do
    let(:invite_params) { attributes_for(:invite_code) }
    it "should be forbidden if not signed in" do
      post competition_invites_path, params: invite_params.to_json, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if not an admin user" do
      sign_in user
      post competition_invites_path, params: invite_params.to_json, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should create invitation if admin user" do
      sign_in admin_user
      post competition_invites_path, params: invite_params.to_json, headers: json_headers
      expect(response).to have_http_status(:created)
      expect(json["used"]).to eq(false)
      invites = competition.invite_codes
      expect(invites.length).to eq(1)
    end

    it "should create invitation if user already exists but set used to true" do
      sign_in admin_user
      post competition_invites_path, params: user.to_json, headers: json_headers
      expect(response).to have_http_status(:created)
      expect(json["used"]).to eq(true)
    end

    it "should not create invitation if invite already exists" do
      sign_in admin_user
      post competition_invites_path, params: user.to_json, headers: json_headers
      expect(response).to have_http_status(:created)
      expect(json["used"]).to eq(true)
      # try to make it again
      post competition_invites_path, params: user.to_json, headers: json_headers
      expect(response).to have_http_status(:bad_request)
    end
  end
end
