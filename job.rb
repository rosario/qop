require 'delayed_job'
require 'delayed_job_data_mapper'
require 'twitter'
require './models'



class LookupFriends < Struct.new(:nickname)
  def perform
    puts "Looking for #{nickname} friends"
    friends = Twitter.friend_ids(nickname.to_s)
    user = User.first(:nickname => nickname)
    if friends.ids
      friends.ids.each do |id|
        puts "Create user with id #{id}"
        friend = User.first_or_create(:uid=> id)
        user.friends << friend unless user.friends.first(:uid=> id)
      end
      user.save
    end
    
  end
end

