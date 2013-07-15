# VMUX - Mauro Pompilio - 2013

http      = require("http")
ss        = require("socketstream")
everyauth = require("everyauth")
_         = require("underscore")
port      = process.env.PORT or 5000

environments =

  production:
    redirectHost: 'http://vmux.co'
    redisUrl:     process.env.REDISTOGO_URL

  development:
    redirectHost: "http://localhost:#{port}"
    redisUrl:     'redis://localhost:6379'

env = environments[ss.env]

#ss.session.store.use('redis', {url: env.redisUrl})

# Define a single-page client called 'main'
ss.client.define "main",
  view: "app.jade"
  css: ["libs", "app.styl"]
  code: ["libs", "app"]
  tmpl: "*"

# Serve this client on the root URL
ss.http.route "/", (req, res) ->
  res.serveClient "main"

# Code Formatters
ss.client.formatters.add require("ss-coffee")
ss.client.formatters.add require("ss-jade")
ss.client.formatters.add require("ss-stylus")

# Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use require("ss-hogan")

# Minimize and pack assets if you type: SS_ENV=production node app.js
ss.client.packAssets()  if ss.env is "production"

twitterCallback = (session, accessToken, accessTokenSecret, twitterUserMetadata) ->
  session.userId  = twitterUserMetadata.screen_name
  session.avatar  = twitterUserMetadata.profile_image_url_https
  session.name    = twitterUserMetadata.name
  session.save()
  true

everyauth.twitter
  .consumerKey(process.env.TW_KEY)
  .consumerSecret(process.env.TW_SECRET)
  .findOrCreateUser(twitterCallback)
  .redirectPath env.redirectHost + '/welcome'

ss.http.middleware.prepend ss.http.connect.bodyParser()
ss.http.middleware.append everyauth.middleware()

# Start web server
server = http.Server(ss.http.middleware)
server.listen port

# Force polling (damn you Heroku!)
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
