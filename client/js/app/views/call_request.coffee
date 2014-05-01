$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

Media    = require('../utils/media.coffee')

class CallRequest extends Backbone.View
  initialize: (options) ->
    @options = options || {}

  events:
    'click .accept' : 'accept_call'
    'click .reject' : 'reject_call'

  render: ->
    @$el.html(Templates['user/call_request'].render(
      user: @model.toJSON(),
      type: @options.type
    ))
    @$el.find('.call-request').modal(backdrop: false, keyboard: false)

    switch @options.type
      when 'video'
        media = new Media(audio: true, video: true)
      when 'audio'
        media = new Media(audio: true, video: false)

    media.on 'success', =>
      @$el.find('.accept').fadeIn()
      @$el.find('.reject').fadeIn()

    return this

  accept_call: ->
    @trigger 'accepted', @model
    @$el.find('.call-request').modal('hide')
    @$el.find('.call-request').on 'hidden.bs.modal', =>
      @remove()

  reject_call: ->
    @trigger 'rejected', @model
    @$el.find('.call-request').modal('hide')
    @$el.find('.call-request').on 'hidden.bs.modal', =>
      @remove()

module.exports = CallRequest
