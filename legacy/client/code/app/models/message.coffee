class Message extends Backbone.Model
  initialize: (username, msg_body, css_classes) ->
    @set 'username',  username
    @set 'timestamp', new Date()
    @set 'css_classes', css_classes

    escaped_msg = twttr.txt.htmlEscape(msg_body)
    extract_options = {extractUrlsWithoutProtocol: true}
    autolink_opts = {targetBlank: true}
    entities = twttr.txt.extractEntitiesWithIndices(escaped_msg, extract_options)
    @set 'message', twttr.txt.autoLinkEntities(escaped_msg, entities, autolink_opts);


module.exports = Message
