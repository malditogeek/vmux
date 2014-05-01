$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $

DSA = require('../vendor/otr/index.js').DSA
OTR = require('../vendor/otr/index.js').OTR

[DPC, VPC, APC] = require('../utils/peer_connection.coffee')

#UUID = require('node-uuid')
crypto = require('crypto')

class User extends Backbone.Model
  urlRoot: '/user'

  initialize: (attributes, options) ->
    console.debug 'User created: ', attributes.id

    @active = false
    @options = options || {}
    @conns = {}

    # TODO Do something? tell the user keys are being generated?
    key = localStorage.getItem 'vmuxdsa'
    if key 
      key = DSA.parsePrivate(key)
    else
      key = new DSA()
      localStorage.setItem 'vmuxdsa', key.packPrivate()

    @otr = new OTR priv: key
    @otr.REQUIRE_ENCRYPTION = true

    # TODO use FQDN for node-webkit, chrome-apps
    @otr.on 'io', (msg, meta) =>
      $.post '/otr/' + @.id, {payload: {src: @options.parent.id, body: msg}}

    @otr.on 'ui', (msg, encrypted) =>
      msg = JSON.parse(msg)
      console.debug '[sig in]', msg.uuid, msg.signal.type

      switch msg.signal.type
        when 'offer'
          pc = @newConnection msg.connType, msg.uuid, true
          pc.processOffer(msg.signal)
        when 'answer'
          pc = @conns[msg.uuid]
          pc.processAnswer(msg.signal) if pc
        when 'candidate'
          pc = @conns[msg.uuid]
          pc.addCandidate(msg.signal) if pc
        when 'bye'
          pc = @conns[msg.uuid]
          pc.close() if pc

    @otr.on 'status', (state) =>
      switch state
        when OTR.CONST.STATUS_AKE_SUCCESS
          console.debug '[OTR] Handhsake successful'
          if @active
            pc = @newConnection 'data'
            pc.initiate()

  handshake: ->
    @active = true
    @otr.sendQueryMsg()

  # TODO use FQDN for node-webkit, chrome-apps
  pingback: (res) ->
    console.debug '[pingback] ', res
    req = =>
      msg = {type: "online-#{res}", src: @options.parent.toJSON()}
      $.post '/signal/' + @.id, {msg: msg}

    setTimeout req, 500

  # TODO use FQDN for node-webkit, chrome-apps
  ack: (res) ->
    console.debug '[ack] ', res
    req = =>
      msg = {type: "online-#{res}", src: @options.parent.toJSON()}
      $.post '/s/ack/' + @.id, {msg: msg}

    setTimeout req, 500


  # WebRTC signaling is done using OTR
  signal: (msg) ->
    console.debug '[sig out]', msg.uuid, msg.signal.type
    msg.src = @options.parent.toJSON()
    @otr.sendMsg JSON.stringify(msg)

  stopLocalStream: ->
    s = window.localStream
    s.getAudioTracks().forEach (track) ->
      track.stop()
    s.getVideoTracks().forEach (track) ->
      track.stop()
    window.localStream = null

  newConnection: (type, uuid, passive) ->
    # Could be using the type too but limits it to 3 types of conn per user
    uuid    = uuid || crypto.randomBytes(4).toString('hex') # UUID.v1()
    passive = passive || false

    switch type
      when 'data'
        pc = new DPC(uuid, @, passive, @options.parent)
        pc.on 'datachannelopen', => 
          @trigger 'data:ready', @
        pc.on 'datachannelclose', => 
          @trigger 'data:disconnected', @
        pc.on 'disconnected', =>
          @trigger 'data:disconnected', @
        @conns[uuid] = pc
        @datachannel = pc
        return pc

      when 'video'
        pc = new VPC(uuid, @, @options.parent)
        pc.attachLocalStream(localStream)
        pc.on 'remoteStreamAdded', (videoStream) =>
          @remoteVideoStream = videoStream
          @trigger 'video:ready', @, videoStream
        pc.on 'remoteStreamRemoved', =>
          @remoteVideoStream = null
          @trigger 'video:disconnected'
        pc.on 'disconnected', =>
          @trigger 'video:disconnected'
          @stopLocalStream()
        @conns[uuid] = pc
        @videochannel = pc
        return pc

      when 'audio'
        pc = new APC(uuid, @, @options.parent)
        pc.attachLocalStream(localStream)
        pc.on 'remoteStreamAdded', (stream) =>
          @remoteAudioStream = stream
          @trigger 'audio:ready', @, stream
        pc.on 'remoteStreamRemoved', =>
          @remoteAudioStream = null
          @trigger 'audio:disconnected'
        pc.on 'disconnected', =>
          @trigger 'audio:disconnected'
          @stopLocalStream()
        @conns[uuid] = pc
        @audiochannel = pc
        return pc


  requestVideocall: ->
    msg = type: 'requestVideo'
    @datachannel.sendMessage msg

  requestAudiocall: ->
    msg = type: 'requestAudio'
    @datachannel.sendMessage msg

  offerVideo: ->
    msg = type: 'videoOffer'
    @datachannel.sendMessage msg

  sendChat: (msg) ->
    @datachannel.sendMessage {type: 'message', body: msg}

  disconnect: ->
    Object.keys(@conns).forEach (uuid) =>
      @conns[uuid].disconnect()

  toggleAudio: ->
    Object.keys(@conns).forEach (uuid) =>
      c = @conns[uuid]
      c.toggleAudio() if c.connType.match /audio|video/

  toggleVideo: ->
    Object.keys(@conns).forEach (uuid) =>
      c = @conns[uuid]
      c.toggleVideo() if c.connType == 'video'

module.exports = User
