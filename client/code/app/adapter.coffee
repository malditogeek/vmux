# This function is used for logging.
exports.trace = (text) ->
  text = text.substring(0, text.length - 1)  if text[text.length - 1] is "\n"
  console.log (performance.now() / 1000).toFixed(3) + ": " + text

if navigator.mozGetUserMedia
  console.log "This appears to be Firefox"
  webrtcDetectedBrowser = "firefox"
  
  # The RTCPeerConnection object.
  RTCPeerConnection = mozRTCPeerConnection
  
  # The RTCSessionDescription object.
  RTCSessionDescription = mozRTCSessionDescription
  
  # The RTCIceCandidate object.
  RTCIceCandidate = mozRTCIceCandidate
  
  # Get UserMedia (only difference is the prefix).
  # Code from Adam Barth.
  getUserMedia = navigator.mozGetUserMedia.bind(navigator)
  
  # Creates Turn Uri with new turn format.
  createIceServer = (turn_url, username, password) ->
    iceServer =
      url: turn_url
      credential: password
      username: username

    iceServer

  
  # Attach a media stream to an element.
  attachMediaStream = (element, stream) ->
    console.log "Attaching media stream"
    element.mozSrcObject = stream
    element.play()

  reattachMediaStream = (to, from) ->
    console.log "Reattaching media stream"
    to.mozSrcObject = from.mozSrcObject
    to.play()

  
  # Fake get{Video,Audio}Tracks
  MediaStream::getVideoTracks = ->
    []

  MediaStream::getAudioTracks = ->
    []
else if navigator.webkitGetUserMedia
  console.log "This appears to be Chrome"
  webrtcDetectedBrowser = "chrome"
  webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2])
  
  # For pre-M28 chrome versions use old turn format, else use the new format.
  if webrtcDetectedVersion < 28
    createIceServer = (turn_url, username, password) ->
      iceServer =
        url: "turn:" + username + "@" + turn_url
        credential: password

      iceServer
  else
    createIceServer = (turn_url, username, password) ->
      iceServer =
        url: turn_url
        credential: password
        username: username

      iceServer
  
  # The RTCPeerConnection object.
  RTCPeerConnection = webkitRTCPeerConnection
  
  # Get UserMedia (only difference is the prefix).
  # Code from Adam Barth.
  getUserMedia = navigator.webkitGetUserMedia.bind(navigator)
  
  # Attach a media stream to an element.
  attachMediaStream = (element, stream) ->
    if typeof element.srcObject isnt "undefined"
      element.srcObject = stream
    else if typeof element.mozSrcObject isnt "undefined"
      element.mozSrcObject = stream
    else if typeof element.src isnt "undefined"
      element.src = URL.createObjectURL(stream)
    else
      console.log "Error attaching stream to element."

  reattachMediaStream = (to, from) ->
    to.src = from.src

  
  # The representation of tracks in a stream is changed in M26.
  # Unify them for earlier Chrome versions in the coexisting period.
  unless webkitMediaStream::getVideoTracks
    webkitMediaStream::getVideoTracks = ->
      @videoTracks

    webkitMediaStream::getAudioTracks = ->
      @audioTracks
  
  # New syntax of getXXXStreams method in M26.
  unless webkitRTCPeerConnection::getLocalStreams
    webkitRTCPeerConnection::getLocalStreams = ->
      @localStreams

    webkitRTCPeerConnection::getRemoteStreams = ->
      @remoteStreams
else
  console.log "Browser does not appear to be WebRTC-capable"

exports.RTCPeerConnection     = RTCPeerConnection     
exports.RTCSessionDescription = RTCSessionDescription || window.RTCSessionDescription
exports.RTCIceCandidate       = RTCIceCandidate       || window.RTCIceCandidate
exports.getUserMedia          = getUserMedia          
exports.attachMediaStream     = attachMediaStream     
exports.reattachMediaStream   = reattachMediaStream   
exports.webrtcDetectedBrowser = webrtcDetectedBrowser 
exports.webrtcDetectedVersion = webrtcDetectedVersion 
