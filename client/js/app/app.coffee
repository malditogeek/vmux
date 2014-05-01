$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $

User    = require('./models/user.coffee')
Home    = require('./views/home.coffee')
Profile = require('./views/profile.coffee')
Room    = require('./views/room.coffee')

window.beforeunload = []
teardown = ->
  window.addEventListener 'beforeunload', =>
    window.beforeunload.forEach (fn) =>
      fn()

window.localStream = null

class AppRouter extends Backbone.Router
 
  routes:
    'home'     : 'home'
    ':user'    : 'profile'
    'room/:id' : 'room'

  home: ->
    user = new User(id: 'current')
    user.fetch success: =>
      home = new Home(model: user)
      $('body').html(home.render().el)
      teardown()

  profile: (profile) ->
    user          = new User({id: 'current'})
    profile_user  = new User({id: profile},{parent: user})
    user.fetch success: =>
      profile_user.fetch success: =>
        profile = new Profile(model: user, profile_user: profile_user)
        $('body').html(profile.render().el)
        teardown()

  room: (room_name) ->
    user = new User(id: 'current')
    user.fetch success: =>
      room = new Room(model: user, room_name: room_name)
      $('body').html(room.render().el)
      teardown()

App = new AppRouter()

$ ->
  Backbone.history.start(pushState: true)
