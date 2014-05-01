class CallRequest extends Backbone.View
  events:
    'click #accept' : 'accept_call'
    'click #reject' : 'reject_call'

  render: ->
    @$el.html(ss.tmpl['user-call_request'].render(@model.toJSON()))
    @$el.find('#modal').modal(backdrop: 'static', keyboard: false)
    return this

  accept_call: ->
    @trigger 'accepted', @model
    @$el.find('#modal').modal('hide')
    @$el.find('#modal').on 'hidden.bs.modal', =>
      @remove()

  reject_call: ->
    @trigger 'rejected', @model
    @$el.find('#modal').modal('hide')
    @$el.find('#modal').on 'hidden.bs.modal', =>
      @remove()

module.exports = CallRequest
