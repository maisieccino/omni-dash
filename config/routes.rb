Rails.application.routes.draw do
  root "unauthenticated#index"

  devise_for :users, path: "auth", controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  scope :auth do
    get "is_signed_in", to: "auth#signed_in?"
  end

  get "hackers", to: "hacker_view#index"
  match "hackers/*path", to: "hacker_view#index", via: :all

  get "admin", to: "admin_view#index"
  match "admin/*path", to: "admin_view#index", via: :all

  get "hello_world", to: "hello_world#index"

  get "/users/me", to: "users#show_self", as: :user_me, via: :get
  put "/users/me", to: "users#update_self", as: :user_me_update, via: :put
  resources :users
end
