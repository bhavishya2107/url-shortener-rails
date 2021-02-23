Rails.application.routes.draw do
  get '/urls/:slug' => 'urls#show'
  patch '/urls/:slug' => 'urls#update'
  resources :urls, only: %i[index create show]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
