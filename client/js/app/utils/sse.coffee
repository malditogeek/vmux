Backbone = require('backbone')
_ = require('underscore')

class ServerSentEvents
  constructor: (resource, userId) ->
    _.extend @, Backbone.Events

    # FIXME use FQDN for node-webkit, chrome-apps
    sse_path = "/sse/#{resource}"
    console.debug '[SSE]', sse_path

    @source = new EventSource(sse_path)
    
    @source.addEventListener 'open', ->
      console.debug '[SSE opened]'
    
    @source.addEventListener 'error', (e) ->
      if e.readyState == EventSource.CLOSED
        console.debug '[SSE closed]'

    #@source.addEventListener 'signal', (evt) =>
    #  # TODO: return if evt.origin != 'vmux'
    #  console.debug "[SSE] received signal from #{evt.origin}"
    #  @trigger 'signal', JSON.parse(evt.data)

    @source.addEventListener resource, (evt) =>
      console.debug "[SSE] #{resource}"
      @trigger resource, JSON.parse(evt.data)

    ['ack', 'otr'].forEach (evtName) =>
      @source.addEventListener evtName, (evt) =>
        console.debug "[SSE] #{evtName}"
        @trigger evtName, JSON.parse(evt.data)

    if userId
      @source.addEventListener "profile-#{userId}", (evt) =>
        console.debug "[SSE] profile-#{userId}"
        @trigger "profile-#{userId}", JSON.parse(evt.data)



module.exports = ServerSentEvents
