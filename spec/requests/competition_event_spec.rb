require "rails_helper"

RSpec.describe "Competition Event API", type: :request do
  let(:user) { create(:user) }
  let(:admin_user) { create(:user, admin: true) }
  let!(:competition) { create(:competition) }

  describe "GET /competition/events" do
    it "should not be accessible if not logged in" do
      get competition_events_path, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be accessible if user logged in" do
      sign_in user
      get competition_events_path, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(0)
    end
  end

  let(:event_params) { attributes_for(:event).to_json }
  describe "POST /competition/events" do
    it "should be forbidden if not logged in" do
      post competition_events_path, params: event_params, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if not admin user" do
      sign_in user
      post competition_events_path, params: event_params, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be successful if admin user" do
      sign_in admin_user
      post competition_events_path, params: event_params, headers: json_headers
      expect(response).to have_http_status(:created)
      competition.reload
      expect(competition.events.count).to eq(1)
    end
  end

  describe "GET /competitions/events/:id" do
    let!(:event) { create(:event, competition: competition) }

    it "should be forbidden if not logged in" do
      get competition_event_path(event[:id]), headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be successful if logged in as any user" do
      sign_in user
      get competition_event_path(event[:id]), headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(json["name"]).to eq(event[:name])
    end

    it "should return 404 if event does not exist" do
      sign_in user
      get competition_event_path(10000), headers: json_headers
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "PUT /competitions/events/:id" do
    let!(:event) { create(:event, competition: competition) }
    let(:event_params) { { name: "My cool event" }.to_json }

    it "should be forbidden if not logged in" do
      put competition_event_path(event[:id]), params: event_params, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if not admin user" do
      sign_in user
      put competition_event_path(event[:id]), params: event_params, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be successful if admin user" do
      sign_in admin_user
      put competition_event_path(event[:id]), params: event_params, headers: json_headers
      expect(response).to have_http_status(:no_content)
      event.reload
      expect(event.name).to eq("My cool event")
    end
  end

  describe "DELETE /competitions/events/:id" do
    let!(:event) { create(:event, competition: competition) }

    it "should be forbidden if not logged in" do
      delete competition_event_path(event.id), headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if not admin user" do
      sign_in user
      delete competition_event_path(event.id), headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should be successful if admin user" do
      sign_in admin_user
      delete competition_event_path(event.id), headers: json_headers
      expect(response).to have_http_status(:no_content)
      expect(Event.find_by(name: event.name)).to be_nil
    end
  end
end
