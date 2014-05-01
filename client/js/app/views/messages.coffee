$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $

MessageItemView = require('./message_item.coffee')

class MessagesView extends Backbone.View
 
  tagName: 'ul'

  initialize: ->
    @collection.bind "add", (message) =>
      @$el.append(new MessageItemView(model: message).render().el)

  render: ->
    return this

module.exports = MessagesView
