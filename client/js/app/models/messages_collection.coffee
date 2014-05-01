Backbone = require('backbone')

Message = require('./message.coffee')

class MessagesCollection extends Backbone.Collection
  model: Message

module.exports = MessagesCollection
