$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

adapter  = require('../utils/adapter.coffee')

class OneToOne extends Backbone.View
  id: 'one-to-one'

  initialize: ->
    @audio = true
    @video = true
    @fullscreen = false

  events:
    'click #hangup': 'hangup'
    'click #toggle-audio': 'toggleAudio'
    'click #toggle-video': 'toggleVideo'
    'click #toggle-fullscreen': 'toggleFullscreen'

  toggleFullscreen: ->
    if @fullscreen then @exitFullscreen else @enterFullscreen

  enterFullscreen:  ->
    @fullscreen = true
    document.documentElement.webkitRequestFullscreen()

  exitFullscreen: ->
    @fullscreen = false
    document.documentElement.webkitExitFullscreen()

  toggleAudio: ->
    @model.toggleAudio()
    el = @$el.find('#toggle-audio')
    el.toggleClass('muted fa-microphone-slash fa-microphone')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Microphone is #{state}")
    @$el.find('.tip').tooltip('hide')

  toggleVideo: ->
    @model.toggleVideo()
    el = @$el.find('#toggle-video')
    el.toggleClass('muted fa-video-camera fa-eye-slash')
    state = if el.hasClass('muted') then 'OFF' else 'ON'
    el.attr('data-original-title', "Camera is #{state}")
    @$el.find('.tip').tooltip('hide')

  hangup: -> 
    @model.videochannel.disconnect()

  render: ->
    @$el.html(Templates['user/one_to_one'].render())

    @$el.find('.tip').tooltip()

    # Attach local video
    #adapter.reattachMediaStream @$el.find('#local')[0], $('#loopback')[0]
    adapter.attachMediaStream @$el.find('#local')[0], localStream

    # Attach remote video
    adapter.attachMediaStream @$el.find('#remote')[0], @model.remoteVideoStream

    # Re-attach video bg, needed for FF
    #@model.on 'video:disconnected', =>
    #  adapter.reattachMediaStream $('#loopback')[0], @$el.find('#local')[0]

    return this

module.exports = OneToOne
