class Stream extends Backbone.Model
  initialize: (peer, pc, opts) ->
    @set 'id',    peer
    @set 'peer',  peer
    @set 'pc',    pc

    if opts
      @set 'local', opts.local

module.exports = Stream
