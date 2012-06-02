


require './app'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'assets/javascripts'
  environment.append_path 'assets/stylesheets'
  environment.append_path 'assets/templates'
  run environment
end

map '/' do
  run App
end
