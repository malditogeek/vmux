Message = require('./message')

class MessagesCollection extends Backbone.Collection
  model: Message

module.exports = MessagesCollection
