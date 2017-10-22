require "rails_helper"

RSpec.describe "Notifications API", type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }

  let!(:notification) { create(:notification, user: user) }
  let!(:dismissed_notification) { create(:notification, user: user, dismissed: true) }
  let!(:seen_notification) { create(:notification, user: user, seen: true) }

  describe "GET /notifications" do
    it "should be forbidden if not signed in" do
      get notifications_path, headers: json_headers
      expect(response).to have_http_status(:forbidden)
    end

    it "should return list of all notifications if signed in" do
      sign_in user
      get notifications_path, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(3)
    end

    it "should return empty list if no notifications" do
      sign_in other_user
      get notifications_path, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(0)
    end
  end

  describe "GET /notification/:id" do
    it "should be forbidden if not signed in" do
      get notification_path(notification.id)
      expect(response).to have_http_status(:forbidden)
    end

    it "should not show notification if it does not belong to user" do
      sign_in other_user
      get notification_path(notification.id)
      expect(response).to have_http_status(:not_found)
    end

    it "should show notifcation if notification belongs to user" do
      sign_in user
      get notification_path(notification.id)
      expect(response).to have_http_status(:ok)
      expect(json["title"]).to eq(notification.title)
    end
  end

  describe "PUT /notification/:id/seen" do
    it "should be forbidden if not signed in" do
      put seen_notification_path(notification.id)
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if notification does not belong to user" do
      sign_in other_user
      put seen_notification_path(notification.id)
      expect(response).to have_http_status(:not_found)
    end

    it "should succeed if notification belongs to user" do
      expect(notification.seen?).to eq(false)
      sign_in user
      put seen_notification_path(notification.id)
      expect(response).to have_http_status(:ok)
      notification.reload
      expect(notification.seen?).to eq(true)
    end
  end

  describe "PUT /notification/:id/dismiss" do
    it "should be forbidden if not signed in" do
      put dismiss_notification_path(notification.id)
      expect(response).to have_http_status(:forbidden)
    end

    it "should be forbidden if notification does not belong to user" do
      sign_in other_user
      put dismiss_notification_path(notification.id)
      expect(response).to have_http_status(:not_found)
    end

    it "should succeed if notification belongs to user" do
      expect(notification.dismissed?).to eq(false)
      sign_in user
      put dismiss_notification_path(notification.id)
      expect(response).to have_http_status(:ok)
      notification.reload
      expect(notification.dismissed?).to eq(true)
    end
  end
end
