crypto    = require 'crypto'
Twitter   = require 'ntwitter'
Redis     = require 'redis'

env   = require('./environments')[process.env.NODE_ENV || 'development']
redis = Redis.createClient(env.redis.port, env.redis.host)

twitter = new Twitter
  consumer_key:         env.twitter.consumer_key
  consumer_secret:      env.twitter.consumer_secret
  access_token_key:     env.twitter.access_token_key
  access_token_secret:  env.twitter.access_token_secret

# Twitter Auth
twitterCallback = (session, accessToken, accessTokenSecret, meta) ->
  nick = meta.screen_name.toLowerCase()
  meta.uuid = crypto.randomBytes(4).toString('hex')

  session.auth.userId = meta.uuid

  redis.set "user:#{meta.uuid}", JSON.stringify(meta)
  redis.set "lookup:#{nick}", meta.uuid
  twitter.getFriendsIds meta.id, (err, ids) ->
    redis.sadd "friends:#{meta.uuid}", ids

  return true

twitterErrback = (req, res) ->
  res.redirect '/'

module.exports =
  callback: twitterCallback 
  errback:  twitterErrback
