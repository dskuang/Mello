Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  resources :users

  namespace :api, defaults:{format: :json} do
    resources :boards, only: [:index, :create, :show, :destroy]
    resources :lists
    resources :cards

  end

end
