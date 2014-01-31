MessageItemView = require('./message_item')

class MessagesView extends Backbone.View
 
  tagName: 'ul'

  initialize: ->
    @collection.bind "add", (message) =>
      @$el.append(new MessageItemView(model: message).render().el)

  render: ->
    return this

module.exports = MessagesView
