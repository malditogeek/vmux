$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $
Templates = require('../templates.js')
bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

class MessageItemView extends Backbone.View

  tagName:"li"

  render: ->
    @$el.html(Templates['chat/message'].render(@model.toJSON()))
    return this

module.exports = MessageItemView
