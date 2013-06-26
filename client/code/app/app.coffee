localStream     = undefined
remoteStream    = undefined
pc              = undefined
started         = false
sdpConstraints  = {mandatory: {OfferToReceiveAudio: true, OfferToReceiveVideo: true}}

localVideo  = undefined
miniVideo   = undefined
remoteVideo = undefined

## Signaling

ss.event.on 'signaling', (caller, msg) ->
  console.log "[signaling S->C] #{msg.type}, started: #{started}"

  switch msg.type

    when 'offer'
      #ss.rpc('vmux.state', 'busy')
      createPeerConnection(caller)
      pc.setRemoteDescription new ss.adapter.RTCSessionDescription(msg)
      pc.createAnswer setLocalAndSendMessage, null, sdpConstraints

    when 'answer'
      return if !started
      #ss.rpc('vmux.state', 'busy')
      pc.setRemoteDescription new ss.adapter.RTCSessionDescription(msg)

    when 'candidate'
      return if !started
      candidate = new ss.adapter.RTCIceCandidate
        sdpMLineIndex: msg.label
        candidate: msg.candidate
      pc.addIceCandidate candidate

    when 'bye'
      return if !started
      onRemoteHangup()

## PeerConnection

createPeerConnection = (remotePeer) ->
  return if started or not localStream

  console.log "Creating PeerConnection."
  started = true

  pc_config       = {iceServers: [{url: "stun:stun.l.google.com:19302"}]}
  pc_constraints  = {optional: [{DtlsSrtpKeyAgreement: true}]}
  
  # Force the use of a number IP STUN server for Firefox.
  if ss.adapter.webrtcDetectedBrowser is "firefox"
    pc_config = iceServers: [url: "stun:23.21.150.121"]  

  pc = new ss.adapter.RTCPeerConnection(pc_config, pc_constraints)
  pc.onicecandidate   = onIceCandidate
  pc.onaddstream      = onRemoteStreamAdded
  pc.onremovestream   = onRemoteStreamRemoved
  pc.addStream localStream
  pc.remotePeer = remotePeer

onIceCandidate = (event) ->
  if event.candidate
    sendMessage
      type:       "candidate", 
      label:      event.candidate.sdpMLineIndex, 
      id:         event.candidate.sdpMid, 
      candidate:  event.candidate.candidate

onRemoteStreamAdded = (event) ->
  console.log "Remote stream added."
  ss.adapter.reattachMediaStream  miniVideo, localVideo
  ss.adapter.attachMediaStream    remoteVideo, event.stream
  remoteStream = event.stream
  waitForRemoteVideo()

onRemoteStreamRemoved = (event) ->
  console.log "Remote stream removed."
  $('#remoteVideo').fadeOut()
  $('#miniVideo').fadeOut()
  $('#hangup').hide()


doCall = (user) ->
  constraints = {optional: [], mandatory: {MozDontOfferDataChannel: true}}

  if ss.adapter.webrtcDetectedBrowser is "chrome"
    for prop of constraints.mandatory
        delete constraints.mandatory[prop]  unless prop.indexOf("Moz") is -1

  offer_constraints = mergeConstraints(constraints, sdpConstraints)

  createPeerConnection(user)
  pc.createOffer(setLocalAndSendMessage, null, offer_constraints)

mergeConstraints = (cons1, cons2) ->
  merged = cons1
  for name of cons2.mandatory
    merged.mandatory[name] = cons2.mandatory[name]
  merged.optional.concat cons2.optional
  merged

setLocalAndSendMessage = (sessionDescription) ->
  # Set Opus as the preferred codec in SDP if Opus is present.
  sessionDescription.sdp = preferOpus(sessionDescription.sdp)
  pc.setLocalDescription sessionDescription
  sendMessage sessionDescription

sendMessage = (message) ->
  console.log "[signaling C->S]: #{message.type}"# + JSON.stringify(message)
  ss.rpc('vmux.signaling', pc.remotePeer, message)

onHangup = ->
  console.log "Hanging up."
  transitionToWaiting()
  stop()

onRemoteHangup = ->
  console.log "Session terminated."
  transitionToWaiting()
  stop()

stop = ->
  started = false
  sendMessage type: "bye"
  pc.close()  
  pc = null
  #ss.rpc('vmux.state', 'available')
  $('#call').show()
  $('#hangup').hide()

waitForRemoteVideo = ->
  # Call the getVideoTracks method via adapter.js.
  videoTracks = remoteStream.getVideoTracks()
  if videoTracks.length is 0 or remoteVideo.currentTime > 0
    transitionToActive()
  else
    setTimeout waitForRemoteVideo, 100

transitionToActive = ->
  $('#remoteVideo').fadeIn 400, ->
    $('#miniVideo').fadeIn()
    $('#hangup').show()

  setTimeout ->
    localVideo.src = ""
  , 500

transitionToWaiting = ->
  setTimeout ->
    localVideo.src = miniVideo.src
    $('#miniVideo').fadeOut 400, ->
      $('#remoteVideo').fadeOut()

    miniVideo.src = ""
    remoteVideo.src = ""
  , 500

# Set Opus as the default audio codec if it's present.
preferOpus = (sdp) ->
  sdpLines = sdp.split("\r\n")
  
  # Search for m line.
  i = 0

  while i < sdpLines.length
    if sdpLines[i].search("m=audio") isnt -1
      mLineIndex = i
      break
    i++
  return sdp  if mLineIndex is null
  
  # If Opus is available, set it as the default in m line.
  i = 0

  while i < sdpLines.length
    if sdpLines[i].search("opus/48000") isnt -1
      opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i)
      sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], opusPayload)  if opusPayload
      break
    i++
  
  # Remove CN in m line and sdp.
  sdpLines = removeCN(sdpLines, mLineIndex)
  sdp = sdpLines.join("\r\n")
  sdp


extractSdp = (sdpLine, pattern) ->
  result = sdpLine.match(pattern)
  (if (result and result.length is 2) then result[1] else null)

# Set the selected codec to the first in m line.
setDefaultCodec = (mLine, payload) ->
  elements = mLine.split(" ")
  newLine = new Array()
  index = 0
  i = 0

  while i < elements.length
    # Format of media starts from the fourth.
    newLine[index++] = payload  if index is 3 # Put target payload to the first.
    newLine[index++] = elements[i]  if elements[i] isnt payload
    i++
  newLine.join " "

# Strip CN from sdp before CN constraints is ready.
removeCN = (sdpLines, mLineIndex) ->
  mLineElements = sdpLines[mLineIndex].split(" ")
  
  # Scan from end for the convenience of removing an item.
  i = sdpLines.length - 1

  while i >= 0
    payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i)
    if payload
      cnPos = mLineElements.indexOf(payload)
      
      # Remove CN payload from m line.
      mLineElements.splice cnPos, 1  if cnPos isnt -1
      
      # Remove CN line in sdp
      sdpLines.splice i, 1
    i--
  sdpLines[mLineIndex] = mLineElements.join(" ")
  sdpLines

####
####
####

HomepageLayout = Backbone.View.extend
  el: 'body'

  render: ->
    $(@el).html(ss.tmpl['layout-homepage'].render())
    return this

WelcomeLayout = Backbone.View.extend
  el: 'body'

  render: ->
    $(@el).html(ss.tmpl['layout-welcome'].render(@model.toJSON()))
    return this

ProfileLayout = Backbone.View.extend
  el: 'body'

  render: ->
    $(@el).html(ss.tmpl['layout-profile'].render())
    return this

ProfileOwnerView = Backbone.View.extend
  initialize: ->
    @model.bind('change', this.render, this)
    self = this
    ss.event.on 'call.requested', (caller) ->
      call_receiver = new CalleeView(model: self.model, caller: caller).render().el
      if self.model.get('state') == 'ready'
        $('#intercom').html(call_receiver)
        $('#intercom').fadeIn()

  render: ->
    $(@el).html(ss.tmpl['user-profile_owner'].render(@model.toJSON()))
    return this

ProfileVisitorView = Backbone.View.extend
  initialize: ->
    @model.bind('change', this.render, this)

  render: ->
    $(@el).html(ss.tmpl['user-profile_visitor'].render(@model.toJSON()))
    if @model.get('state') == 'ready'
      $('#intercom').html(new CallerView(model: @model).render().el)
      $('#intercom').fadeIn()

    return this

User = Backbone.Model.extend
  initialize: (user) ->
    @set 'id',      user.nick
    @set 'nick',    user.nick
    @set 'name',    user.name
    @set 'avatar',  user.avatar
    @set 'state',   user.state

CalleeView = Backbone.View.extend
  events:
    'click #accept' : 'accept_call'
    'click #reject' : 'reject_call'

  initialize: ->
    
  render: ->
    $(@el).html(ss.tmpl['user-call_receiver'].render(caller: this.options.caller))
    return this

  accept_call: ->
    $('#user').animate(marginTop: '20px')
    view = this
    $(@el).fadeOut 400, ->
      doCall(view.options.caller)
      this.remove()

  reject_call: ->
    ss.rpc('vmux.reject_call', this.options.caller)
    $(@el).fadeOut 400, ->
      this.remove()

  hangup: ->

CallerView = Backbone.View.extend
  events:
    'click #call' : 'call'

  initialize: ->
    ss.event.on 'call.rejected', ->
      $('#call').attr('disabled', false)
      $('#user').animate(marginTop: '150px') 

  call: ->
    $('#user').animate(marginTop: '20px')
    $('#call').hide()
    ss.rpc('vmux.request_call', @model.id)

  render: ->
    $(@el).html(ss.tmpl['user-call_emitter'].render())
    return this

AppRouter = Backbone.Router.extend
 
  routes:
    ''        : 'root'
    'welcome' : 'welcome'
    ':user'   : 'profile'

  initialize: ->

  root: ->
    new HomepageLayout().render()

  welcome: ->
    ss.adapter  = require('/adapter')

    ss.rpc 'vmux.welcome', (success, current_user) ->
      if not success
        App.navigate('/', {trigger: true}) 
        return

      new WelcomeLayout(model: new User(current_user)).render()

      onUserMediaSuccess = (stream) ->
        ss.adapter.attachMediaStream $('#localVideo')[0], stream
        $('#spinner').fadeOut 200, ->
          $('#localVideo').fadeIn ->
            $('#welcome').fadeIn()
        
      onUserMediaError = (error) ->
        $('#spinner').fadeOut 200, ->
          alert('Something went wrong. Check your Media Preferences and try again.')

      ss.adapter.getUserMedia {audio: true, video: true}, onUserMediaSuccess, onUserMediaError

  profile: (profile) ->
    ss.rpc 'vmux.connected', profile, (success, current_user, owner) ->
      if not success
        App.navigate('/', {trigger: true}) 
        return

      new ProfileLayout().render()

      ss.adapter  = require('/adapter')

      ##
      ## Profile
      ##

      if current_user.id.toLowerCase() == profile.toLowerCase()
        profile_owner = new User(current_user)
        profile_view  = new ProfileOwnerView(model: profile_owner)
      else
        profile_owner = new User(owner)
        profile_view  = new ProfileVisitorView(model: profile_owner)
      $('#user').html(profile_view.render().el)

      ##
      ## Events
      ##

      ss.event.on 'user.connected', (user, profile) ->
        console.log "user.connected: #{profile} -> #{JSON.stringify(user)}"

      ss.event.on 'user.disconnected', (user, profile) ->
        console.log "user.disconnected: #{profile} -> #{JSON.stringify(user)}"

      ss.event.on 'user.state', (state, user_id) ->
        console.log "user.state: #{state} -> #{user_id}"

      ss.event.on 'owner.connected', (user) ->
        profile_owner.set('name', user.name)
        profile_owner.set('avatar', user.avatar)

      ss.event.on 'owner.state', (state) ->
        profile_owner.set('state', state)

      window.onbeforeunload = ->
        console.log 'Closing window...'
        sendMessage type: "bye"
        ss.rpc('vmux.disconnected', profile)

      onUserMediaSuccess = (stream) ->
        ss.rpc('vmux.state', 'ready', profile)
        ss.adapter.attachMediaStream $('#localVideo')[0], stream
        $('#spinner').fadeOut(200)
        $('#localVideo').fadeIn 400, ->
          $('#profile').fadeIn()
        localStream = stream
        
      onUserMediaError = (error) ->
        $('#spinner').fadeOut 200, ->
          alert('Something went wrong. Check your Media Preferences and try again.')

      ss.adapter.getUserMedia {audio: true, video: true}, onUserMediaSuccess, onUserMediaError

      $('#hangup').on('click', onHangup)
      
      localVideo  = $('#localVideo')[0]
      miniVideo   = $('#miniVideo')[0]
      remoteVideo = $('#remoteVideo')[0]


window.App = new AppRouter()
Backbone.history.start({pushState: true})
