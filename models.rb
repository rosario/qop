require 'data_mapper'


class User
  include DataMapper::Resource
  
  property :id,         Serial
  property :name,       String
  property :uid,        String, :required => true
  property :nickname,   String
  property :created_at, DateTime
  property :online,     Boolean, :default  => false
  
  has n, :friendships, :child_key => [ :source_id ]
  has n, :friends, self, :through => :friendships, :via => :target
  
  has n, :inverse_friendships, 'Friendship', :child_key =>[:target_id]
  has n, :inverse_friends, self, :through =>:inverse_friendships, :via =>:source
  def online!
    self.online = true
    self.save
  end
  
  
  def friend?(friend)
    friends.first(:id =>friend.id) or inverse_friends.first(:id=>friend.id)
  end
  
  
  def offline!
    self.online = false
    self.save
  end
  
  
  def online_friends
    fs = friends.all(:online=>true)
    ls = inverse_friends.all(:online=>true)
    fs + ls
  end
  
end
 
class Friendship
  include DataMapper::Resource
  belongs_to :source, 'User', :key => true
  belongs_to :target, 'User', :key => true
end
