class MessageInput extends Backbone.View
  
  events: 
    'keypress'   : 'keypress'

  render: ->
    @$el.html(ss.tmpl['chat-input'].render())
    return this

  keypress: (e) ->
    @send() if e.keyCode == 13

  send: ->
    textbox = @$el.find('#textbox')[0]
    message = textbox.value
    if message != ''
      textbox.value = ''
      @trigger 'message', message

module.exports = MessageInput
