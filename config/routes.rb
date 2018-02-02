Rails.application.routes.draw do
  root "app#index"

  devise_for :users, path: "auth", controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  devise_scope :user do
    get "/auth/token", to: "users/sessions#get_token"
  end

  scope :auth do
    get "is_signed_in", to: "auth#signed_in?"
  end

  scope :api do
    get "/users/me", to: "users#show_self", as: :user_me
    put "/users/me", to: "users#update_self", as: :user_me_update
    put "/users/me/change_password", to: "users#change_password", as: :user_change_password
    get "/users/deleted", to: "users#index_deleted"
    delete "/users/:id/destroy", to: "users#hard_destroy"
    resources :users

    get "/competition", to: "competition#show"
    post "/competition", to: "competition#create"
    put "/competition", to: "competition#update"
    delete "/competition", to: "competition#destroy"
    get "/competition/invites", to: "competition_attendees#list_attendees"
    post "/competition/invites", to: "competition_attendees#invite_attendee"
    post "/competition/attendees/message", to: "competition_attendees#message"

    get "/competition/events", to: "competition_events#index"
    post "/competition/events", to: "competition_events#create"
    get "/competition/events/:id", to: "competition_events#show", as: :competition_event
    put "/competition/events/:id", to: "competition_events#update"
    delete "/competition/events/:id", to: "competition_events#destroy"

    put "/notifications/:id/seen", to: "notifications#seen", as: :seen_notification
    put "/notifications/:id/dismiss", to: "notifications#dismissed", as: :dismiss_notification
    resources :notifications
  end

  mount ActionCable.server => "/cable"

  get "/*path", to: "app#index", via: :all
end
