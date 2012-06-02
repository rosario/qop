require 'rubygems'
require 'active_support/core_ext'

require 'sinatra/base'
require 'json'
require 'rack/cors'
require 'logger'
require 'rack/protection'
require 'pusher'
require 'omniauth'
require 'omniauth-twitter'
require 'omniauth-tumblr'
require 'sprockets'
require 'data_mapper'
# require 'dm-sqlite-adapter'
require 'eco'
require 'thin'
require 'twitter'

require './models'
require './job'





class App < Sinatra::Base
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/db.sqlite3")
  DataMapper.finalize
  DataMapper.auto_upgrade!

  # Logs on Heroku  
  $stdout.sync = true
  use Rack::Logger
  use Rack::Session::Cookie
  
  # Credentials
  use OmniAuth::Builder do
    provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
    provider :tumblr, ENV['TUMBLR_KEY'], ENV['TUMBLR_SECRET']
  end
  
  
  use Rack::Cors do
    allow do
      origins 'http://localhost:5000', 'http://twitter.com', 'https://twitter.com' ,'http://qop.im'
      resource '/messages', :methods => [:post,:options] , :headers => :any, :credentials => true
      resource '/messages_all', :methods => [:post,:options] , :headers => :any, :credentials => true
      resource '/chat_session', :methods => [:post, :options] , :headers => :any, :credentials => true
      resource '/chat_request', :methods => [:post,:options] , :headers => :any, :credentials => true
      resource '/pusher/auth', :methods => [:get,:options] , :headers => :any, :credentials => true
    end
  end
  
  enable  :sessions, :logging
  disable :protection
  
  
  # Pusher credentials
  Pusher.app_id = ENV['PUSHER_APPID']
  Pusher.key = ENV['PUSHER_KEY']
  Pusher.secret = ENV['PUSHER_SECRET']
  
  
  helpers do
    def current_user
      @current_user ||= User.get(session[:user_id]) if session[:user_id]
    end
    
    def current_user_uid
      session[:user_id]
    end
    
    def current_user_nickname
      session[:user_nickname]
    end
    
    
  end
  
  
  
  
  
  post '/chat_request' do
    someone = User.first(:uid=> params[:uid])
    if someone and someone.online and current_user.friend?(someone)
      
      cuid = current_user.uid
      suid = someone.uid
      
      if cuid < suid
        chat_channel = "chat-channel-#{cuid}-#{suid}"
      else
        chat_channel = "chat-channel-#{suid}-#{cuid}"
      end
      puts "Send channel info: #{chat_channel}" 
      
      
      Pusher["presence-#{current_user.uid}"].trigger_async('create_chat', {
        :uid =>someone.uid,
        :nickname=>someone.nickname,
        :channel_name => chat_channel
      })
      
      Pusher["presence-#{someone.uid}"].trigger_async('create_chat',{
        :uid => current_user.uid,
        :nickname =>current_user.nickname,
        :channel_name => chat_channel
      })
      
      puts "Sent create_chat event to presence-#{current_user.uid}"
      puts "Sent create_chat event to presence-#{someone.uid}"
      
      
    end
    content_type :json
    {:request => 'sent'}.to_json
  end
  
  
  post '/messages_all' do
    channel = params[:channel_name]
    
    puts "Received a message saying: #{params[:text]} from #{current_user_uid} associated for channel #{channel}"
    Pusher[channel].trigger_async('new_message', { :text => params[:text], :uid => current_user.uid, :nickname=>current_user.nickname})
    
    content_type :json 
    { :message =>  'sent' }.to_json
  end
  
  
  post '/messages' do
    # FIXME: this method will fail, when the user is not logged id
    
    someone_uid = params[:uid]
    channel = params[:channel_name]
    
    puts "Received a message saying: #{params[:text]} from #{someone_uid} associated for channel #{channel}"
    
    Pusher[channel].trigger_async('new_message', { :text => params[:text], :uid => someone_uid})
    content_type :json 
    { :message =>  'sent' }.to_json
  end
  
  
  
  get '/' do
    puts "Session from INDEX: #{session.inspect}"
    if current_user
      current_user.id.to_s + " ... " + session[:user_id].to_s 
    else
      '<a href="/sign_in">Sign in with Twitter</a>'
    end
  end
  
  # Returns {:online => 'true'} if the user is online, otherwise {:online =>'false'}
  post '/chat_session' do
    puts "Params from chat_session: #{params.inspect}"
    if current_user
      friends = current_user.online_friends.collect do |f| 
        {:uid => f.uid, :nickname => f.nickname, :name => f.name, :online => f.online}
      end
      message = {:online => 'true',:nickname =>current_user.nickname, :uid => current_user.uid, :friends =>friends }
      puts "CHAT SESSION: message: #{message.inspect}"
    else
      message = {:online => 'false'}
    end
    puts "chat_session: #{message.inspect}"
    content_type :json
    message.to_json
  end
  
  
  
  ["/sign_in/?", "/signin/?", "/log_in/?", "/login/?", "/sign_up/?", "/signup/?"].each do |path|
    get path do
      puts "redirect url: #{params.inspect}"
      session[:redirect] = params[:redirect] if params[:redirect]
      redirect '/auth/twitter'
    end
  end
  
  
  ["/sign_out/?", "/signout/?", "/log_out/?", "/logout/?"].each do |path|
    get path do
    puts "Session from SIGNOUT: #{session.inspect}"
      session[:user_id] = nil
      redirect '/'
    end
  end
  
  
  get '/auth/twitter/callback' do
    
    auth = request.env["omniauth.auth"]
    puts "ominauth : #{auth['uid']}"
    puts "auth info : #{auth["info"]}"
    
    user = User.first_or_create({ :uid => auth["uid"]}, {
      :uid => auth["uid"],
      :nickname => auth["info"]["nickname"],
      :name => auth["info"]["name"],
      :created_at => Time.now })
    
    puts "User #{user.nickname} logged in"
    
    if user.nickname.nil? or user.nickname.empty?
      user.nickname = auth["info"]["nickname"]
      user.save
    end
    
    
    if user and user.nickname and user.friends.empty?
      puts "User #{user.nickname} - Getting Friends"
      job = LookupFriends.new(user.nickname)
      Delayed::Job.enqueue job
    end
    
    session[:user_id] = user.id
    redirect 'https://twitter.com'
    
  end
  
  get '/auth/failure' do
    puts params
    puts "Oppps, that is an error: try again!"
    redirect 'https://twitter.com'
  end
  
  
  # Webhooks is called by Pusher
  post '/webhooks' do
    webhook = Pusher::WebHook.new(request)
    
    if webhook.valid?
      webhook.events.each do |event|
        
        uid = event["channel"].split('-').last
        user = User.first(:uid=>uid)
        if user
          case event["name"]
          when 'channel_occupied'
            puts "Channel occupied: #{event["channel"]}"
            user.online!
          when 'channel_vacated'
            puts "Channel vacated: #{event["channel"]}"
            user.offline!
          end
          user.online_friends.each do |friend|
            puts "Send a friend_status push event to: presence-#{friend.uid} - user:#{user.uid}, :status:#{user.online}"
            Pusher["presence-#{friend.uid}"].trigger_async('friend_status',{ 
                :uid => user.uid, 
                :nickname => user.nickname, 
                :online =>user.online
            })
          end
        end
      end
    else
      status 401
    end
    return
  end
  
  
  # Authentication for Pusher presence channels
  get '/pusher/auth' do
    
    uid = params[:channel_name].split('-').last
    if current_user and current_user.uid == uid
      response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
          :user_id => current_user.uid
      })
      # This is needed for JSONP
      content_type "application/javascript"
      params[:callback] + "(" + response.to_json + ")"
    else
      halt 403, "Not authorized"
    end
      
  end
  

end
