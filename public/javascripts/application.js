



if not QoP?
  QoP = {}

QoP.ServerBase = "https://YOURAPPNAMEHERE.herokuapp.com";


(function() {
  this.JST || (this.JST = {});
  this.JST["content"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div id="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('" class="contactlist" style="display:block;">\n\t<div class="friends_list">\n\t</div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["friend"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<p id="contact_');
      
        __out.push(__sanitize(this.user.uid));
      
        __out.push('" class=\'user\'>\n\t<img src="');
      
        __out.push(__sanitize(QoP.ServerBase));
      
        __out.push('/stylesheets/images/knob_green.png">\n\t');
      
        __out.push(__sanitize(this.user.nickname));
      
        __out.push('\n</p>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["friends"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var friend, _i, _len, _ref;
      
        _ref = this.friends;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          friend = _ref[_i];
          __out.push('\n\t<p id="');
          __out.push(__sanitize(friend.uid));
          __out.push('" class=\'user\'>');
          __out.push(__sanitize(friend.nickname));
          __out.push('</p>\n');
        }
      
        __out.push('\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["header"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div id="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('" class="chatbox">\n  <div class="chatboxhead">\n    <div class="chatboxtitle">');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</div>\n    <div class="chatboxoptions">\t\n\t\t<span id="raise" style="display:none;">&oline;</span>\n      \t<span id="lower">_</span>\n\t\t<span id="close">&Chi;</span>\n    </div>\n    <br clear="all">\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["message"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="chatboxmessage">\n  <span class="chatboxmessagefrom">');
      
        __out.push(__sanitize(this.nickname));
      
        __out.push(':&nbsp;</span>\n  <span class="chatboxmessagecontent">');
      
        __out.push(__sanitize(this.text));
      
        __out.push('</span>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["panel"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div id="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('" class="chatboxcontent" style="display:block;">\n\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["sent_at"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class=\'chatboxmessage\'>\n  <span class=\'chatboxinfo\'>Sent at 12:44PM Feb 18th</span>\n</div>"\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["signup"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div style="text-align:center">\n\tYou need to login\n\t<a href="');
      
        __out.push(__sanitize(QoP.ServerBase));
      
        __out.push('/sign_in?redirect=');
      
        __out.push(__sanitize(this.redirect));
      
        __out.push('"> Sign in </a>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["textarea"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="chatboxinput" data-uid="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('" style="display: block;">\n  <textarea id="qop_chatbox" class="chatboxtextarea"></textarea>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

MicroEvent.mixin = function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
};
(function() {
  var done, script,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  QoP.Server = (function() {

    Server.name = 'Server';

    function Server() {}

    Server.sendRequest = function(service_name, data, callback) {
      var response;
      if (data == null) {
        data = null;
      }
      if (callback == null) {
        callback = null;
      }
      qop$.support.cors = true;
      response = qop$.ajax("" + QoP.ServerBase + "/" + service_name, {
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          return xhr.withCredentials = true;
        },
        success: function(data) {
          if (callback) {
            return callback(data);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Error => " + textStatus);
          return console.log(errorThrown);
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });
    };

    return Server;

  })();

  QoP.Box = (function() {

    Box.name = 'Box';

    function Box(id, name) {
      var box;
      this.id = id;
      this.name = name;
      this.closeBox = __bind(this.closeBox, this);

      this.raiseBox = __bind(this.raiseBox, this);

      this.lowerBox = __bind(this.lowerBox, this);

      box = qop$('#qop').find("#" + this.id);
      if ((box.length === 0) && (this.id != null) && (this.name != null)) {
        console.log("Create a box with id: " + this.id);
        this.box = qop$(JST['header']({
          id: id,
          name: name
        }));
        this.box.find('#lower').bind('click', this.lowerBox);
        this.box.find('#raise').bind('click', this.raiseBox);
        this.box.find('#close').bind('click', this.closeBox);
        this.box.css({
          position: 'relative',
          top: '285px'
        });
        qop$('#qop').append(this.box);
        this.bind('box:raise', this.raiseBox);
        this.trigger('qop:activate');
      } else {
        console.log("Box with id: " + this.id + " already on the page");
        this.box = box;
        if (!this.box.is(':visible')) {
          this.box.show();
        }
      }
    }

    Box.prototype.lowerBox = function() {
      console.log("lower box " + (this.box.attr('id')));
      this.box.css({
        position: 'relative',
        top: '285px'
      });
      this.box.find('#raise').show();
      return this.box.find('#lower').hide();
    };

    Box.prototype.raiseBox = function() {
      console.log("raise box " + (this.box.attr('id')));
      this.box.find('#lower').show();
      this.box.find('#raise').hide();
      return this.box.css({
        top: '0px'
      });
    };

    Box.prototype.closeBox = function() {
      console.log("close box " + (this.box.attr('id')));
      return this.box.hide();
    };

    return Box;

  })();

  MicroEvent.mixin(QoP.Box);

  QoP.Contacts = (function(_super) {

    __extends(Contacts, _super);

    Contacts.name = 'Contacts';

    function Contacts(id, name) {
      this.presenceSucceeded = __bind(this.presenceSucceeded, this);

      this.createChat = __bind(this.createChat, this);

      this.updateFriendStatus = __bind(this.updateFriendStatus, this);

      var _this = this;
      this.presenceChannel = null;
      this.friends = null;
      this.uid = null;
      this.online = null;
      this.nickname = null;
      this.bind('qop:init_presence', this.initPresenceChannel);
      QoP.Server.sendRequest('chat_session', null, function(data) {
        var content;
        _this.friends = data.friends;
        _this.uid = data.uid;
        _this.online = data.online === "true";
        _this.nickname = data.nickname;
        content = qop$(JST['content']({
          id: "content_" + id
        }));
        _this.box.append(content);
        _this.trigger('qop:init_presence');
        return console.log(_this);
      });
      Contacts.__super__.constructor.call(this, id, name);
    }

    Contacts.prototype.addFriend = function(user) {
      var check, friend,
        _this = this;
      check = this.box.find("#contact_" + user.uid).length === 0;
      if (check) {
        friend = qop$(JST['friend']({
          user: user
        }));
        this.box.find('.friends_list').append(friend);
        friend.bind('click', {
          user: user
        }, function(event) {
          console.log("send chat request to user: " + event.data.user.nickname + " with uid " + event.data.user.uid);
          return QoP.Server.sendRequest('chat_request', {
            uid: event.data.user.uid
          });
        });
      }
    };

    Contacts.prototype.removeFriend = function(user) {
      this.box.find(".friends_list p#contact_" + user.uid).remove();
    };

    Contacts.prototype.updateFriendStatus = function(user) {
      if (user.online) {
        this.addFriend(user);
      } else {
        this.removeFriend(user);
      }
    };

    Contacts.prototype.createChat = function(data) {
      var channel_name, friend, panel, user;
      console.log("Received a create_chat event with data =>");
      console.log(data);
      channel_name = data.channel_name;
      friend = {
        uid: data.uid,
        nickname: data.nickname
      };
      user = {
        uid: this.uid,
        nickname: this.nickname
      };
      panel = new QoP.Panel(channel_name, friend, user);
    };

    Contacts.prototype.presenceSucceeded = function() {
      var globalChat, user, _i, _len, _ref;
      console.log("Event: subscription_succeeded for presence channel");
      console.log("Rendering friends ");
      this.trigger('box:raise');
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        console.log("Render user: " + user.nickname);
        this.addFriend(user);
      }
      user = {
        uid: this.uid,
        nickname: this.nickname
      };
      globalChat = new QoP.PanelGlobal('global_chat', user);
    };

    Contacts.prototype.initPresenceChannel = function() {
      var redirectUrl;
      if (this.online) {
        this.presenceChannel = QoP.pusher.subscribe("presence-" + this.uid);
        this.presenceChannel.bind('pusher:subscription_succeeded', this.presenceSucceeded);
        this.presenceChannel.bind('friend_status', this.updateFriendStatus);
        this.presenceChannel.bind('create_chat', this.createChat);
      } else {
        redirectUrl = encodeURIComponent(window.location.origin);
        this.box.find('.contactlist').append(qop$(JST['signup']({
          redirect: redirectUrl
        })));
        this.trigger('box:raise');
      }
    };

    return Contacts;

  })(QoP.Box);

  QoP.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.name = 'Panel';

    function Panel(channel_name, friend, user) {
      if (friend == null) {
        friend = {};
      }
      if (user == null) {
        user = {};
      }
      this.messageReceived = __bind(this.messageReceived, this);

      this.channel = null;
      this.channel_name = channel_name;
      this.name = null;
      this.user = user;
      this.friend = friend;
      this.bind('qop:activate', this.activate);
      Panel.__super__.constructor.call(this, this.friend.uid, this.friend.nickname);
    }

    Panel.prototype.activate = function() {
      this.createBox();
      this.enableTextBox();
      this.createChannel();
      return this.trigger('box:raise');
    };

    Panel.prototype.messageReceived = function(data) {
      var message, nickname;
      console.log("Message received with data on channel: " + this.channel_name + " , with data =>");
      console.log(data);
      console.log("My nickname is: " + this.user.nickname + " with " + this.user.uid);
      console.log("My friend is: " + this.friend.nickname + " with " + this.friend.uid);
      if (data.uid === this.friend.uid) {
        nickname = "Me";
      } else {
        nickname = this.friend.nickname;
      }
      if (!this.box.is(':visible')) {
        this.box.show();
      }
      message = JST['message']({
        text: data.text,
        nickname: nickname
      });
      this.box.find('.chatboxcontent').append(message);
      this.box.find('.chatboxcontent').scrollTop(10000000);
      qop$('.chatboxcontent').scrollTop(10000000);
    };

    Panel.prototype.createChannel = function() {
      if (!(this.channel != null)) {
        this.channel = QoP.pusher.subscribe(this.channel_name);
        this.channel.bind('pusher:subscription_succeeded', console.log("User subscribed in channel: " + this.channel_name));
        this.channel.bind('pusher:subscription_error', console.log('User already subscribed => nothing to do'));
        this.channel.bind('new_message', this.messageReceived);
      }
      return this.channel;
    };

    Panel.prototype.createBox = function() {
      var panel, textarea;
      panel = qop$(JST['panel']({
        id: "panel_" + this.friend.uid
      }));
      this.box.append(panel);
      textarea = qop$(JST['textarea']({
        uid: this.friend.uid
      }));
      return this.box.append(textarea);
    };

    Panel.prototype.enableTextBox = function() {
      var textBox,
        _this = this;
      textBox = this.box.find('.chatboxtextarea');
      textBox.keypress(function(e) {
        return e.stopPropagation();
      });
      return textBox.keydown(function(e) {
        var code, data, text;
        e.stopPropagation();
        code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
          text = textBox.val();
          console.log("Enter key was pressed " + text);
          textBox.val("");
          e.preventDefault();
          if (text !== "") {
            data = {
              uid: _this.friend.uid,
              text: text,
              channel_name: _this.channel_name
            };
            QoP.Server.sendRequest('messages', data);
          }
        }
      });
    };

    return Panel;

  })(QoP.Box);

  QoP.PanelGlobal = (function(_super) {

    __extends(PanelGlobal, _super);

    PanelGlobal.name = 'PanelGlobal';

    function PanelGlobal(channel_name, user) {
      if (user == null) {
        user = {};
      }
      this.enableTextBox = __bind(this.enableTextBox, this);

      this.messageReceived = __bind(this.messageReceived, this);

      this.activate = __bind(this.activate, this);

      this.channel = null;
      this.channel_name = channel_name;
      this.user = user;
      this.bind('qop:activate', this.activate);
      console.log(this);
      PanelGlobal.__super__.constructor.call(this, 'global_chat', "Open chat");
    }

    PanelGlobal.prototype.activate = function() {
      this.createBox();
      this.createChannel();
      return this.trigger('box:raise');
    };

    PanelGlobal.prototype.messageReceived = function(data) {
      var message, nickname;
      console.log("Message received with data on channel: " + this.channel_name + " , with data =>");
      console.log(data);
      nickname = data.nickname;
      message = JST['message']({
        text: data.text,
        nickname: nickname
      });
      this.box.find('.chatboxcontent').append(message);
      this.box.find('.chatboxcontent').scrollTop(10000000);
    };

    PanelGlobal.prototype.createChannel = function() {
      this.channel = QoP.pusher.subscribe(this.channel_name);
      this.channel.bind('pusher:subscription_succeeded', this.enableTextBox);
      this.channel.bind('pusher:subscription_error', console.log('User already subscribed => nothing to do'));
      this.channel.bind('new_message', this.messageReceived);
    };

    PanelGlobal.prototype.createBox = function() {
      var panel, textarea;
      panel = qop$(JST['panel']({
        id: "panel_global_chat"
      }));
      this.box.append(panel);
      textarea = qop$(JST['textarea']({
        uid: 'global_chat_textarea'
      }));
      return this.box.append(textarea);
    };

    PanelGlobal.prototype.enableTextBox = function() {
      var textBox,
        _this = this;
      console.log("Channel subscribed " + this.channel_name);
      console.log("Enable textbox");
      textBox = this.box.find('.chatboxtextarea');
      textBox.keypress(function(e) {
        return e.stopPropagation();
      });
      return textBox.keydown(function(e) {
        var code, data, text;
        e.stopPropagation();
        code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
          text = textBox.val();
          console.log("Enter key was pressed " + text);
          textBox.val("");
          e.preventDefault();
          if (text !== "") {
            data = {
              text: text,
              channel_name: _this.channel_name
            };
            QoP.Server.sendRequest('messages_all', data);
          }
        }
      });
    };

    return PanelGlobal;

  })(QoP.Box);

  QoP.App = (function() {

    App.name = 'App';

    function App() {
      var contacts, repubblicaToolbar;
      repubblicaToolbar = qop$('#toolbar-social');
      if (repubblicaToolbar != null) {
        repubblicaToolbar.remove();
      }
      qop$("<div id='qop'></div>").appendTo('body');
      Pusher.channel_auth_endpoint = "" + QoP.ServerBase + "/pusher/auth";
      Pusher.channel_auth_transport = 'jsonp';
      QoP.pusher = new Pusher('3bc2d431f62d7eff98ca');
      contacts = new QoP.Contacts('contact_list', 'Contact List');
    }

    return App;

  })();

  MicroEvent.mixin(QoP.App);

  done = false;

  script = document.createElement('script');

  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';

  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
      done = true;
      window.qop$ = jQuery.noConflict();
      window.qop$.support.cors = true;
      return qop$.getScript("https://d3dy5gmtp8yhk7.cloudfront.net/1.11/pusher.min.js").done(function(script) {
        var app;
        console.log('loading app...');
        return app = new QoP.App();
      }).fail(function(jqxhr, settings, exception) {
        return console.log('failed');
      });
    }
  };

  document.getElementsByTagName('head')[0].appendChild(script);

}).call(this);
