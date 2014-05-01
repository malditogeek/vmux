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

class Profile extends Backbone.View
  id: 'profile'

  initialize: (options) ->
    @model = options.model
    @profile_user = options.profile_user
    @sse = new ServerSentEvents("profile-#{@profile_user.get('id')}")

  render: ->
    @$el.html(Templates['layout/profile'].render(@profile_user.toJSON()))

    user = new User(@profile_user.toJSON(), parent: @model, active: false)
    @$el.find('#singleuser').html(new UserView(model: @profile_user).render().el)

    sidebar = new Sidebar(model: @model)
    @$el.find('#navbar').html(sidebar.render().el)

    @sse.on 'otr', (msg) =>
      console.debug '[OTR]', msg
      @profile_user.otr.receiveMsg(msg.body)

    @sse.on 'signal', (msg) =>
      console.debug "[IN] #{msg.type}"

    return this

module.exports = Profile
