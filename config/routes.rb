Breathalyzer::Application.routes.draw do
  match 'weather/:location' => 'weather#index'
  match 'breath/check' => 'breath#check'

  resources :breath
  resources :weather

  root :to => 'breath#index'
end
