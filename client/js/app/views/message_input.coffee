$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

class MessageInput extends Backbone.View
  
  events: 
    'keypress'   : 'keypress'

  render: ->
    @$el.html(Templates['chat/input'].render())
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
