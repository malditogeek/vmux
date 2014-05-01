$ = require('jquery')
bootstrap = require('../app/vendor/bootstrap-3.1.1.js')
bootstrap.extendjQuery($);

$ ->
  window.scrollTo(0, 1)

  if !window.navigator.userAgent.match(/chrom|firefox|opera/i)
    $('.login').html('')
  else
    guestLogin  = $('#guest-login')[0]
    loginModal  = $('#guest-modal')
 
    guestLogin.onclick = ->
      loginModal.modal()
