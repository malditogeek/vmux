$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

adapter  = require('../utils/adapter.coffee')
[DPC, VPC, APC] = require('../utils/peer_connection.coffee')
Media    = require('../utils/media.coffee')

User    = require('../models/user.coffee')
Stream  = require('../models/stream.coffee')
Sidebar = require('./sidebar.coffee')

Message             = require('../models/message.coffee')
MessagesCollection  = require('../models/messages_collection.coffee')
MessagesView        = require('./messages.coffee')
MessageInput        = require('./message_input.coffee')

ServerSentEvents = require('../utils/sse.coffee')

class Users extends Backbone.Collection
  model: User

class LocalUserView extends Backbone.View
  className: 'stream-view'

  events:
    'click #toggle-audio': 'toggleAudio'
    'click #toggle-video': 'toggleVideo'

  toggleAudio: ->
    el = @$el.find('#toggle-audio')
    el.toggleClass('muted fa-microphone-slash fa-microphone')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Microphone is #{state}")
    @$el.find('.tip').tooltip('hide')
    @collection.forEach (user) ->
      user.toggleAudio()

  toggleVideo: ->
    el = @$el.find('#toggle-video')
    el.toggleClass('muted fa-video-camera fa-eye-slash')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Camera is #{state}")
    @$el.find('.tip').tooltip('hide')
    @collection.forEach (user) ->
      user.toggleVideo()

  render: ->
    @$el.html(Templates['user/localvideo'].render())
    @$el.find('.tip').tooltip()
    adapter.attachMediaStream @$el.find('video')[0], localStream

    return this

class UserView extends Backbone.View
  className: 'stream-view'

  render: ->
    @$el.html(Templates['user/video'].render(@model.toJSON()))
    @model.on 'video:ready', (user, stream) =>
      adapter.attachMediaStream @$el.find('video')[0], stream
    return this

class Room extends Backbone.View
  id: 'room'

  initialize: (attributes) ->
    @room_name = attributes.room_name.toLowerCase()
    @sse = new ServerSentEvents("room-#{@room_name}")

  scrollChat: ->
    @$el.find('#chat-messages').scrollTop(10000)

  render: ->
    @$el.html(Templates['layout/room'].render())

    views = {}
    online_users = new Users()

    # Navbar
    sidebar = new Sidebar(model: @model)
    @$el.find('#navbar').html(sidebar.render().el)

    # Chat
    input = new MessageInput()
    @$el.find('#chat-input').html(input.render().el)

    input.on 'message', (msg) =>
      message = new Message(@model.get('profile_image_url_https'), msg)
      messages.add(message)
      @scrollChat()
      online_users.forEach (user) ->
        user.sendChat(msg)

    messages = new MessagesCollection()
    chatview = new MessagesView(collection: messages)
    @$el.find('#chat-messages').html(chatview.render().el)

    online_users.bind 'add', (user) =>
      views[user.id] = new UserView(model: user, collection: online_users) 
      @$el.find('#streams').append views[user.id].render().el

    online_users.bind 'remove', (user) =>
      views[user.id].remove()

    window.beforeunload.push =>
      online_users.forEach (user) ->
        user.disconnect()

    onUserReady = (user) =>
      user.offerVideo() if @media
      user.datachannel.on 'videoOffer', =>
        if @media
          pc = user.newConnection 'video'
          pc.initiate()

      user.datachannel.on 'message', (msg) =>
        avatar = user.get('profile_image_url_https')
        message = new Message(avatar, msg)
        messages.add(message)
        @scrollChat()

    onUserDisconnected = (user) =>
      online_users.remove(user)

    @sse.on 'otr', (msg) =>
      user = online_users.get(msg.src)
      user.otr.receiveMsg(msg.body) if user

    @sse.on "room-#{@room_name}", (msg) =>
      _user = online_users.get(msg.src.id)
      online_users.remove(_user) if _user
      user = new User(msg.src, parent: @model)
      online_users.add(user)
      user.ack("room-#{@room_name}")
      user.on 'data:ready', onUserReady
      user.on 'data:disconnected', onUserDisconnected

    @sse.on "ack", (msg) =>
      _user = online_users.get(msg.src.id)
      online_users.remove(_user) if _user
      user = new User(msg.src, parent: @model)
      online_users.add(user)
      user.handshake()
      user.on 'data:ready', onUserReady
      user.on 'data:disconnected', onUserDisconnected

    media = new Media(audio: true, video: true)
    media.on 'success', (stream) =>
      @media = true
      localvideo = new LocalUserView(model: @model, collection: online_users)
      @$el.find('#streams').prepend(localvideo.render().el)
      online_users.forEach (user) =>
        user.offerVideo()
    media.on 'error', =>
      alert 'Request to access media denied. Reload.'

    return this

module.exports = Room
