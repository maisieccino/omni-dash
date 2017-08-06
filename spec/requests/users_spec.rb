require "rails_helper"
require "pp"

RSpec.describe "Users API", type: :request do
  let(:user) { create(:user) }
  # test that admin can see extra info
  let(:admin_user) { create(:user, admin: true) }
  # other user to test what fields are available to other users
  let(:other_user) { create(:user) }

  describe "GET /user/:id" do
    it "allows user to view all of their own details when logged in" do
      sign_in user
      get user_path(user[:id])

      expect(response).to have_http_status(200)
      expect(json).to_not be_empty
      expect(json["email"]).to eq(user[:email])
      expect(json["first_name"]).to eq(user[:first_name])
      expect(json["last_name"]).to eq(user[:last_name])
      expect(json["bio"]).to eq(user[:bio])
      expect(json["phone_number"]).to eq(user[:phone_number])
      expect(json["dietary_info"]).to eq(user[:dietary_info])
      expect(json["coding_experience"]).to eq(user[:coding_experience])
      expect(json["contact_twitter"]).to eq(user[:coding_experience])
      expect(json["admin"]).to eq(user[:admin])
      expect(json["mentor"]).to eq(user[:mentor])
      expect(json["password"]).to be_nil
    end

    it "returns 404 if user not found" do
      sign_in user
      get user_path(100)
      expect(response).to have_http_status(404)
    end

    it "prevents access when not signed in" do
      get user_path(user[:id])

      expect(response).to have_http_status(403)
    end

    it "prevents user from viewing sensitive info of other user" do
      sign_in user
      get user_path(other_user[:id])

      expect(response).to have_http_status(200)
      expect(json).to_not be_empty
      expect(json["first_name"]).to eq(other_user[:first_name])
      expect(json["last_name"]).to eq(other_user[:last_name])
      expect(json["bio"]).to eq(other_user[:bio])
      expect(json["contact_twitter"]).to eq(other_user[:coding_experience])
      expect(json["admin"]).to eq(other_user[:admin])
      expect(json["mentor"]).to eq(other_user[:mentor])

      expect(json["email"]).to be_nil
      expect(json["dietary_info"]).to be_nil
      expect(json["password"]).to be_nil
      expect(json["phone_number"]).to be_nil
      expect(json["coding_experience"]).to be_nil
    end

    it "allows admins to see info apart from password" do
      sign_in admin_user
      get user_path(other_user[:id])

      expect(response).to have_http_status(200)
      expect(json).to_not be_empty
      expect(json["first_name"]).to eq(other_user[:first_name])
      expect(json["last_name"]).to eq(other_user[:last_name])
      expect(json["bio"]).to eq(other_user[:bio])
      expect(json["contact_twitter"]).to eq(other_user[:coding_experience])
      expect(json["admin"]).to eq(other_user[:admin])
      expect(json["mentor"]).to eq(other_user[:mentor])
      expect(json["email"]).to eq(other_user[:email])
      expect(json["dietary_info"]).to eq(other_user[:dietary_info])
      expect(json["phone_number"]).to eq(other_user[:phone_number])
      expect(json["coding_experience"]).to eq(other_user[:coding_experience])

      expect(json["password"]).to be_nil
    end
  end
end
