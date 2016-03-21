Rails.application.routes.draw do

  get '/', to: "home#index", as: :root

  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :ideas, only: [:index]
    end
  end

end
