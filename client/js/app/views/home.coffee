$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

User    = require('../models/user.coffee')
Sidebar = require('./sidebar.coffee')
UserView = require('./user_view.coffee')

ServerSentEvents = require('../utils/sse.coffee')

class Users extends Backbone.Collection
  model: User

class Roster extends Backbone.View
  initialize: ->
    @views = {}

    @collection.bind "add", (user) =>
      $('#placeholder').hide()
      @views[user.id] = new UserView(model: user)
      @$el.append(@views[user.id].render().el)

    @collection.bind "remove", (user) =>
      @views[user.id].remove()

  render: ->
    return this

class Home extends Backbone.View
  id: 'home'

  initialize: ->
    @sse = new ServerSentEvents('home', @model.id)

  render: ->
    @$el.html(Templates['layout/home'].render({user: @model.toJSON(), host: ENV.host}))

    sidebar = new Sidebar(model: @model)
    @$el.find('#navbar').html(sidebar.render().el)

    online_users = new Users()
    roster = new Roster(collection: online_users)
    @$el.find('#roster').html(roster.render().el)

    @sse.on 'home', (msg) =>
      _user = online_users.get(msg.src.id)
      online_users.remove(_user) if _user
      user = new User(msg.src, parent: @model)
      online_users.add(user)
      user.ack('home')

    @sse.on 'ack', (msg) =>
      _user = online_users.get(msg.src.id)
      online_users.remove(_user) if _user
      user = new User(msg.src, parent: @model)
      online_users.add(user)
      user.handshake()

    @sse.on "profile-#{@model.id}", (msg) =>
      _user = online_users.get(msg.src.id)
      online_users.remove(_user) if _user
      user = new User(msg.src, parent: @model)
      online_users.add(user)
      user.handshake()

    @sse.on 'otr', (msg) =>
      user = online_users.get(msg.src)
      user.otr.receiveMsg(msg.body)

      user.on 'data:disconnected', =>
        online_users.remove(user)

    window.beforeunload.push =>
      online_users.forEach (user) ->
        user.disconnect()

    return this

module.exports = Home
