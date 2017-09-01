require "rails_helper"

RSpec.describe "Competitions API", type: :request do
  let(:competition_params) { attributes_for(:competition) }
  let!(:my_competition) { create(:competition) }
  let(:competition_id) { my_competition["id"] }
  let(:user) { create(:user) }
  let(:admin_user) { create(:user, admin: true) }

  describe "GET /competitions" do
    it "should be forbidden if not signed in" do
      get competitions_path, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should return competitions if signed in" do
      sign_in user
      get competitions_path, headers: json_headers
      expect(response).to have_http_status(200)
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end
  end

  describe "POST /competitions" do
    it "should be forbidden if not signed in" do
      post competitions_path, params: competition_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be forbidden if not an admin" do
      sign_in user
      post competitions_path, params: competition_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be successful if admin with correct params" do
      sign_in admin_user
      post competitions_path, params: competition_params.to_json, headers: json_headers
      expect(response).to have_http_status(201)
      expect(json["name"]).to_not be_nil
      expect(json["description"]).to_not be_nil
      expect(json["start_time"]).to_not be_nil
      expect(json["end_time"]).to_not be_nil
    end

    it "should fail if name missing" do
      sign_in admin_user
      competition_params = { start_time: Time.now, end_time: 2.days.since }
      post competitions_path, params: competition_params.to_json, headers: json_headers
      expect(response).to have_http_status(422)
    end
  end

  describe "GET /competitions/:id" do
    it "should be forbidden if not signed in" do
      get competition_path(competition_id), headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be successful when signed in" do
      sign_in user
      get competition_path(competition_id), headers: json_headers
      expect(response).to have_http_status(200)
      expect(json["name"]).to eq(my_competition["name"])
    end
  end

  describe "PUT /competitions/:id" do
    let(:updated_params) { { name: "hatch x UCL" } }

    it "should be forbidden if not signed in" do
      put competition_path(competition_id), params: updated_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be forbidden if not admin" do
      sign_in user
      put competition_path(competition_id), params: updated_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be successful if admin" do
      sign_in admin_user
      put competition_path(competition_id), params: updated_params.to_json, headers: json_headers
      expect(response).to have_http_status(204)
    end
  end

  describe "DELETE /competitions/:id" do
    it "should be forbidden if not signed in" do
      delete competition_path(competition_id), headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be forbidden if not admin" do
      sign_in user
      delete competition_path(competition_id), headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be successful if admin" do
      sign_in admin_user
      delete competition_path(competition_id), headers: json_headers
      expect(response).to have_http_status(204)
    end
  end
end
