_     = require('underscore')
Redis = require('redis')

redis = Redis.createClient()

findUser = (id, cb) ->
  redis.get "user:#{id}", (err, user_json) ->
    cb JSON.parse(user_json)

lookupProfile = (nick, cb) ->
  redis.get "lookup:#{nick}", (err, uuid) ->
    cb(uuid);

exports.actions = (req, res, ss) ->
  req.use('session')
  req.use('user.authenticated')

  home: ->
    findUser req.session.userId, (user) ->

      if not req.session.subscribed
        redis.smembers "friends:#{req.session.userId}", (err, user_ids) =>
            req.session.channel.subscribe(id) for id in user_ids
            req.session.subscribed = true
            req.session.save()

      ss.publish.channel user.id, 'user:online', user

      res(true, user)

  profile: (profile) ->
    lookupProfile profile.toLowerCase(), (uuid) ->
      if not uuid
        res(false)
        return

      findUser uuid, (profile_user) ->
        req.session.channel.subscribe(profile_user.id)
        findUser req.session.userId, (current_user) ->
          res(true, current_user, profile_user)

  room: (room_name) ->
    findUser req.session.userId, (user) ->
      req.session.channel.subscribe room_name
      res(user)

  # State propagation

  state: (state) ->
    findUser req.session.userId, (user) ->
      ss.publish.channel user.id, "user:#{state}", user

  # WebRTC signaling

  signal: (callee, message) ->
    caller = req.session.userId
    findUser req.session.userId, (user) ->
      ss.publish.user callee, 'signal', caller, message, user

  # Call handling

  request_call: (callee_id) ->
    findUser req.session.userId, (caller) ->
      ss.publish.user callee_id, 'call.request', caller

  reject_call: (callee_id) ->
    ss.publish.user callee_id, 'call.rejected'

  # Presence

  pingback: (uuid) ->
    findUser req.session.userId, (user) ->
      ss.publish.user uuid, 'user:pingback', user

  # Groups

  ready: (id) ->
    findUser req.session.userId, (user) ->
      ss.publish.channel id, 'group.ready', user
