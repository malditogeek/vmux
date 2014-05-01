class MessageItemView extends Backbone.View

  tagName:"li"

  render: ->
    @$el.html(ss.tmpl['chat-message'].render(@model.toJSON()))
    return this

module.exports = MessageItemView
