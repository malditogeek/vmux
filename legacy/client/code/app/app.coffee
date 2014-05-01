User    = require('/models/user')

Landing = require('/views/landing')
Home    = require('/views/home')
Profile = require('/views/profile')
Room    = require('/views/room')

window.beforeunload = []

warnOnReload = ->
  window.onbeforeunload = =>
    window.beforeunload.forEach (fn) =>
      fn()

class AppRouter extends Backbone.Router
 
  routes:
    ''          : 'landing'
    'home'      : 'home'
    ':user'     : 'profile'
    'room/:id'  : 'room'

  landing: ->
    landing = new Landing()
    $('body').html(landing.render().el)

  home: ->
    ss.rpc 'vmux.home', (loggedIn, current_user, owner) ->
      return App.navigate('/', {trigger: true}) if not loggedIn

      user = new User(current_user)
      window.home = new Home(model: user)
      $('body').html(window.home.render().el)

      warnOnReload()

  profile: (profile) ->
    ss.rpc 'vmux.profile', profile, (loggedIn, current_user, profile_data) ->
      return App.navigate('/', {trigger: true}) if not loggedIn

      if current_user.screen_name.toLowerCase() == profile.toLowerCase()
        return App.navigate('/home', {trigger: true}) 

      user          = new User(current_user)
      profile_user  = new User(profile_data)
      profile = new Profile(model: user, profile_user: profile_user)
      $('body').html(profile.render().el)

      warnOnReload()

  room: (room_name) ->
    ss.rpc 'vmux.room', room_name, (loggedIn, current_user) ->
      return App.navigate('/', {trigger: true}) if not loggedIn

      user = new User(current_user)
      room = new Room(model: user, room_name: room_name)
      $('body').html(room.render().el)

      warnOnReload()

window.App = new AppRouter()
Backbone.history.start(pushState: true)
window.scrollTo(0,1)
