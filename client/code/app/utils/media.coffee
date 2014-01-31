adapter = require('./adapter')

window.localStream = null;

class Media
  constructor: (constraints) ->
    _.extend @, Backbone.Events

    media_constraints = constraints || {audio: true, video: true}

    onUserMediaSuccess = (stream) =>
      window.localStream = stream
      @trigger 'success', stream

    onUserMediaError = (error) =>
      @trigger 'error', "Can't access media."
      console.debug 'Media error'

    adapter.getUserMedia media_constraints, onUserMediaSuccess, onUserMediaError

module.exports = Media
