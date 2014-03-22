# Example request middleware

# Only let a request through if the session has been authenticated
exports.authenticated = ->
  (req, res, next) ->
    return next() if req.session.userId?

    switch req.method
      when 'vmux.profile' then path = '/' + req.params[0]
      when 'vmux.room' then path = '/room/' + req.params[0]

    req.session.redirectTo = path
    req.session.save()

    res(false)
