class Stream extends Backbone.Model
  initialize: (peer, pc, opts) ->

    @set 'id',    peer
    @set 'peer',  peer
    @set 'pc',    pc

    if opts
      @set 'local', opts.local

    @pc = pc
    @audio = true
    @video = true

  toggleAudio: ->
    if @audio then @muteAudio() else @unmuteAudio()

  toggleVideo: ->
    if @video then @muteVideo() else @unmuteVideo()

  muteVideo: ->
    @video = false
    @pc.muteVideo() if @pc

  unmuteVideo: ->
    @video = true
    @pc.unmuteVideo() if @pc

  muteAudio: ->
    @audio = false
    @pc.muteAudio() if @pc

  unmuteAudio: ->
    @audio = true
    @pc.unmuteAudio() if @pc

module.exports = Stream
