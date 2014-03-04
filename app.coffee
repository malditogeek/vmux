http      = require('http')
https     = require('https')
fs        = require('fs')
ss        = require('socketstream')
everyauth = require('everyauth')
UUID      = require('uuid')
Twitter   = require('ntwitter')
Redis     = require('redis')

env       = require('./environments')[ss.env]
redis = Redis.createClient(env.redis.port, env.redis.host)
ss.session.store.use 'redis', host: env.redis.host, port: env.redis.port

twitter = new Twitter
  consumer_key:         env.twitter.consumer_key
  consumer_secret:      env.twitter.consumer_secret
  access_token_key:     env.twitter.access_token_key
  access_token_secret:  env.twitter.access_token_secret

# Define a single-page client
ss.client.define "vmux",
  view: "app.jade"
  css:  ["libs", "app.styl"]
  code: ["libs", "app"]
  tmpl: "*"

# Serve this client on the root URL
ss.http.route "/", (req, res) ->
  res.serveClient 'vmux'

# Code Formatters
ss.client.formatters.add require("ss-coffee")
ss.client.formatters.add require("ss-jade")
ss.client.formatters.add require("ss-stylus")

# Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use require("ss-hogan")

# Minimize and pack assets if you type: SS_ENV=production node app.js
ss.client.packAssets() if ss.env is "production"

# Twitter Auth
twitterCallback = (session, accessToken, accessTokenSecret, meta) ->
  nick = meta.screen_name.toLowerCase()
  meta.uuid = UUID.v4()

  session.userId = meta.uuid
  session.subscribed = false
  session.save()

  redis.set "user:#{meta.uuid}", JSON.stringify(meta)
  redis.set "lookup:#{nick}", meta.uuid
  twitter.getFriendsIds meta.id, (err, ids) ->
    redis.sadd "friends:#{meta.uuid}", ids

  true

twitterErrback = (req, res) ->
  res.writeHead(302, 'Location': '/')
  res.end()

everyauth.twitter
  .consumerKey(env.twitter.consumer_key)
  .consumerSecret(env.twitter.consumer_secret)
  .handleAuthCallbackError(twitterErrback)
  .findOrCreateUser(twitterCallback)
  .redirectPath('/home')

ss.http.middleware.prepend ss.http.connect.bodyParser()
ss.http.middleware.append everyauth.middleware()

# Guest login
ss.http.route "/auth/guest", (req, res) ->
  uuid = UUID.v4()

  query = req.url.match(/screen_name=(\w+)/)
  screen_name = if query then query[1] else 'Guest'

  req.session.userId = uuid
  req.session.subscribed = false
  req.session.save()

  user = {id: uuid, uuid: uuid, screen_name: screen_name, guest: true}

  expiry = 60 * 60 * 24
  redis.setex "user:#{uuid}",   expiry, JSON.stringify(user)
  redis.setex "lookup:#{uuid}", expiry, uuid

  res.writeHead(302, 'Location': '/home')
  res.end()

# Start HTTP server
server = http.Server(ss.http.middleware)
server.listen env.port

# Force polling
#ss.ws.transport.use 'engineio',
#  client: 
#    transports: ["polling"]
#    upgrade: false
#  server: 
#    transports: ["polling"]
#    allowUpgrades: false
#    pingInterval: 1000

# Start SocketStream
ss.start server
