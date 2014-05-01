express   = require 'express'
everyauth = require 'everyauth'
Redis     = require 'redis'
helmet    = require 'helmet'
crypto    = require 'crypto'

twitterAuth = require './twitter-auth'

env   = require('./environments')[process.env.NODE_ENV || 'development']
redis = Redis.createClient(env.redis.port, env.redis.host)

RedisStore    = require('connect-redis')(express);
sessionStore  = new RedisStore client: redis

redisClientPool = {}

# Helper used by the SSE
findOrCreateRedisPubSub = (uuid, userId) ->
  client = redisClientPool[uuid]
  
  if !client
    client = Redis.createClient(env.redis.port, env.redis.host)
    client.smembers "friends:#{uuid}", (err, user_ids) ->
      client.subscribe "channel:#{id}" for id in user_ids
    client.subscribe "user:#{userId}"
    redisClientPool[uuid] = client
  
  return client

cookieSecret = process.env.COOKIE_SECRET || 'correctstaplehorse'

app = express()
app.use helmet.defaults()
app.set 'view engine', 'jade'
app.use express.static(__dirname + '/static')
app.use express.favicon()
app.use express.json()
app.use express.urlencoded()
app.use express.cookieParser(cookieSecret)
app.use express.session
  store: sessionStore
  secret: cookieSecret
  cookie:
    path:     '/'
    httpOnly: true
    domain:   env.cookies.domain
    secure:   env.cookies.secure

everyauth.twitter
  .consumerKey(env.twitter.consumer_key)
  .consumerSecret(env.twitter.consumer_secret)
  .handleAuthCallbackError(twitterAuth.errback)
  .findOrCreateUser(twitterAuth.callback)
  .redirectPath('/auth/success')

app.use everyauth.middleware()

# Helper
findUserById = (userId, callback) ->
  redis.get "user:#{userId}", (err, json) ->
    return callback(err, null) if err
    user = JSON.parse(json)
    callback(null, user)

# Helper
findUserByName = (name, callback) ->
  redis.get "lookup:#{name.toLowerCase()}", (err, uuid) ->
    return callback(err, null) if err
    findUserById uuid, callback

# Everyauth helper, allows to use req.user
everyauth.everymodule.findUserById (userId, callback) ->
  findUserById userId, callback

# Middleware
authenticate = (req, res, next) ->
  if req.session.auth then next() else res.send 403

# Guest/anonymous login
app.get "/auth/guest", (req, res) ->
  uuid = crypto.randomBytes(4).toString('hex')
  screen_name = req.query.name || 'Guest'

  user = 
    id: uuid
    uuid: uuid
    screen_name: screen_name
    profile_image_url_https: '/user.png'
    guest: true

  req.session.auth =
    loggedIn: true
    userId: uuid
    guest:
      user: user

  expiry = 60 * 60 * 24
  redis.setex "user:#{uuid}",   expiry, JSON.stringify(user)
  redis.setex "lookup:#{uuid}", expiry, uuid

  res.redirect '/auth/success'

app.get '/auth/success', (req, res) ->
  if req.session.redirectTo
    res.redirect req.session.redirectTo
    delete req.session.redirectTo
  else
    res.redirect '/home'

app.get '/', (req, res) ->
  if req.loggedIn then res.redirect '/home' else res.render 'landing'

app.get '/user/current', authenticate, (req, res) ->
  res.send req.user

app.get '/user/:name', authenticate, (req, res) ->
  findUserByName req.params.name, (err, user) ->
    res.send user

# FIXME will the user always receive this messages no matter in what resource it is?
# is this good or bad?
app.post '/otr/:id', authenticate, (req, res) ->
  console.log '[OTR]', req.params.id
  msg = {event: 'otr', payload: req.body.payload}
  redis.publish "user:#{req.params.id}", JSON.stringify(msg)
  res.send 200

# Online used by the 'online' signal now...
app.post '/signal/:id', authenticate, (req, res) ->
  console.log '[signal]', req.body.msg.src.id, '>', req.params.id
  msg = {event: 'signal', payload: req.body.msg}
  redis.publish "user:#{req.params.id}", JSON.stringify(msg)
  res.send 200

# TODO add whitelist of events?
app.post '/s/:evt/:id', authenticate, (req, res) ->
  console.log '[s]', req.params.evt, req.params.id
  msg = {event: req.params.evt, payload: req.body.msg}
  redis.publish "user:#{req.params.id}", JSON.stringify(msg)
  res.send 200
 
app.get '/sse/:res', authenticate, (req, res) ->
  console.log "[SSE] #{req.params.res}"

  req.socket.setTimeout(Infinity);
  res.writeHead 200, 
    'Content-Type'  : 'text/event-stream'
    'Cache-Control' : 'no-cache'
    'Connection'    : 'keep-alive'

  # Heartbeat
  nln = -> res.write('\n')
  nln()
  hbt = setInterval nln, 15000

  messageHandler = (topic, data) ->
    msg = JSON.parse(data)
    res.write "retry: 500\n"
    res.write "event: #{msg.event}\n"
    res.write "data: #{JSON.stringify(msg.payload)}\n\n"

  # Get the redis client for this user from the pool
  r = findOrCreateRedisPubSub(req.user.uuid, req.user.id)
  r.on 'message', messageHandler

  msg = {event: req.params.res, payload: {type: 'connected', src: req.user}}
  if req.params.res.match(/profile/)
    profile_id = req.params.res.split('-')[1]
    redis.publish "user:#{profile_id}", JSON.stringify(msg)
  else
    redis.publish "channel:#{req.user.id}", JSON.stringify(msg)

  # FIXME
  # if req.params.res == 'room' then r.subscribe "room:#{req.params.id}"

  # Clear heartbeat and listener
  req.on 'close', =>
    clearInterval hbt
    r.unsubscribe "room:#{req.params.id}"
    r.removeListener 'message', messageHandler

# Backbone path
app.get '/home', (req, res) ->
  if req.loggedIn then res.render 'app' else res.redirect '/'

# Backbone path
app.get '/room/:roomName', (req, res) ->
  if req.loggedIn
    res.render 'app'
  else
    req.session.redirectTo = "/room/#{req.params.id}"
    res.redirect '/'

# Backbone path
app.get '/:profile', (req, res) ->
  if req.loggedIn
    res.render 'app'
  else
    req.session.redirectTo = req.params.profile
    res.redirect '/'

app.listen env.port
