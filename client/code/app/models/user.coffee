class User extends Backbone.Model
  initialize: (user) ->
    @set 'id',      user.id
    @set 'name',    user.screen_name
    @set 'avatar',  user.profile_image_url_https || '/user.png'
    @set 'state',   user.state || 'connecting'
    @set 'uuid',    user.uuid # user.screen_name.toLowerCase()

    window.beforeunload.push =>
      @offline()

  ready: ->
    ss.rpc 'vmux.state', 'ready'

  offline: ->
    ss.rpc 'vmux.state', 'offline'

module.exports = User
