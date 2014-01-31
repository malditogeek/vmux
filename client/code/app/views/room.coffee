adapter  = require('/utils/adapter')
PC       = require('/utils/peer_connection')
Media    = require('/utils/media')

User    = require('/models/user')
Stream  = require('/models/stream')
Sidebar = require('/views/sidebar')

Message             = require('/models/message')
MessagesCollection  = require('/models/messages_collection')
MessagesView        = require('/views/messages')
MessageInput        = require('/views/message_input')

class StreamCollection extends Backbone.Collection
  model: Stream

class StreamView extends Backbone.View

  render: ->
    css_classes = if @model.get('local') then 'local' else ''
    @$el.html(ss.tmpl['user-video'].render({css_classes: css_classes}))

    if @model.get('local')
      adapter.attachMediaStream @$el.find('.video')[0], localStream
      @$el.find('.video').attr('muted','muted')
    else
      pc = @model.get('pc')

      pc.on 'remoteStreamAdded', (stream) =>
        adapter.attachMediaStream @$el.find('.video')[0], stream

      pc.on 'remoteStreamRemoved', =>
        @remove()

      pc.on 'close', =>
        @remove()

    return this

class Room extends Backbone.View
  id: 'room'

  initialize: ->
    @collection = new StreamCollection()

  scrollChat: ->
    @$el.find('#chat-messages').scrollTop(10000);

  render: ->
    @$el.html(ss.tmpl['layout-group'].render())

    sidebar = new Sidebar(model: @model)
    @$el.find('#sidebar').html(sidebar.render().el)

    input = new MessageInput(pc: @pc)
    @$el.find('#chat-input').html(input.render().el)

    input.on 'message', (msg) =>
      message = new Message(@model.get('screen_name'), msg)
      messages.add(message)
      @scrollChat()
      @collection.forEach (stream) ->
        if not stream.get('local')
          stream.get('pc').sendMessage(msg)

    messages = new MessagesCollection()
    chatview = new MessagesView(collection: messages)
    @$el.find('#chat-messages').html(chatview.render().el)

    views = {}
    @collection.bind 'add', (stream) =>
      views[stream.get('peer')] = new StreamView(model: stream)
      @$el.find('#streams').append views[stream.get('peer')].render().el

      if not stream.get('local')
        pc = stream.get('pc')

        # FIXME THIS EVENTS ARE NOT WORKING
        # DISCONNECT WHEN NAVIGATE AWAY OF IT
        pc.on 'close', =>
          @collection.remove(stream)
        pc.on 'remoteStreamRemoved', =>
          @collection.remove(stream)
        pc.on 'message', (msg) =>
          message = new Message(stream.get('pc').user.screen_name, msg)
          messages.add(message)
          @scrollChat()

    @collection.bind 'remove', (stream) =>
      views[stream.get('peer')].remove()


    streams = @collection

    window.beforeunload.push =>
      streams.forEach (stream) ->
        stream.get('pc').hangup() if not stream.get('local')

    media = new Media
    media.on 'success', (stream) =>
      stream = new Stream(@model.get('uuid'), null, local: true)
      streams.add(stream)


      ss.event.on 'group.ready', (user_data) =>
        friend = new User(user_data)
        return if @model.id == friend.id

        peer = friend.get('uuid')
        pc = new PC(peer, false, user_data)
        pc.screen_name = friend.get('screen_name')
        pc.attachLocalStream(localStream)
        pc.initiate()

        stream = new Stream(peer, pc)
        streams.add(stream)

      ss.event.on 'signal', (peer, msg, user) =>
        if streams.get(peer)
          pc = streams.get(peer).get('pc')

        switch msg.type
          when 'offer'
            new_pc = new PC(peer, true, user)
            new_pc.attachLocalStream(localStream)
            new_pc.processOffer(msg)
            stream = new Stream(peer, new_pc)
            streams.add(stream)
          when 'answer'
            pc.processAnswer(msg)
          when 'candidate'
            pc.addCandidate(msg)
          when 'bye'
            pc.close()

      ss.rpc 'vmux.ready', @options.room_name

    return this

module.exports = Room
