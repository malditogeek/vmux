class Message extends Backbone.Model
  initialize: (username, msg_body, css_classes) ->
    @set 'username',  username
    @set 'timestamp', new Date()
    entities = twttr.txt.extractEntitiesWithIndices(msg_body, {extractUrlsWithoutProtocol: true})
    @set 'message', twttr.txt.autoLinkEntities(msg_body, entities);
    @set 'css_classes', css_classes

module.exports = Message
