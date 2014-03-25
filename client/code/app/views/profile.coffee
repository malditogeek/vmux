adapter  = require('/utils/adapter')
PC       = require('/utils/peer_connection')
Media    = require('/utils/media')

User    = require('/models/user')
Stream  = require('/models/stream')
Sidebar = require('/views/sidebar')

OneToOne    = require('./one_to_one')

class Profile extends Backbone.View
  id: 'profile'

  events:
    'click .call' : 'call'

  call: ->
    ss.rpc 'vmux.request_call', @options.profile_user.get('uuid')
    @$el.find('.call').text('Calling...')
    @$el.find('.call').attr('disabled','disabled')

  render: ->
    @$el.html(ss.tmpl['layout-profile'].render(@options.profile_user.toJSON()))

    sidebar = new Sidebar(model: @model)
    @$el.find('#navbar').html(sidebar.render().el)

    ss.event.on 'call.rejected', =>
      @$el.find('.call').text('Busy')

    @requestMedia()
    return this

  requestMedia: ->
    media = new Media

    media.on 'success', (stream) =>
      @model.ready()
      @$el.find('.call').fadeIn()

      adapter.attachMediaStream @$el.find('#loopback')[0], stream

    ss.event.on 'signal', (peer, msg) =>
      switch msg.type
        when 'offer'
          pc = @peercon(peer, msg)
          pc.processOffer(msg)
          @renderStream(peer, pc)
        when 'answer'
          @peercon().processAnswer(msg)
        when 'candidate'
          @peercon().addCandidate(msg)
        when 'bye'
          @peercon().close()

  renderStream: (peer, pc) ->
    stream = new Stream(peer, pc)
    one_to_one = new OneToOne(model: stream, localUser: @model)
    @$el.find('#conversation').html(one_to_one.render().el)
    @$el.find('#conversation').fadeIn()

  peercon: (uuid, opts) ->
    return @pc if @pc

    @pc = new PC(uuid, opts)
    @pc.attachLocalStream(localStream)

    @pc.on 'open', =>
      @$el.find('#container').fadeOut()
      @$el.find('#bgvideo').fadeOut()

    @pc.on 'close', =>
      @pc = undefined
      @$el.find('#container').fadeIn()
      @$el.find('#bgvideo').fadeIn()
      @$el.find('.call').text('Call')
      @$el.find('.call').removeAttr('disabled')

    return @pc

module.exports = Profile
