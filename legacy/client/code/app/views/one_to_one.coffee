adapter  = require('/utils/adapter')

Message             = require('/models/message')
MessagesCollection  = require('/models/messages_collection')
MessagesView        = require('/views/messages')
MessageInput        = require('/views/message_input')

class OneToOne extends Backbone.View
  id: 'one-to-one'

  initialize: ->
    @pc = @model.get('pc')
    @audio = true
    @video = true
    @fullscreen = false

  events:
    'click #hangup': 'hangup'
    'click #toggle-audio': 'toggleAudio'
    'click #toggle-video': 'toggleVideo'
    'click #toggle-fullscreen': 'toggleFullscreen'

  toggleFullscreen: ->
    if not @fullscreen then @enterFullscreen() else @exitFullscreen()

  enterFullscreen:  ->
    @fullscreen = true
    document.documentElement.webkitRequestFullscreen()

  exitFullscreen: ->
    @fullscreen = false
    document.documentElement.webkitExitFullscreen()

  toggleAudio: ->
    el = @$el.find('#toggle-audio')
    el.toggleClass('muted fa-microphone-slash fa-microphone')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Microphone is #{state}")
    @model.toggleAudio()

  toggleVideo: ->
    el = @$el.find('#toggle-video')
    el.toggleClass('muted fa-video-camera fa-eye-slash')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Camera is #{state}")
    @model.toggleVideo()

  hangup: -> 
    @pc.hangup()

  scrollChat: ->
    @$el.find('#chat-messages').scrollTop(10000);

  render: ->
    @$el.html(ss.tmpl['user-one_to_one'].render())

    @$el.find('.tip').tooltip()

    adapter.reattachMediaStream @$el.find('#local')[0], $('#loopback')[0]
    setTimeout (-> $('#loopback')[0].src = ''), 500
    draggable(@$el.find('#local')[0])

    input = new MessageInput(pc: @pc)
    @$el.find('#chat-input').html(input.render().el)

    input.on 'message', (msg) =>
      message = new Message(@options.localUser.get('screen_name'), msg, 'loopback bubble')
      messages.add(message)
      @pc.sendMessage msg
      @scrollChat()

    messages = new MessagesCollection()
    chatview = new MessagesView(collection: messages)
    @$el.find('#chat-messages').html(chatview.render().el)

    @pc.on 'message', (msg) =>
      message = new Message(@model.get('peer'), msg, 'bubble')
      messages.add(message)
      @scrollChat()

    @pc.on 'remoteStreamAdded', (stream) =>
      remoteVideo = @$el.find('#remote')
      adapter.attachMediaStream remoteVideo[0], stream

    @pc.on 'remoteStreamRemoved', =>
      adapter.reattachMediaStream $('#loopback')[0], @$el.find('#local')[0]
      setTimeout (=> @remove()), 500

    @pc.on 'close', =>
      adapter.reattachMediaStream $('#loopback')[0], @$el.find('#local')[0]
      setTimeout (=> @remove()), 500

    window.beforeunload.push =>
      @pc.hangup()

    return this

module.exports = OneToOne
