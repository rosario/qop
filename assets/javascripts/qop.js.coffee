
class QoP.Server
  @sendRequest: (service_name, data = null, callback = null) ->
    qop$.support.cors = true
    response = qop$.ajax "#{QoP.ServerBase}/#{service_name}",
      type: "POST"
      data: data
      contentType: "application/json; charset=utf-8"
      dataType: 'json'
      beforeSend: ( xhr ) ->
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xhr.withCredentials = true
      success: (data) ->
        callback(data) if callback
      error: (XMLHttpRequest, textStatus, errorThrown) ->
        console.log "Error => #{textStatus}"
        console.log errorThrown
      xhrFields:
         withCredentials: true
      crossDomain: true
    return
  
  
  
  
class QoP.Box
  constructor: (@id,@name) ->
    
    box = qop$('#qop').find("##{@id}")
    if (box.length == 0) and @id? and @name?
      console.log "Create a box with id: #{@id}"
      
      @box = qop$(JST['header'](id: id , name : name))
      @box.find('#lower').bind 'click', @lowerBox
      @box.find('#raise').bind 'click', @raiseBox
      @box.find('#close').bind 'click', @closeBox
      
      @box.css({position: 'relative', top: '285px'})
      qop$('#qop').append @box
      
      @bind 'box:raise', @raiseBox
      @trigger 'qop:activate'
    else
      console.log "Box with id: #{@id} already on the page"
      @box = box
      if not @box.is(':visible')
        @box.show()
    
    
    
  lowerBox: =>
    console.log "lower box #{@box.attr('id')}"
    @box.css({position: 'relative', top: '285px'})
    @box.find('#raise').show()
    @box.find('#lower').hide()
  
  raiseBox: =>
    console.log "raise box #{@box.attr('id')}"
    @box.find('#lower').show()
    @box.find('#raise').hide()
    @box.css({top: '0px'})
  
  closeBox: =>
    console.log "close box #{@box.attr('id')}"
    @box.hide()
  
MicroEvent.mixin(QoP.Box);

  
  
  

class QoP.Contacts extends QoP.Box
  constructor: (id, name) ->
    @presenceChannel = null
    @friends = null
    @uid = null
    @online = null
    @nickname = null
    
    
    @bind 'qop:init_presence', @initPresenceChannel
    
    
    QoP.Server.sendRequest 'chat_session', null, (data) =>
      @friends = data.friends
      
      
      @uid = data.uid
      @online = data.online == "true"
      @nickname = data.nickname
      content = qop$(JST['content'](id: "content_#{id}"))
      @box.append content 
      @trigger 'qop:init_presence'  
      console.log @
    
    super(id,name)
  
  
  
  addFriend: (user) ->
    check = @box.find("#contact_#{user.uid}").length == 0
    
    if check
      friend = qop$(JST['friend'](user: user))
      @box.find('.friends_list').append friend
      friend.bind 'click', {user: user}, (event) =>
        console.log "send chat request to user: #{event.data.user.nickname} with uid #{event.data.user.uid}"
        QoP.Server.sendRequest('chat_request', {uid: event.data.user.uid})
    return
  
  removeFriend: (user) ->
    @box.find(".friends_list p#contact_#{user.uid}").remove()
    return
    
  updateFriendStatus: (user) =>
    if user.online
      @addFriend(user)
    else
      @removeFriend(user)
    return
    
  createChat: (data) =>
    console.log "Received a create_chat event with data =>"
    console.log data
    channel_name = data.channel_name
    friend =  uid: data.uid, nickname: data.nickname
    user = uid: @uid, nickname: @nickname
    panel =  new QoP.Panel(channel_name, friend, user)
    return
    
    
  presenceSucceeded: =>
    console.log "Event: subscription_succeeded for presence channel"
    console.log "Rendering friends "
    @trigger 'box:raise'
    
    for user in @friends
      console.log "Render user: #{user.nickname}"
      @addFriend(user)
    # HACK -> creare un box per chattare con tutti
    user = uid: @uid, nickname: @nickname
    globalChat = new QoP.PanelGlobal('global_chat',user)
    return
    
    
  initPresenceChannel: ->
    if @online
      @presenceChannel = QoP.pusher.subscribe("presence-#{@uid}")
      @presenceChannel.bind 'pusher:subscription_succeeded', @presenceSucceeded
      @presenceChannel.bind 'friend_status', @updateFriendStatus
      @presenceChannel.bind 'create_chat', @createChat
    else
      # console.log "Not online"
      redirectUrl = encodeURIComponent(window.location.origin)
      @box.find('.contactlist').append qop$(JST['signup']({redirect: redirectUrl}))
      @trigger 'box:raise'
    return
    




class QoP.Panel extends QoP.Box
  constructor: (channel_name,friend = {}, user = {}) ->
    @channel = null
    @channel_name = channel_name
    @name = null
    @user = user
    @friend = friend
    
    @bind 'qop:activate', @activate
    super(@friend.uid, @friend.nickname)
    



  activate: () ->
    @createBox()
    @enableTextBox()
    @createChannel()
    @trigger 'box:raise'
  

  messageReceived: (data) =>
    console.log "Message received with data on channel: #{@channel_name} , with data =>"
    console.log data
    console.log "My nickname is: #{@user.nickname} with #{@user.uid}"
    console.log "My friend is: #{@friend.nickname} with #{@friend.uid}"
    if data.uid == @friend.uid
      nickname = "Me"
    else
      nickname = @friend.nickname
    
    # show the box, in case the user has already closed it
    if not @box.is(':visible')
      @box.show()
    
    message = JST['message'](text: data.text, nickname: nickname)
    @box.find('.chatboxcontent').append(message)
    @box.find('.chatboxcontent').scrollTop 10000000
    
    qop$('.chatboxcontent').scrollTop 10000000
    return
    
    
  
  createChannel: ->
    if not @channel?
      @channel = QoP.pusher.subscribe(@channel_name)
      @channel.bind 'pusher:subscription_succeeded', console.log("User subscribed in channel: #{@channel_name}")
      @channel.bind 'pusher:subscription_error', console.log('User already subscribed => nothing to do')
      @channel.bind 'new_message', @messageReceived
    @channel
    
    
    
  
  createBox: ->
    panel = qop$(JST['panel'](id: "panel_#{@friend.uid}"))
    @box.append panel
    textarea = qop$(JST['textarea'](uid: @friend.uid))
    @box.append textarea
    
    
  
  
  enableTextBox: ->    
    textBox = @box.find('.chatboxtextarea')
    textBox.keypress (e) =>
      e.stopPropagation()
    textBox.keydown (e) =>
      e.stopPropagation()
      code = if e.keyCode then e.keyCode else e.which
      if code == 13
        text = textBox.val()
        console.log "Enter key was pressed #{text}"
        textBox.val ""
        e.preventDefault()
        if text != ""
          data = uid: @friend.uid , text: text, channel_name: @channel_name
          QoP.Server.sendRequest('messages',data)
      return
    
  

class QoP.PanelGlobal extends QoP.Box
  constructor: (channel_name,  user = {}) ->
    @channel = null
    @channel_name = channel_name

    @user = user
    @bind 'qop:activate', @activate
    console.log @  
    super('global_chat', "Open chat")
    
    
    
    
  activate: () =>
    @createBox()
    @createChannel()
    @trigger 'box:raise'
    
    
  



  messageReceived: (data) =>
    console.log "Message received with data on channel: #{@channel_name} , with data =>"
    console.log data
    nickname = data.nickname
    message = JST['message'](text: data.text, nickname: nickname)
    @box.find('.chatboxcontent').append(message)
    @box.find('.chatboxcontent').scrollTop 10000000
    return



  createChannel: ->
    @channel = QoP.pusher.subscribe(@channel_name)
    @channel.bind 'pusher:subscription_succeeded', @enableTextBox
    @channel.bind 'pusher:subscription_error', console.log('User already subscribed => nothing to do')
    @channel.bind 'new_message', @messageReceived
    return



  createBox: ->
    panel = qop$(JST['panel'](id: "panel_global_chat"))
    @box.append panel
    textarea = qop$(JST['textarea'](uid: 'global_chat_textarea'))
    @box.append textarea




  enableTextBox: =>
    console.log "Channel subscribed #{@channel_name}"
    console.log "Enable textbox"
    
    textBox = @box.find('.chatboxtextarea')
    textBox.keypress (e) =>
      e.stopPropagation()
    textBox.keydown (e) =>
      e.stopPropagation()
      code = if e.keyCode then e.keyCode else e.which
      if code == 13
        text = textBox.val()
        console.log "Enter key was pressed #{text}"
        textBox.val ""
        e.preventDefault()
        if text != ""
          data = text: text, channel_name: @channel_name
          QoP.Server.sendRequest('messages_all',data)
      return





class QoP.App
  constructor: () ->
    repubblicaToolbar = qop$('#toolbar-social');
    repubblicaToolbar.remove() if repubblicaToolbar?
    
    qop$("<div id='qop'></div>").appendTo 'body'
    
    Pusher.channel_auth_endpoint = "#{QoP.ServerBase}/pusher/auth"
    Pusher.channel_auth_transport = 'jsonp'
    QoP.pusher = new Pusher '3bc2d431f62d7eff98ca'
    contacts = new QoP.Contacts('contact_list', 'Contact List')
    
    
MicroEvent.mixin(QoP.App);


done = false
script = document.createElement('script')
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'




script.onload = script.onreadystatechange = ->
  if (not done and (!@readyState or @readyState =='loaded' or @readyState =='complete'))
    done = true
    
    
    window.qop$ = jQuery.noConflict();
    window.qop$.support.cors = true
    
    qop$.getScript("https://d3dy5gmtp8yhk7.cloudfront.net/1.11/pusher.min.js")
      .done (script) ->
        console.log 'loading app...'
        app = new QoP.App()
      .fail (jqxhr, settings, exception) ->
        console.log 'failed'
document.getElementsByTagName('head')[0].appendChild(script)
