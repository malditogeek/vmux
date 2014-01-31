module.exports =

  production:
    port: process.env.PORT or 5000

    twitter:
      consumer_key:         process.env.TW_CONSUMER_KEY
      consumer_secret:      process.env.TW_CONSUMER_SECRET
      access_token_key:     process.env.TW_TOKEN
      access_token_secret:  process.env.TW_TOKEN_SECRET

    redis:
      host: 'localhost'
      port: 6379

  development:
    port: process.env.PORT or 5000

    twitter:
      consumer_key:         'k264s29HzzLOLkbjSxwgKQ'
      consumer_secret:      'IpeJIGL2Srjk1nSGu3krbNcIXnV1F88jYP8O4het9k'
      access_token_key:     '17229194-cylHaTvAuCotYLRtOqDKQSQ8QfzapoGLupBqIVuy0'
      access_token_secret:  '4YHi2NH5W6xs9hdwDkmqPu0l3ukNo2qiXZZnARCTU'

    redis:
      host: 'localhost'
      port: 6379
