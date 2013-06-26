_ = require('underscore')

U = {}

findUser = (session) ->
  if !U[session.userId]
    user = 
      id:     session.userId
      nick:   session.userId
      name:   session.name
      avatar: session.avatar
      state:  'connecting'

    U[session.userId] = user

  return U[session.userId]

exports.actions = (req, res, ss) ->

  req.use('session')
  req.use('user.authenticated')

  welcome: ->
    user = findUser(req.session)
    res(true, user)

  connected: (profile) ->
    user = findUser(req.session)

    user  = U[req.session.userId]
    owner = U[profile]

    req.session.channel.subscribe(profile)

    if user.id.toLowerCase() == profile.toLowerCase()
      ss.publish.channel profile, 'owner.connected', user
      ss.publish.channel profile, 'owner.state', 'connecting'

    res(true, user, owner)

  disconnected: (profile) ->
    id = req.session.userId
    U[id].state = 'offline'
      
    if id.toLowerCase() == profile.toLowerCase()
      ss.publish.channel(profile, 'owner.state', 'offline')

  state: (state, profile) ->
    id = req.session.userId
    U[id].state = state
    if req.session.userId.toLowerCase() == profile.toLowerCase()
      ss.publish.channel(profile, 'owner.state', state)
    else
      ss.publish.channel(profile, 'user.state', state)

  request_call: (callee) ->
    caller = req.session.userId
    ss.publish.user callee, 'call.requested', caller

  reject_call: (callee) ->
    ss.publish.user callee, 'call.rejected'

  signaling: (callee, message) ->
    caller = req.session.userId
    console.log "#{caller} -> #{callee} - #{message.type}"
    ss.publish.user callee, 'signaling', caller, message

