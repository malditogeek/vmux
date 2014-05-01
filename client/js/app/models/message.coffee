Backbone = require('backbone')
twttr = require('twitter-text')

class Message extends Backbone.Model
  initialize: (avatar_url, msg_body, css_classes) ->
    @set 'avatar_url',  avatar_url
    @set 'timestamp', new Date()
    @set 'css_classes', css_classes

    escaped_msg = twttr.htmlEscape(msg_body)
    extract_options = {extractUrlsWithoutProtocol: true}
    autolink_opts = {targetBlank: true}
    entities = twttr.extractEntitiesWithIndices(escaped_msg, extract_options)
    @set 'message', twttr.autoLinkEntities(escaped_msg, entities, autolink_opts);

module.exports = Message
