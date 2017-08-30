require "rails_helper"

RSpec.describe "Users API", type: :request do
  let(:user_params) do
    attributes_for(:user)
  end
  let(:user) { create(:user) }
  # test that admin can see extra info
  let(:admin_user) { create(:user, admin: true) }
  # other user to test what fields are available to other users
  let(:other_user) { create(:user) }

  describe "POST /users" do
    it "should be forbidden if not signed in" do
      post users_path, params: user_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be forbidden if not admin" do
      sign_in user
      post users_path, params: user_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "should be successful if signed in as admin" do
      sign_in admin_user
      post users_path, params: user_params.to_json, headers: json_headers
      expect(response).to have_http_status(201)
    end

    it "shouldn't be successful if invalid params" do
      user_params = { first_name: "Matt" }
      sign_in admin_user
      post users_path, params: user_params.to_json, headers: json_headers
      expect(response).to have_http_status(422)
    end
  end

  describe "GET /users" do
    it "should be forbidden for unauthenticated users" do
      get users_path
      expect(response).to have_http_status(403)
    end

    it "should be forbidden for non-admin users" do
      sign_in user
      get users_path
      expect(response).to have_http_status(403)
      sign_out user
    end

    it "should be allowed for admin users" do
      sign_in admin_user
      get users_path
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /users/:id" do
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

  describe "GET /users/me" do
    it "allows user to view all of their own details when logged in" do
      sign_in user
      get user_me_path

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

    it "prevents access when not signed in" do
      get user_me_path
      expect(response).to have_http_status(403)
    end
  end

  describe "PUT /users/:id/" do
    let(:update_params) { { first_name: "Matt" } }
    let(:password_params) { { password: "hunter2" } }
    it "allows user to update their own info" do
      sign_in user
      put user_path(user[:id]), params: update_params.to_json, headers: json_headers
      expect(response).to have_http_status(204)
      user_obj = User.find(user[:id])
      expect(user_obj[:first_name]).to eq("Matt")
    end

    it "allows admin to update user info" do
      sign_in admin_user
      put user_path(user[:id]), params: update_params.to_json, headers: json_headers
      expect(response).to have_http_status(204)
      user_obj = User.find(user[:id])
      expect(user_obj[:first_name]).to eq("Matt")
      expect(user_obj[:last_name]).to eq(user[:last_name])
    end

    it "doesn't allow other users to update info" do
      sign_in other_user
      put user_path(user[:id]), params: update_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end

    it "doesn't allow unauthenticated users to update info" do
      put user_path(user[:id]), params: update_params.to_json, headers: json_headers
      expect(response).to have_http_status(403)
    end
  end

  describe "DELETE /users" do
    it "allows admins to deactivate a user" do
      sign_in admin_user
      delete user_path(user[:id])
      expect(response).to have_http_status(204)
      expect(User.find_by_id(user[:id])).to_not be_nil

      # check that user isn't found via API
      get user_path(user[:id])
      expect(response).to have_http_status(404)
    end

    it "does not allow other users to delete a user" do
      sign_in user
      delete user_path(other_user[:id])
      expect(response).to have_http_status(403)

      # check not actually deleted
      get user_path(other_user[:id])
      expect(response).to have_http_status(200)
    end

    it "does not allow users to /delete themselves (use auth path instead)" do
      sign_in user
      delete user_path(user[:id])
      expect(response).to have_http_status(403)

      # check not actually deleted
      get user_path(user[:id])
      expect(response).to have_http_status(200)
    end
  end
end
