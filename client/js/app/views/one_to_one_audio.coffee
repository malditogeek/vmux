$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

adapter  = require('../utils/adapter.coffee')

class OneToOneAudio extends Backbone.View
  events:
    'click .hangup': 'hangup'

  hangup: ->
    @model.audiochannel.disconnect()

  render: ->
    @$el.html(Templates['user/one_to_one_audio'].render(@model.toJSON()))

    # Attach remote audio
    adapter.attachMediaStream @$el.find('.stream')[0], @model.remoteAudioStream

    return this

module.exports = OneToOneAudio
