# FIXME use App.navigate

class RoomModal extends Backbone.View
  events:
    'click #join' : 'join_room'
    'keypress'    : 'keypress'

  join_room: ->
    #App.navigate '/room/' + @$el.find('#room').val(), trigger: true
    room_name = @$el.find('#room').val().match(/\w+/)
    return if not room_name
    window.location = "/room/#{room_name}"

  keypress: (e) ->
    @join_room() if e.keyCode == 13

  render: ->
    @$el.html(ss.tmpl['sidebar-room_modal'].render())
    @$el.find('#modal').modal()
    return this

class InfoModal extends Backbone.View
  render: ->
    @$el.html(ss.tmpl['sidebar-info_modal'].render())
    @$el.find('#modal').modal(backdrop: 'static', keyboard: false)
    return this

class Sidebar extends Backbone.View
  events: 
    'click #home'  : 'go_home'
    'click #group' : 'join_group'
    'click #info'  : 'show_info'

  go_home: (evt) ->
    evt.preventDefault()
    #App.navigate '/home', trigger: true
    window.location = '/home'

  join_group: (evt) ->
    evt.preventDefault()
    modal = new RoomModal()
    $('body').append(modal.render().el)


  show_info: (evt) ->
    evt.preventDefault()
    modal = new InfoModal()
    $('body').append(modal.render().el)

  render: ->
    @$el.html(ss.tmpl['user-sidebar'].render(@model.toJSON()))
    return this

module.exports = Sidebar
