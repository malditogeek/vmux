adapter  = require('/utils/adapter')
PC       = require('/utils/peer_connection')
Media    = require('/utils/media')

User    = require('/models/user')
Stream  = require('/models/stream')
Sidebar = require('/views/sidebar')

CallRequest = require('./call_request')
OneToOne    = require('./one_to_one')

class Users extends Backbone.Collection
  model: User

class Roster extends Backbone.View
  initialize: ->
    @views = {}

    @collection.bind "add", (user) =>
      @views[user.id] = new UserView(model: user)
      @$el.append(@views[user.id].render().el)

    @collection.bind "remove", (user) =>
      @views[user.id].remove()

  render: ->
    return this

class UserView extends Backbone.View
  className: 'user'

  events:
    'click .call' : 'call'

  call: ->
    ss.rpc 'vmux.request_call', @model.get('uuid')
    @$el.find('.call').text('Connecting...')
    @$el.find('.call').attr('disabled','disabled')

  render: ->
    @$el.html(ss.tmpl['user-detail'].render(@model.toJSON()))

    ss.event.on 'call.rejected', =>
      @$el.find('.call').text('Busy')

    if localStream
      @$el.find('.call').fadeIn()

    return this

class Home extends Backbone.View
  id: 'home'

  initialize: ->

  render: ->
    @$el.html(ss.tmpl['layout-home'].render(@model.toJSON()))

    sidebar = new Sidebar(model: @model)
    @$el.find('#sidebar').html(sidebar.render().el)

    online_users = new Users()
    roster = new Roster(collection: online_users)
    @$el.find('#roster').html(roster.render().el)

    ss.event.on 'user:online', (user_data) =>
      user = new User(user_data)
      online_users.add(user)
      ss.rpc('vmux.pingback', user.get('uuid'))

    ss.event.on 'user:pingback', (user) =>
      online_users.add(new User(user))

    ss.event.on 'user:offline', (user) =>
      online_users.remove(new User(user))

    @requestMedia()
    return this

  requestMedia: ->
    media = new Media

    media.on 'success', (stream) =>
      @model.ready()
      @$el.find('.call').fadeIn()

      adapter.attachMediaStream @$el.find('#loopback')[0], stream

      ss.event.on 'call.request', (contact_data) =>
        contact = new User(contact_data)
        call_request = new CallRequest(model: contact)
        $('body').append(call_request.render().el)

        call_request.on 'accepted', (contact) =>
          @connect(contact)

        call_request.on 'rejected', (contact) =>
          @reject(contact)

      ss.event.on 'signal', (peer, msg) =>
        switch msg.type
          when 'offer'
            pc = @peercon(peer, true)
            pc.processOffer(msg)
            @renderStream(peer, pc)
          when 'answer'
            @peercon().processAnswer(msg)
          when 'candidate'
            @peercon().addCandidate(msg)
          when 'bye'
            @peercon().close()


    media.on 'error', =>
      console.debug 'Request to access media denied.'


  connect: (contact) ->
    uuid = contact.get('uuid')
    pc = @peercon(uuid)
    @renderStream(uuid, pc)
    pc.initiate()

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
      @$el.find('#container').fadeIn()
      @$el.find('#bgvideo').fadeIn()
      @$el.find('.call').text('Call')
      @$el.find('.call').removeAttr('disabled')
      @pc = undefined

    return @pc

  reject: (contact) ->
    ss.rpc 'vmux.reject_call', contact.get('uuid')

module.exports = Home
