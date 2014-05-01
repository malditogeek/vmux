$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($)

adapter  = require('../utils/adapter.coffee')

CallRequest   = require('./call_request.coffee')
OneToOne      = require('./one_to_one.coffee')
OneToOneAudio = require('./one_to_one_audio.coffee')

Message             = require('../models/message.coffee')
MessagesCollection  = require('../models/messages_collection.coffee')
MessagesView        = require('./messages.coffee')
MessageInput        = require('./message_input.coffee')

# GUM
Media = require('../utils/media.coffee')

class UserDetail extends Backbone.View
  className: 'user'

  initialize: ->
    @unreadCount = 0
    @chatVisible = false

  events:
    'click .show-chat' : 'showChat'
    'click .hide-chat' : 'hideChat'
    'click .audiocall' : 'audiocall'
    'click .videocall' : 'videocall'

  showChat: ->
    @$el.find('.chat').modal(backdrop: false, keyboard: false, toggle: true)
    @resetUnreadCount()
    @scrollChat()
    @chatVisible = true

  hideChat: ->
    @$el.find('.chat').modal('hide')
    @chatVisible = false

  audiocall: ->
    media = new Media(audio: true, video: false)
    media.on 'success', (stream) =>
      @model.requestAudiocall()
      @$el.find('.audiocall').addClass('active')
    media.on 'error', =>
      alert 'Request to access media denied. Reload.'
      @$el.find('.audiocall').removeClass('active')

  videocall: ->
    media = new Media(audio: true, video: true)
    media.on 'success', (stream) =>
      @model.requestVideocall()
      @$el.find('.videocall').addClass('active')
    media.on 'error', =>
      alert 'Request to access media denied. Reload.'
      @$el.find('.videocall').removeClass('active')


  scrollChat: ->
    @$el.find('.chat-messages').scrollTop(10000);

  incrementUnreadCount: ->
    @unreadCount += 1
    @$el.find('.unreadCount').html(@unreadCount)
    @$el.find('.unreadCount').show()
    @$el.find('.show-chat').addClass('active')

  resetUnreadCount: ->
    @unreadCount = 0
    @$el.find('.unreadCount').hide()
    @$el.find('.unreadCount').html('')
    @$el.find('.show-chat').removeClass('active')

  render: ->
    @$el.html(Templates['user/detail'].render(@model.toJSON()))

    messages = new MessagesCollection()
    chatview = new MessagesView(collection: messages)
    @$el.find('.chat-messages').html(chatview.render().el)

    input = new MessageInput()
    @$el.find('.chat-input').html(input.render().el)

    input.on 'message', (msg) =>
      avatar = @model.options.parent.get('profile_image_url_https')
      message = new Message(avatar, msg)
      messages.add(message)
      @model.sendChat msg
      @scrollChat()


    # FIXME explore the possibility of triggering an event from the 1-to-1 view
    # to show the chat modal while on a videochat
    @model.on 'video:ready', =>
      @one_to_one = new OneToOne(model: @model)
      $('#conversation').html(@one_to_one.render().el)
      $('#container').fadeOut 200, =>
        $('#bgvideo').hide()
        $('#conversation').fadeIn(200)

    @model.on 'video:disconnected', =>
      @$el.find('.videocall').removeClass('active')
      @one_to_one.remove()
      $('#conversation').fadeOut 200, =>
        $('#container').fadeIn 200, =>
          $('#bgvideo').fadeIn()

    @model.on 'audio:ready', =>
      @onetooneaudio = new OneToOneAudio(model: @model)
      @$el.find('.one-to-one-audio').html(@onetooneaudio.render().el)
      @$el.find('.audio').modal(backdrop: false, keyboard: false)

    @model.on 'audio:disconnected', =>
      @$el.find('.audiocall').removeClass('active')
      @$el.find('.audio').modal('hide')
      @$el.find('.audio').on 'hidden.bs.modal', =>
        @onetooneaudio.remove()
   
    @model.on 'data:ready', =>
      @$el.find('.actions').fadeIn()

      @model.datachannel.on 'message', (msg) =>
        @incrementUnreadCount() unless @chatVisible
        avatar = @model.get('profile_image_url_https')
        message = new Message(avatar, msg)
        messages.add(message)
        @scrollChat()

      showRequestModal = (type) =>
        req = new CallRequest(model: @model, type: type)
        @$el.append(req.render().el)
        return req

      @model.datachannel.on 'requestVideo', =>
        req = showRequestModal('video')

        req.on 'accepted', (contact) =>
          videochannel = @model.newConnection 'video'
          videochannel.initiate()

        req.on 'rejected', (contact) =>
          @model.sendChat "Sorry, can't talk right now"
          @model.datachannel.sendMessage {type: 'declineVideo'}
          @model.stopLocalStream()

      @model.datachannel.on 'requestAudio', =>
        req = showRequestModal('audio')

        req.on 'accepted', (contact) =>
          audiochannel = @model.newConnection 'audio'
          audiochannel.initiate()

        req.on 'rejected', (contact) =>
          @model.sendChat "Sorry, can't talk right now"
          @model.datachannel.sendMessage {type: 'declineAudio'}
          @model.stopLocalStream()

      @model.datachannel.on 'declineAudio', =>
        @$el.find('.audiocall').removeClass('active')
        @model.stopLocalStream()

      @model.datachannel.on 'declineVideo', =>
        @$el.find('.videocall').removeClass('active')
        @model.stopLocalStream()




    return this

module.exports = UserDetail
