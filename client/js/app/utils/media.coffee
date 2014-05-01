$ = require('jquery')
Backbone = require('backbone')
_        = require('underscore')

adapter = require('./adapter.coffee')

class Media
  constructor: (constraints) ->
    _.extend @, Backbone.Events

    media_constraints = constraints || {audio: true, video: true}

    #media_constraints = 
    #  audio: true
    #  video: 
    #    mandatory: 
    #      minWidth:     "640"
    #      maxWidth:     "1280"
    #      minHeight:    "480"
    #      maxHeight:    "720"
    #      minFrameRate: "30" 

    onUserMediaSuccess = (stream) =>
      console.debug '[Media success]'
      window.localStream = stream
      @trigger 'success', stream

    onUserMediaError = (error) =>
      @trigger 'error', "Can't access media."
      console.debug '[Media error]'

    adapter.getUserMedia media_constraints, onUserMediaSuccess, onUserMediaError

module.exports = Media
