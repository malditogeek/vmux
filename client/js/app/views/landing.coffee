$ = require('jquery')
Backbone = require('backbone')
Backbone.$ = $

#Backbone = require('../vendor/backbone.shim')
Templates = require('../templates.js')

bootstrap = require('../vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

class GuestModal extends Backbone.View
  events:
    'click #login'  : 'login'
    'keypress'      : 'keypress'

  render: ->
    #@$el.html(ss.tmpl['landing-guest_login_modal'].render())
    @$el.html(Templates['landing/guest_login_modal'].render())
    @$el.find('#modal').modal()
    return this

  login: ->
    screen_name = @$el.find('#username').val().match(/\w+/)
    return if not screen_name
    window.location = "/auth/guest?screen_name=#{screen_name}"

  keypress: (e) ->
    @login() if e.keyCode == 13


class Landing extends Backbone.View
  events: 
    'click #guest-login' : 'show_guest_login'

  render: ->
    @$el.html(Templates['layout/landing'].render())
    return this

  show_guest_login: (evt) ->
    evt.preventDefault()
    modal = new GuestModal()
    $('body').append(modal.render().el)

module.exports = Landing
