window.ENV={"name":"development","host":"http://localhost:5000"}
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $,App,AppRouter,Backbone,Home,Profile,Room,User,teardown,__hasProp={}.hasOwnProperty,__extends=function(e,r){function o(){this.constructor=e}for(var n in r)__hasProp.call(r,n)&&(e[n]=r[n]);return o.prototype=r.prototype,e.prototype=new o,e.__super__=r.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,User=require("./models/user.coffee"),Home=require("./views/home.coffee"),Profile=require("./views/profile.coffee"),Room=require("./views/room.coffee"),window.beforeunload=[],teardown=function(){return window.addEventListener("beforeunload",function(){return function(){return window.beforeunload.forEach(function(e){return e()})}}(this))},window.localStream=null,AppRouter=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.routes={home:"home",":user":"profile","room/:id":"room"},r.prototype.home=function(){var e;return e=new User({id:"current"}),e.fetch({success:function(){return function(){var r;return r=new Home({model:e}),$("body").html(r.render().el),teardown()}}(this)})},r.prototype.profile=function(e){var r,o;return o=new User({id:"current"}),r=new User({id:e},{parent:o}),o.fetch({success:function(){return function(){return r.fetch({success:function(){return e=new Profile({model:o,profile_user:r}),$("body").html(e.render().el),teardown()}})}}(this)})},r.prototype.room=function(e){var r;return r=new User({id:"current"}),r.fetch({success:function(){return function(){var o;return o=new Room({model:r,room_name:e}),$("body").html(o.render().el),teardown()}}(this)})},r}(Backbone.Router),App=new AppRouter,$(function(){return Backbone.history.start({pushState:!0})});

},{"./models/user.coffee":5,"./views/home.coffee":30,"./views/profile.coffee":36,"./views/room.coffee":37,"backbone":"8vo2L+","jquery":"zjX7fi"}],2:[function(require,module,exports){
var Backbone,Message,twttr,__hasProp={}.hasOwnProperty,__extends=function(t,e){function r(){this.constructor=t}for(var s in e)__hasProp.call(e,s)&&(t[s]=e[s]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};Backbone=require("backbone"),twttr=require("twitter-text"),Message=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.initialize=function(t,e,r){var s,o,n,a;return this.set("avatar_url",t),this.set("timestamp",new Date),this.set("css_classes",r),n=twttr.htmlEscape(e),a={extractUrlsWithoutProtocol:!0},s={targetBlank:!0},o=twttr.extractEntitiesWithIndices(n,a),this.set("message",twttr.autoLinkEntities(n,o,s))},e}(Backbone.Model),module.exports=Message;

},{"backbone":"8vo2L+","twitter-text":56}],3:[function(require,module,exports){
var Backbone,Message,MessagesCollection,__hasProp={}.hasOwnProperty,__extends=function(e,o){function t(){this.constructor=e}for(var r in o)__hasProp.call(o,r)&&(e[r]=o[r]);return t.prototype=o.prototype,e.prototype=new t,e.__super__=o.prototype,e};Backbone=require("backbone"),Message=require("./message.coffee"),MessagesCollection=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,e),o.prototype.model=Message,o}(Backbone.Collection),module.exports=MessagesCollection;

},{"./message.coffee":2,"backbone":"8vo2L+"}],4:[function(require,module,exports){
var Backbone,Stream,__hasProp={}.hasOwnProperty,__extends=function(t,o){function e(){this.constructor=t}for(var i in o)__hasProp.call(o,i)&&(t[i]=o[i]);return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t};Backbone=require("backbone"),Stream=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,t),o.prototype.initialize=function(t,o,e){return this.set("id",t),this.set("peer",t),this.set("pc",o),e&&this.set("local",e.local),this.pc=o,this.audio=!0,this.video=!0},o.prototype.toggleAudio=function(){return this.audio?this.muteAudio():this.unmuteAudio()},o.prototype.toggleVideo=function(){return this.video?this.muteVideo():this.unmuteVideo()},o.prototype.muteVideo=function(){return this.video=!1,this.pc?this.pc.muteVideo():void 0},o.prototype.unmuteVideo=function(){return this.video=!0,this.pc?this.pc.unmuteVideo():void 0},o.prototype.muteAudio=function(){return this.audio=!1,this.pc?this.pc.muteAudio():void 0},o.prototype.unmuteAudio=function(){return this.audio=!0,this.pc?this.pc.unmuteAudio():void 0},o}(Backbone.Model),module.exports=Stream;

},{"backbone":"8vo2L+"}],5:[function(require,module,exports){
var $,APC,Backbone,DPC,DSA,OTR,User,VPC,crypto,_ref,__hasProp={}.hasOwnProperty,__extends=function(t,e){function n(){this.constructor=t}for(var o in e)__hasProp.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,DSA=require("../vendor/otr/index.js").DSA,OTR=require("../vendor/otr/index.js").OTR,_ref=require("../utils/peer_connection.coffee"),DPC=_ref[0],VPC=_ref[1],APC=_ref[2],crypto=require("crypto"),User=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.urlRoot="/user",e.prototype.initialize=function(t,e){var n;return console.debug("User created: ",t.id),this.active=!1,this.options=e||{},this.conns={},n=localStorage.getItem("vmuxdsa"),n?n=DSA.parsePrivate(n):(n=new DSA,localStorage.setItem("vmuxdsa",n.packPrivate())),this.otr=new OTR({priv:n}),this.otr.REQUIRE_ENCRYPTION=!0,this.otr.on("io",function(t){return function(e){return $.post("/otr/"+t.id,{payload:{src:t.options.parent.id,body:e}})}}(this)),this.otr.on("ui",function(t){return function(e){var n;switch(e=JSON.parse(e),console.debug("[sig in]",e.uuid,e.signal.type),e.signal.type){case"offer":if(n=t.newConnection(e.connType,e.uuid,!0),n.processOffer(e.signal),"video"===e.connType)return t.renderStream(e.src.id,n);break;case"answer":return n=t.conns[e.uuid],n.processAnswer(e.signal);case"candidate":return n=t.conns[e.uuid],n.addCandidate(e.signal);case"bye":return n=t.conns[e.uuid],n.close()}}}(this)),this.otr.on("status",function(t){return function(e){var n;switch(e){case OTR.CONST.STATUS_AKE_SUCCESS:if(console.debug("[OTR] Handhsake successful"),t.active)return n=t.newConnection("data"),n.initiate()}}}(this))},e.prototype.handshake=function(){return this.active=!0,this.otr.sendQueryMsg()},e.prototype.pingback=function(t){var e;return console.debug("[pingback] ",t),e=function(e){return function(){var n;return n={type:"online-"+t,src:e.options.parent.toJSON()},$.post("/signal/"+e.id,{msg:n})}}(this),setTimeout(e,500)},e.prototype.ack=function(t){var e;return console.debug("[ack] ",t),e=function(e){return function(){var n;return n={type:"online-"+t,src:e.options.parent.toJSON()},$.post("/s/ack/"+e.id,{msg:n})}}(this),setTimeout(e,500)},e.prototype.signal=function(t){return console.debug("[sig out]",t.uuid),t.src=this.options.parent.toJSON(),this.otr.sendMsg(JSON.stringify(t))},e.prototype.stopLocalStream=function(){var t;return t=window.localStream,t.getAudioTracks().forEach(function(t){return t.stop()}),t.getVideoTracks().forEach(function(t){return t.stop()}),window.localStream=null},e.prototype.newConnection=function(t,e,n){var o;switch(e=e||crypto.randomBytes(4).toString("hex"),n=n||!1,t){case"data":return o=new DPC(e,this,n,this.options.parent),o.on("datachannelopen",function(t){return function(){return t.trigger("data:ready",t)}}(this)),o.on("datachannelclose",function(t){return function(){return t.trigger("data:disconnected",t)}}(this)),o.on("disconnected",function(t){return function(){return t.trigger("data:disconnected",t)}}(this)),this.conns[e]=o,this.datachannel=o,o;case"video":return o=new VPC(e,this,this.options.parent),o.attachLocalStream(localStream),o.on("remoteStreamAdded",function(t){return function(e){return t.remoteVideoStream=e,t.trigger("video:ready",t,e)}}(this)),o.on("remoteStreamRemoved",function(t){return function(){return t.remoteVideoStream=null,t.trigger("video:disconnected")}}(this)),o.on("disconnected",function(t){return function(){return t.trigger("video:disconnected"),t.stopLocalStream()}}(this)),this.conns[e]=o,this.videochannel=o,o;case"audio":return o=new APC(e,this,this.options.parent),o.attachLocalStream(localStream),o.on("remoteStreamAdded",function(t){return function(e){return t.remoteAudioStream=e,t.trigger("audio:ready",t,e)}}(this)),o.on("remoteStreamRemoved",function(t){return function(){return t.remoteAudioStream=null,t.trigger("audio:disconnected")}}(this)),o.on("disconnected",function(t){return function(){return t.trigger("audio:disconnected"),t.stopLocalStream()}}(this)),this.conns[e]=o,this.audiochannel=o,o}},e.prototype.requestVideocall=function(){var t;return t={type:"requestVideo"},this.datachannel.sendMessage(t)},e.prototype.requestAudiocall=function(){var t;return t={type:"requestAudio"},this.datachannel.sendMessage(t)},e.prototype.offerVideo=function(){var t;return t={type:"videoOffer"},this.datachannel.sendMessage(t)},e.prototype.sendChat=function(t){return this.datachannel.sendMessage({type:"message",body:t})},e.prototype.disconnect=function(){return Object.keys(this.conns).forEach(function(t){return function(e){return t.conns[e].disconnect()}}(this))},e.prototype.toggleAudio=function(){return Object.keys(this.conns).forEach(function(t){return function(e){var n;return n=t.conns[e],n.connType.match(/audio|video/)?n.toggleAudio():void 0}}(this))},e.prototype.toggleVideo=function(){return Object.keys(this.conns).forEach(function(t){return function(e){var n;return n=t.conns[e],"video"===n.connType?n.toggleVideo():void 0}}(this))},e}(Backbone.Model),module.exports=User;

},{"../utils/peer_connection.coffee":9,"../vendor/otr/index.js":18,"backbone":"8vo2L+","crypto":48,"jquery":"zjX7fi"}],6:[function(require,module,exports){
module.exports=function(){var a=require("hogan"),i={};return i["chat/input"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div class="form-group"><input id="textbox" type="text" size="50" placeholder="Say something..." autocomplete="off" autofocus="autofocus" class="form-control"/></div>'),e.fl()},partials:{},subs:{}}),i["chat/message"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div class="chat-message '),e.b(e.v(e.f("css_classes",a,i,0))),e.b('"><img src="'),e.b(e.v(e.f("avatar_url",a,i,0))),e.b('" class="img-circle avatar"/><span>'),e.b(e.t(e.f("message",a,i,0))),e.b('</span></div><div class="clear"></div>'),e.fl()},partials:{},subs:{}}),i["landing/guest_login_modal"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button><h4>What\'s your name?</h4></div><div class="modal-body"><p><input id="username" type="text" placeholder="A username without spaces" autofocus="true" class="form-control"/></p><p><button id="login" type="submit" class="btn btn-success">Login</button></p></div></div></div></div>'),e.fl()},partials:{},subs:{}}),i["layout/home"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="bgvideo"><video id="loopback" autoplay="autoplay" muted="muted"></video></div><div id="wrapper"><div id="background"></div><div id="container"><div id="navbar"></div>'),e.s(e.d("user.guest",a,i,1),a,i,0,190,323,"{{ }}")&&(e.rs(a,i,function(a,i,t){t.b('<div class="guest-notice"><p>To receive a call, send this link: <a href="'),t.b(t.v(t.f("host",a,i,0))),t.b("/"),t.b(t.v(t.d("user.uuid",a,i,0))),t.b('">'),t.b(t.v(t.f("host",a,i,0))),t.b("/"),t.b(t.v(t.d("user.uuid",a,i,0))),t.b("</a></p></div>")}),a.pop()),e.b('<div id="roster"></div><div id="placeholder">'),e.s(e.d("user.guest",a,i,1),a,i,1,0,0,"")||e.b("<p>None of your friends are online.</p>"),e.b('</div></div><div id="conversation"></div></div><div id="notification"></div>'),e.fl()},partials:{},subs:{}}),i["layout/landing"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="homepage"><div class="logo"><img src="/vmux.png"/><p>video calls in your browser</p></div><div class="login"><p>Goodbye Skype.</p><a id="twitter-login" href="/auth/twitter" class="btn btn-primary btn-lg">Login with Twitter</a><a id="guest-login" href="#" class="btn btn-primary btn-lg">Login as Guest</a></div><div class="about"><p>VMUX is a Skype™ alternative that runs in the browser. It\'s built on top of WebRTC so you don\'t need to install any plugins or use Flash. You can do one-to-one or multi-party video calls and all the communications and P2P are encrypted.</p></div></div><div id="github"><a href="https://github.com/malditogeek/vmux" target="_blank"><small>VMUX is open-source, fork it on GitHub.</small></a></div>'),e.fl()},partials:{},subs:{}}),i["layout/profile"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="bgvideo"><video id="loopback" autoplay="autoplay" muted="muted"></video></div><div id="wrapper"><div id="background"></div><div id="container"><div id="navbar"></div><div id="singleuser"><p><img src="'),e.b(e.v(e.f("profile_image_url_https",a,i,0))),e.b('" class="img-circle"/></p><p><small>'),e.b(e.v(e.f("screen_name",a,i,0))),e.b('</small></p><p><button class="call btn btn-info">Call</button></p></div></div><div id="conversation"></div></div>'),e.fl()},partials:{},subs:{}}),i["layout/room"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="navbar"></div><div id="chat"><div id="chat-messages-container"><div id="chat-messages"></div></div><div id="chat-input"></div></div><div id="streams"></div>'),e.fl()},partials:{},subs:{}}),i["sidebar/info_modal"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button><a href="https://github.com/malditogeek/vmux" target="_blank"><img src="/vmux_logo.png" style="width: 100px;"/></a></div><div class="modal-body"><p>VMUX is open-source software, you can fork it on <a href="https://github.com/malditogeek/vmux" target="_blank">GitHub.</a></p><p>If you have any questions, join the conversation on <a href="https://gitter.im/malditogeek/vmux" target="_blank">Gitter.</a></p><p>~</p><p>Thanks for using VMUX!</p><p><i class="fa fa-heart"></i></p></div></div></div></div>'),e.fl()},partials:{},subs:{}}),i["sidebar/room_modal"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button><h4>Join a room</h4></div><div class="modal-body"><p><input id="room" type="text" placeholder="Room name" autofocus="true" class="form-control"/></p><p><button id="join" class="btn btn-success">Join</button></p></div></div></div></div>'),e.fl()},partials:{},subs:{}}),i["user/call_request"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div class="call-request modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><p><img src="'),e.b(e.v(e.d("user.profile_image_url_https",a,i,0))),e.b('" class="img-circle"/></p><p>Accept '),e.b(e.v(e.f("type",a,i,0))),e.b(" call from "),e.b(e.v(e.d("user.screen_name",a,i,0))),e.b("?</p><p><small>Grant access to your "),e.b(e.v(e.f("type",a,i,0))),e.b(' input first</small></p><p><button class="reject btn btn-danger donotdisplay"> Decline</button><button class="accept btn btn-success donotdisplay">Accept</button><audio src="/ringtone.mp3" autoplay="autoplay" loop="loop"></audio></p></div></div></div></div>'),e.fl()},partials:{},subs:{}}),i["user/detail"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<img src="'),e.b(e.v(e.f("profile_image_url_https",a,i,0))),e.b('" class="img-circle"/><p><small>'),e.b(e.v(e.f("screen_name",a,i,0))),e.b('</small></p><p class="actions"><i data-toggle="tooltip" data-placement="bottom" title="Chat" class="show-chat fa fa-comment tip"></i><span class="unreadCount"></span><i data-toggle="tooltip" data-placement="bottom" title="Audiocall" class="audiocall fa fa-phone tip"></i><i data-toggle="tooltip" data-placement="bottom" title="Videocall" class="videocall fa fa-video-camera tip"></i></p><div class="chat modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close hide-chat">&times;</button><span>Chat with '),e.b(e.v(e.f("screen_name",a,i,0))),e.b('</span></div><div class="modal-body"><div class="chat-messages"></div><div class="chat-input"></div></div></div></div></div><div class="audio modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span>Audio call with '),e.b(e.v(e.f("screen_name",a,i,0))),e.b('</span></div><div class="modal-body"><div class="one-to-one-audio"></div></div></div></div></div>'),e.fl()},partials:{},subs:{}}),i["user/localvideo"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<video muted="muted" autoplay="autoplay"></video><div id="controls"><i id="toggle-audio" data-toggle="tooltip" data-placement="top" title="Microphone is ON" class="fa fa-microphone tip"></i><i id="toggle-video" data-toggle="tooltip" data-placement="top" title="Camera is ON" class="fa fa-video-camera tip"></i></div>'),e.fl()},partials:{},subs:{}}),i["user/one_to_one"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<div id="controls"><i id="toggle-fullscreen" data-toggle="tooltip" data-placement="bottom" title="Go full-screen" class="fa fa-arrows-alt tip"></i><i id="toggle-audio" data-toggle="tooltip" data-placement="bottom" title="Microphone is ON" class="fa fa-microphone tip"></i><i id="toggle-video" data-toggle="tooltip" data-placement="bottom" title="Camera is ON" class="fa fa-video-camera tip"></i><i id="hangup" data-toggle="tooltip" data-placement="bottom" title="Hangup" class="fa fa-sign-out tip"></i></div><div id="chat"><div id="chat-messages"></div><div id="chat-input"></div></div><video id="remote" autoplay="autoplay"></video><video id="local" autoplay="autoplay" muted="muted"></video>'),e.fl()},partials:{},subs:{}}),i["user/one_to_one_audio"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<img src="'),e.b(e.v(e.f("profile_image_url_https",a,i,0))),e.b('" class="img-circle"/><p><a href="#" class="hangup">Hangup</a></p><audio autoplay="autoplay" class="stream donotdisplay"></audio>'),e.fl()},partials:{},subs:{}}),i["user/sidebar"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<!--#content--><!--  #user--><!--    img.img-circle(src="'),e.b(e.v(e.f("avatar",a,i,0))),e.b('")--><!----><!--  #menu--><!--    ul--><!--      li--><!--        a#home(href=\'#\')--><!--          img(src=\'/home.png\')--><!--      li--><!--        a#group(href=\'#\')--><!--          img(src=\'/group.png\')--><!--      li--><!--        a#info(href=\'#\')--><!--          img(src=\'/info.png\')--><!----><!----><!--  #logo--><!--    a(href=\'https://github.com/malditogeek/vmux\', target=\'_blank\')--><!--      img(src=\'/vmux.png\')--><div role="navigation" class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#nav-icons" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><div class="navbar-brand"><img src="'),e.b(e.v(e.f("profile_image_url_https",a,i,0))),e.b('" class="img-circle"/></div></div><div id="nav-icons" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a id="home" href="#">HOME</a></li><li><a id="group" href="#">JOIN ROOM</a></li><li><a id="info" href="#">ABOUT</a></li></ul></div></div></div>'),e.fl()},partials:{},subs:{}}),i["user/video"]=new a.Template({code:function(a,i,t){var e=this;return e.b(t=t||""),e.b('<video autoplay="autoplay" poster="/video-poster.jpg"></video><div class="screen_name"><img src="'),e.b(e.v(e.f("profile_image_url_https",a,i,0))),e.b('" class="img-circle avatar"/><span>'),e.b(e.v(e.f("screen_name",a,i,0))),e.b("</span></div><!--"),e.s(e.f("local",a,i,1),a,i,0,201,452,"{{ }}")&&(e.rs(a,i,function(a,i,t){t.b('--><!--#controls--><!--  i#toggle-audio.fa.fa-microphone.tip(data-toggle="tooltip", data-placement="top", title="Microphone is ON")--><!--  i#toggle-video.fa.fa-video-camera.tip(data-toggle="tooltip", data-placement="top", title="Camera is ON")--><!--')}),a.pop()),e.b("-->"),e.fl()},partials:{},subs:{}}),i}();
},{"hogan":"xw4iBK"}],7:[function(require,module,exports){
var RTCIceCandidate,RTCPeerConnection,RTCSessionDescription,attachMediaStream,createIceServer,getUserMedia,reattachMediaStream,webrtcDetectedBrowser,webrtcDetectedVersion;navigator.mozGetUserMedia?(console.log("This appears to be Firefox"),webrtcDetectedBrowser="firefox",webrtcDetectedVersion=parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1],10),RTCPeerConnection=mozRTCPeerConnection,RTCSessionDescription=mozRTCSessionDescription,RTCIceCandidate=mozRTCIceCandidate,getUserMedia=navigator.mozGetUserMedia.bind(navigator),createIceServer=function(e,t,r){var n,a,o;return n=null,o=e.split(":"),0===o[0].indexOf("stun")?n={url:e}:0===o[0].indexOf("turn")&&(27>webrtcDetectedVersion?(a=e.split("?"),(1===a.length||0===a[1].indexOf("transport=udp"))&&(n={url:a[0],credential:r,username:t})):n={url:e,credential:r,username:t}),n},attachMediaStream=function(e,t){return e.mozSrcObject=t,setTimeout(function(){return e.play()},250)},reattachMediaStream=function(e,t){return e.mozSrcObject=t.mozSrcObject,setTimeout(function(){return t.src="",e.play()},500)},MediaStream.prototype.getVideoTracks||(MediaStream.prototype.getVideoTracks=function(){return[]}),MediaStream.prototype.getAudioTracks||(MediaStream.prototype.getAudioTracks=function(){return[]})):navigator.webkitGetUserMedia?(console.log("This appears to be Chrome"),webrtcDetectedBrowser="chrome",webrtcDetectedVersion=parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2],10),createIceServer=function(e,t,r){var n,a;return n=null,a=e.split(":"),0===a[0].indexOf("stun")?n={url:e}:0===a[0].indexOf("turn")&&(n={url:e,credential:r,username:t}),n},RTCPeerConnection=webkitRTCPeerConnection,getUserMedia=navigator.webkitGetUserMedia.bind(navigator),attachMediaStream=function(e,t){return"undefined"!=typeof e.srcObject?e.srcObject=t:"undefined"!=typeof e.mozSrcObject?e.mozSrcObject=t:"undefined"!=typeof e.src?e.src=URL.createObjectURL(t):console.log("Error attaching stream to element.")},reattachMediaStream=function(e,t){return e.src=t.src}):console.log("Browser does not appear to be WebRTC-capable"),exports.RTCPeerConnection=RTCPeerConnection,exports.RTCSessionDescription=RTCSessionDescription||window.RTCSessionDescription,exports.RTCIceCandidate=RTCIceCandidate||window.RTCIceCandidate,exports.getUserMedia=getUserMedia,exports.attachMediaStream=attachMediaStream,exports.reattachMediaStream=reattachMediaStream,exports.webrtcDetectedBrowser=webrtcDetectedBrowser,exports.webrtcDetectedVersion=webrtcDetectedVersion;

},{}],8:[function(require,module,exports){
var $,Backbone,Media,adapter,_;$=require("jquery"),Backbone=require("backbone"),_=require("underscore"),adapter=require("./adapter.coffee"),Media=function(){function e(e){var r,n,a;_.extend(this,Backbone.Events),r=e||{audio:!0,video:!0},a=function(e){return function(r){return console.debug("[Media success]"),window.localStream=r,e.trigger("success",r)}}(this),n=function(e){return function(){return e.trigger("error","Can't access media."),console.debug("[Media error]")}}(this),adapter.getUserMedia(r,a,n)}return e}(),module.exports=Media;

},{"./adapter.coffee":7,"backbone":"8vo2L+","jquery":"zjX7fi","underscore":57}],9:[function(require,module,exports){
var APC,Backbone,DPC,GenericPC,UUID,VPC,adapter,_,__bind=function(e,t){return function(){return e.apply(t,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(e,t){function n(){this.constructor=e}for(var i in t)__hasProp.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};Backbone=require("backbone"),_=require("underscore"),UUID=require("node-uuid"),adapter=require("./adapter.coffee"),GenericPC=function(){function e(){this.log=__bind(this.log,this),this.close=__bind(this.close,this),this.disconnect=__bind(this.disconnect,this)}return e.prototype.init=function(e){var t,n,i,o;return _.extend(this,Backbone.Events),n={optional:[{DtlsSrtpKeyAgreement:!0}]},i={url:"stun:88.198.32.137:3479"},o={url:"turn:88.198.32.137:3478?transport=udp",username:"vmux",credential:"23c50f88-1c92-4a64-a803-69a2fa5d9a4a"},t={iceServers:[i,o]},this.pc=new adapter.RTCPeerConnection(t,n),this.pc.onicecandidate=function(e){return function(t){return t.candidate?e.sendSignal({type:"candidate",label:t.candidate.sdpMLineIndex,id:t.candidate.sdpMid,candidate:t.candidate.candidate}):void 0}}(this),e?e(this.pc):void 0},e.prototype.initiate=function(){return this.pc.createOffer(function(e){return function(t){return e.pc.setLocalDescription(t),e.sendSignal(t)}}(this),function(e){return function(t){return e.log("Error creating offer: ",t)}}(this),this.sdpConstraints)},e.prototype.processOffer=function(e){return this.log("Processing offer",e),this.pc.setRemoteDescription(new adapter.RTCSessionDescription(e)),this.pc.createAnswer(function(e){return function(t){return e.pc.setLocalDescription(t),e.sendSignal(t)}}(this),function(e){return function(t){return e.log("Error creating answer",t)}}(this),this.sdpConstraints)},e.prototype.processAnswer=function(e){return this.log("Processing answer"),this.pc.setRemoteDescription(new adapter.RTCSessionDescription(e))},e.prototype.addCandidate=function(e){var t;return t=new adapter.RTCIceCandidate({sdpMLineIndex:e.label,candidate:e.candidate}),this.pc.addIceCandidate(t)},e.prototype.disconnect=function(){return this.log("Disconnecting"),this.sendSignal({type:"bye"}),this.close()},e.prototype.close=function(){return this.log("Closing "+this.connType+" connection"),this.trigger("disconnected"),this.pc.close()},e.prototype.log=function(e){return console.debug("["+this.uuid+"] "+e)},e.prototype.sendSignal=function(e){var t;return t={uuid:this.uuid,connType:this.connType,signal:e},this.peer.signal(t)},e}(),DPC=function(e){function t(e,t,n,i){this.uuid=e,this.peer=t,this.passive=n,this.user=i,this.sendMessage=__bind(this.sendMessage,this),this.log("New Data PC with "+this.peer.get("screen_name")),this.connType="data",this.sdpConstraints={mandatory:{OfferToReceiveAudio:!1,OfferToReceiveVideo:!1}},this.init(function(e){return function(t){var n;return e.passive?t.ondatachannel=function(t){return e.attachEvents(t.channel)}:(n=t.createDataChannel("vmux"),e.attachEvents(n))}}(this))}return __extends(t,e),t.prototype.attachEvents=function(e){return this.datachannel=e,e.onopen=function(e){return function(){return e.log("DataChannel connection opened"),e.trigger("datachannelopen",e)}}(this),e.onclose=function(e){return function(){return e.log("DataChannel connection closed"),e.trigger("datachannelclose",e)}}(this),e.onmessage=function(e){return function(t){var n;return e.log("Message: "+t.data),t.data.match(/\w|\d/)&&(n=JSON.parse(t.data),n.type)?(e.log("Emitted: "+n.type),e.trigger(n.type,n.body)):void 0}}(this)},t.prototype.sendMessage=function(e){return this.datachannel.send(JSON.stringify(e))},t}(GenericPC),VPC=function(e){function t(e,t,n){this.uuid=e,this.peer=t,this.user=n,this.unmuteVideo=__bind(this.unmuteVideo,this),this.muteVideo=__bind(this.muteVideo,this),this.unmuteAudio=__bind(this.unmuteAudio,this),this.muteAudio=__bind(this.muteAudio,this),this.onRemoteStreamRemoved=__bind(this.onRemoteStreamRemoved,this),this.onRemoteStreamAdded=__bind(this.onRemoteStreamAdded,this),this.log("New Video PC with "+this.peer.get("screen_name")),this.connType="video",this.audio=!0,this.video=!0,this.sdpConstraints={mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0}},this.init(function(e){return function(t){return t.onaddstream=e.onRemoteStreamAdded,t.onremovestream=e.onRemoteStreamRemoved}}(this))}return __extends(t,e),t.prototype.attachLocalStream=function(e){return this.pc.addStream(e)},t.prototype.onRemoteStreamAdded=function(e){return this.log("Remote stream added."),this.trigger("remoteStreamAdded",e.stream),this.trigger("open")},t.prototype.onRemoteStreamRemoved=function(){return this.log("Remote stream removed."),this.trigger("remoteStreamRemoved"),this.trigger("close")},t.prototype.muteAudio=function(){var e,t,n,i,o;for(this.audio=!1,i=localStream.getAudioTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!1);return o},t.prototype.unmuteAudio=function(){var e,t,n,i,o;for(this.audio=!0,i=localStream.getAudioTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!0);return o},t.prototype.muteVideo=function(){var e,t,n,i,o;for(this.video=!1,i=localStream.getVideoTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!1);return o},t.prototype.unmuteVideo=function(){var e,t,n,i,o;for(this.video=!0,i=localStream.getVideoTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!0);return o},t.prototype.toggleAudio=function(){return this.audio?this.muteAudio():this.unmuteAudio()},t.prototype.toggleVideo=function(){return this.video?this.muteVideo():this.unmuteVideo()},t}(GenericPC),APC=function(e){function t(e,t,n){this.uuid=e,this.peer=t,this.user=n,this.unmuteAudio=__bind(this.unmuteAudio,this),this.muteAudio=__bind(this.muteAudio,this),this.onRemoteStreamRemoved=__bind(this.onRemoteStreamRemoved,this),this.onRemoteStreamAdded=__bind(this.onRemoteStreamAdded,this),this.log("New Audio PC with "+this.peer.get("screen_name")),this.connType="audio",this.audio=!0,this.sdpConstraints={mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!1}},this.init(function(e){return function(t){return t.onaddstream=e.onRemoteStreamAdded,t.onremovestream=e.onRemoteStreamRemoved}}(this))}return __extends(t,e),t.prototype.attachLocalStream=function(e){return this.pc.addStream(e)},t.prototype.onRemoteStreamAdded=function(e){return this.log("Remote stream added."),this.trigger("remoteStreamAdded",e.stream),this.trigger("open")},t.prototype.onRemoteStreamRemoved=function(){return this.log("Remote stream removed."),this.trigger("remoteStreamRemoved"),this.trigger("close")},t.prototype.muteAudio=function(){var e,t,n,i,o;for(this.audio=!1,i=localStream.getAudioTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!1);return o},t.prototype.unmuteAudio=function(){var e,t,n,i,o;for(this.audio=!0,i=localStream.getAudioTracks(),o=[],t=0,n=i.length;n>t;t++)e=i[t],o.push(e.enabled=!0);return o},t.prototype.toggleAudio=function(){return this.audio?this.muteAudio():this.unmuteAudio()},t}(GenericPC),module.exports=[DPC,VPC,APC];

},{"./adapter.coffee":7,"backbone":"8vo2L+","node-uuid":55,"underscore":57}],10:[function(require,module,exports){
var Backbone,ServerSentEvents,_;Backbone=require("backbone"),_=require("underscore"),ServerSentEvents=function(){function e(e,n){var r;_.extend(this,Backbone.Events),r="/sse/"+e,console.debug("[SSE]",r),this.source=new EventSource(r),this.source.addEventListener("open",function(){return console.debug("[SSE opened]")}),this.source.addEventListener("error",function(e){return e.readyState===EventSource.CLOSED?console.debug("[SSE closed]"):void 0}),this.source.addEventListener(e,function(n){return function(r){return console.debug("[SSE] "+e),n.trigger(e,JSON.parse(r.data))}}(this)),["ack","otr"].forEach(function(e){return function(n){return e.source.addEventListener(n,function(r){return console.debug("[SSE] "+n),e.trigger(n,JSON.parse(r.data))})}}(this)),n&&this.source.addEventListener("profile-"+n,function(e){return function(r){return console.debug("[SSE] profile-"+n),e.trigger("profile-"+n,JSON.parse(r.data))}}(this))}return e}(),module.exports=ServerSentEvents;

},{"backbone":"8vo2L+","underscore":57}],"backbone":[function(require,module,exports){
module.exports=require('8vo2L+');
},{}],"8vo2L+":[function(require,module,exports){
!function(t,e){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(i,n,s){t.Backbone=e(t,s,i,n)});else if("undefined"!=typeof exports){var i=require("underscore");e(t,exports,i)}else t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}(this,function(t,e,i,n){{var s=t.Backbone,r=[],a=(r.push,r.slice);r.splice}e.VERSION="1.1.2",e.$=n,e.noConflict=function(){return t.Backbone=s,this},e.emulateHTTP=!1,e.emulateJSON=!1;var o=e.Events={on:function(t,e,i){if(!u(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var n=this._events[t]||(this._events[t]=[]);return n.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,n){if(!u(this,"once",t,[e,n])||!e)return this;var s=this,r=i.once(function(){s.off(t,r),e.apply(this,arguments)});return r._callback=e,this.on(t,r,n)},off:function(t,e,n){var s,r,a,o,h,c,l,d;if(!this._events||!u(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events=void 0,this;for(o=t?[t]:i.keys(this._events),h=0,c=o.length;c>h;h++)if(t=o[h],a=this._events[t]){if(this._events[t]=s=[],e||n)for(l=0,d=a.length;d>l;l++)r=a[l],(e&&e!==r.callback&&e!==r.callback._callback||n&&n!==r.context)&&s.push(r);s.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=a.call(arguments,1);if(!u(this,"trigger",t,e))return this;var i=this._events[t],n=this._events.all;return i&&c(i,e),n&&c(n,arguments),this},stopListening:function(t,e,n){var s=this._listeningTo;if(!s)return this;var r=!e&&!n;n||"object"!=typeof e||(n=this),t&&((s={})[t._listenId]=t);for(var a in s)t=s[a],t.off(e,n,this),(r||i.isEmpty(t._events))&&delete this._listeningTo[a];return this}},h=/\s+/,u=function(t,e,i,n){if(!i)return!0;if("object"==typeof i){for(var s in i)t[e].apply(t,[s,i[s]].concat(n));return!1}if(h.test(i)){for(var r=i.split(h),a=0,o=r.length;o>a;a++)t[e].apply(t,[r[a]].concat(n));return!1}return!0},c=function(t,e){var i,n=-1,s=t.length,r=e[0],a=e[1],o=e[2];switch(e.length){case 0:for(;++n<s;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r);return;case 2:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,a);return;case 3:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,a,o);return;default:for(;++n<s;)(i=t[n]).callback.apply(i.ctx,e);return}},l={listenTo:"on",listenToOnce:"once"};i.each(l,function(t,e){o[e]=function(e,n,s){var r=this._listeningTo||(this._listeningTo={}),a=e._listenId||(e._listenId=i.uniqueId("l"));return r[a]=e,s||"object"!=typeof n||(s=this),e[t](n,s,this),this}}),o.bind=o.on,o.unbind=o.off,i.extend(e,o);var d=e.Model=function(t,e){var n=t||{};e||(e={}),this.cid=i.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(n=this.parse(n,e)||{}),n=i.defaults({},n,i.result(this,"defaults")),this.set(n,e),this.changed={},this.initialize.apply(this,arguments)};i.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,n){var s,r,a,o,h,u,c,l;if(null==t)return this;if("object"==typeof t?(r=t,n=e):(r={})[t]=e,n||(n={}),!this._validate(r,n))return!1;a=n.unset,h=n.silent,o=[],u=this._changing,this._changing=!0,u||(this._previousAttributes=i.clone(this.attributes),this.changed={}),l=this.attributes,c=this._previousAttributes,this.idAttribute in r&&(this.id=r[this.idAttribute]);for(s in r)e=r[s],i.isEqual(l[s],e)||o.push(s),i.isEqual(c[s],e)?delete this.changed[s]:this.changed[s]=e,a?delete l[s]:l[s]=e;if(!h){o.length&&(this._pending=n);for(var d=0,f=o.length;f>d;d++)this.trigger("change:"+o[d],this,l[o[d]],n)}if(u)return this;if(!h)for(;this._pending;)n=this._pending,this._pending=!1,this.trigger("change",this,n);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var n in this.attributes)e[n]=void 0;return this.set(e,i.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!i.isEmpty(this.changed):i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):!1;var e,n=!1,s=this._changing?this._previousAttributes:this.attributes;for(var r in t)i.isEqual(s[r],e=t[r])||((n||(n={}))[r]=e);return n},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,n=t.success;return t.success=function(i){return e.set(e.parse(i,t),t)?(n&&n(e,i,t),void e.trigger("sync",e,i,t)):!1},U(this,t),this.sync("read",this,t)},save:function(t,e,n){var s,r,a,o=this.attributes;if(null==t||"object"==typeof t?(s=t,n=e):(s={})[t]=e,n=i.extend({validate:!0},n),s&&!n.wait){if(!this.set(s,n))return!1}else if(!this._validate(s,n))return!1;s&&n.wait&&(this.attributes=i.extend({},o,s)),void 0===n.parse&&(n.parse=!0);var h=this,u=n.success;return n.success=function(t){h.attributes=o;var e=h.parse(t,n);return n.wait&&(e=i.extend(s||{},e)),i.isObject(e)&&!h.set(e,n)?!1:(u&&u(h,t,n),void h.trigger("sync",h,t,n))},U(this,n),r=this.isNew()?"create":n.patch?"patch":"update","patch"===r&&(n.attrs=s),a=this.sync(r,this,n),s&&n.wait&&(this.attributes=o),a},destroy:function(t){t=t?i.clone(t):{};var e=this,n=t.success,s=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(i){(t.wait||e.isNew())&&s(),n&&n(e,i,t),e.isNew()||e.trigger("sync",e,i,t)},this.isNew())return t.success(),!1;U(this,t);var r=this.sync("delete",this,t);return t.wait||s(),r},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||j();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=i.extend({},this.attributes,t);var n=this.validationError=this.validate(t,e)||null;return n?(this.trigger("invalid",this,n,i.extend(e,{validationError:n})),!1):!0}});var f=["keys","values","pairs","invert","pick","omit"];i.each(f,function(t){d.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.attributes),i[t].apply(i,e)}});var p=e.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,i.extend({silent:!0},e))},g={add:!0,remove:!0,merge:!0},v={add:!0,remove:!1};i.extend(p.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:!1},e,v))},remove:function(t,e){var n=!i.isArray(t);t=n?[t]:i.clone(t),e||(e={});var s,r,a,o;for(s=0,r=t.length;r>s;s++)o=t[s]=this.get(t[s]),o&&(delete this._byId[o.id],delete this._byId[o.cid],a=this.indexOf(o),this.models.splice(a,1),this.length--,e.silent||(e.index=a,o.trigger("remove",o,this,e)),this._removeReference(o,e));return n?t[0]:t},set:function(t,e){e=i.defaults({},e,g),e.parse&&(t=this.parse(t,e));var n=!i.isArray(t);t=n?t?[t]:[]:i.clone(t);var s,r,a,o,h,u,c,l=e.at,f=this.model,p=this.comparator&&null==l&&e.sort!==!1,v=i.isString(this.comparator)?this.comparator:null,m=[],y=[],_={},b=e.add,w=e.merge,x=e.remove,E=!p&&b&&x?[]:!1;for(s=0,r=t.length;r>s;s++){if(h=t[s]||{},a=h instanceof d?o=h:h[f.prototype.idAttribute||"id"],u=this.get(a))x&&(_[u.cid]=!0),w&&(h=h===o?o.attributes:h,e.parse&&(h=u.parse(h,e)),u.set(h,e),p&&!c&&u.hasChanged(v)&&(c=!0)),t[s]=u;else if(b){if(o=t[s]=this._prepareModel(h,e),!o)continue;m.push(o),this._addReference(o,e)}o=u||o,!E||!o.isNew()&&_[o.id]||E.push(o),_[o.id]=!0}if(x){for(s=0,r=this.length;r>s;++s)_[(o=this.models[s]).cid]||y.push(o);y.length&&this.remove(y,e)}if(m.length||E&&E.length)if(p&&(c=!0),this.length+=m.length,null!=l)for(s=0,r=m.length;r>s;s++)this.models.splice(l+s,0,m[s]);else{E&&(this.models.length=0);var k=E||m;for(s=0,r=k.length;r>s;s++)this.models.push(k[s])}if(c&&this.sort({silent:!0}),!e.silent){for(s=0,r=m.length;r>s;s++)(o=m[s]).trigger("add",o,this,e);(c||E&&E.length)&&this.trigger("sort",this,e)}return n?t[0]:t},reset:function(t,e){e||(e={});for(var n=0,s=this.models.length;s>n;n++)this._removeReference(this.models[n],e);return e.previousModels=this.models,this._reset(),t=this.add(t,i.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(){return a.apply(this.models,arguments)},get:function(t){return null==t?void 0:this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){return i.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t||(t={}),i.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(i.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,n=this;return t.success=function(i){var s=t.reset?"reset":"set";n[s](i,t),e&&e(n,i,t),n.trigger("sync",n,i,t)},U(this,t),this.sync("read",this,t)},create:function(t,e){if(e=e?i.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var n=this,s=e.success;return e.success=function(t,i){e.wait&&n.add(t,e),s&&s(t,i,e)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(t instanceof d)return t;e=e?i.clone(e):{},e.collection=this;var n=new this.model(t,e);return n.validationError?(this.trigger("invalid",this,n.validationError,e),!1):n},_addReference:function(t){this._byId[t.cid]=t,null!=t.id&&(this._byId[t.id]=t),t.collection||(t.collection=this),t.on("all",this._onModelEvent,this)},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,n),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(m,function(t){p.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.models),i[t].apply(i,e)}});var y=["groupBy","countBy","sortBy","indexBy"];i.each(y,function(t){p.prototype[t]=function(e,n){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,n)}});var _=e.View=function(t){this.cid=i.uniqueId("view"),t||(t={}),i.extend(this,i.pick(t,w)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},b=/^(\S+)\s*(.*)$/,w=["model","collection","el","id","attributes","className","tagName","events"];i.extend(_.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(t,i){return this.$el&&this.undelegateEvents(),this.$el=t instanceof e.$?t:e.$(t),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(!t&&!(t=i.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var n=t[e];if(i.isFunction(n)||(n=this[t[e]]),n){var s=e.match(b),r=s[1],a=s[2];n=i.bind(n,this),r+=".delegateEvents"+this.cid,""===a?this.$el.on(r,n):this.$el.on(r,a,n)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(i.result(this,"el"),!1);else{var t=i.extend({},i.result(this,"attributes"));this.id&&(t.id=i.result(this,"id")),this.className&&(t["class"]=i.result(this,"className"));var n=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(n,!1)}}}),e.sync=function(t,n,s){var r=E[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:r,dataType:"json"};if(s.url||(a.url=i.result(n,"url")||j()),null!=s.data||!n||"create"!==t&&"update"!==t&&"patch"!==t||(a.contentType="application/json",a.data=JSON.stringify(s.attrs||n.toJSON(s))),s.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),s.emulateHTTP&&("PUT"===r||"DELETE"===r||"PATCH"===r)){a.type="POST",s.emulateJSON&&(a.data._method=r);var o=s.beforeSend;s.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",r),o?o.apply(this,arguments):void 0}}"GET"===a.type||s.emulateJSON||(a.processData=!1),"PATCH"===a.type&&x&&(a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var h=s.xhr=e.ajax(i.extend(a,s));return n.trigger("request",n,h,s),h};var x=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),E={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var k=e.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},T=/\((.*?)\)/g,$=/(\(\?)?:\w+/g,S=/\*\w+/g,H=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend(k.prototype,o,{initialize:function(){},route:function(t,n,s){i.isRegExp(t)||(t=this._routeToRegExp(t)),i.isFunction(n)&&(s=n,n=""),s||(s=this[n]);var r=this;return e.history.route(t,function(i){var a=r._extractParameters(t,i);r.execute(s,a),r.trigger.apply(r,["route:"+n].concat(a)),r.trigger("route",n,a),e.history.trigger("route",r,n,a)}),this},execute:function(t,e){t&&t.apply(this,e)},navigate:function(t,i){return e.history.navigate(t,i),this},_bindRoutes:function(){if(this.routes){this.routes=i.result(this,"routes");for(var t,e=i.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(H,"\\$&").replace(T,"(?:$1)?").replace($,function(t,e){return e?t:"([^/?]+)"}).replace(S,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var n=t.exec(e).slice(1);return i.map(n,function(t,e){return e===n.length-1?t||null:t?decodeURIComponent(t):null})}});var A=e.History=function(){this.handlers=[],i.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},I=/^[#\/]|\s+$/g,N=/^\/+|\/+$/g,R=/msie [\w.]+/,O=/\/$/,P=/#.*$/;A.started=!1,i.extend(A.prototype,o,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(O,"");t.indexOf(i)||(t=t.slice(i.length))}else t=this.getHash();return t.replace(I,"")},start:function(t){if(A.started)throw new Error("Backbone.history has already been started");A.started=!0,this.options=i.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var n=this.getFragment(),s=document.documentMode,r=R.exec(navigator.userAgent.toLowerCase())&&(!s||7>=s);if(this.root=("/"+this.root+"/").replace(N,"/"),r&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow,this.navigate(n)}this._hasPushState?e.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?e.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=n;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&o.hash&&(this.fragment=this.getHash().replace(I,""),this.history.replaceState({},document.title,this.root+this.fragment))}return this.options.silent?void 0:this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),A.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),void this.loadUrl())},loadUrl:function(t){return t=this.fragment=this.getFragment(t),i.any(this.handlers,function(e){return e.route.test(t)?(e.callback(t),!0):void 0})},navigate:function(t,e){if(!A.started)return!1;e&&e!==!0||(e={trigger:!!e});var i=this.root+(t=this.getFragment(t||""));if(t=t.replace(P,""),this.fragment!==t){if(this.fragment=t,""===t&&"/"!==i&&(i=i.slice(0,-1)),this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},_updateHash:function(t,e,i){if(i){var n=t.href.replace(/(javascript:|#).*$/,"");t.replace(n+"#"+e)}else t.hash="#"+e}}),e.history=new A;var C=function(t,e){var n,s=this;n=t&&i.has(t,"constructor")?t.constructor:function(){return s.apply(this,arguments)},i.extend(n,s,e);var r=function(){this.constructor=n};return r.prototype=s.prototype,n.prototype=new r,t&&i.extend(n.prototype,t),n.__super__=s.prototype,n};d.extend=p.extend=k.extend=_.extend=A.extend=C;var j=function(){throw new Error('A "url" property or function must be specified')},U=function(t,e){var i=e.error;e.error=function(n){i&&i(t,n,e),t.trigger("error",t,n,e)}};return e});
},{"underscore":57}],13:[function(require,module,exports){
function extendjQuery(t){+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one(t.support.transition.end,function(){i=!0});var n=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e()})}(t),+function(t){"use strict";var e='[data-dismiss="alert"]',i=function(i){t(i).on("click",e,this.close)};i.prototype.close=function(e){function i(){s.trigger("closed.bs.alert").remove()}var o=t(this),n=o.attr("data-target");n||(n=o.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,""));var s=t(n);e&&e.preventDefault(),s.length||(s=o.hasClass("alert")?o:o.parent()),s.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one(t.support.transition.end,i).emulateTransitionEnd(150):i())};var o=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var o=t(this),n=o.data("bs.alert");n||o.data("bs.alert",n=new i(this)),"string"==typeof e&&n[e].call(o)})},t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=o,this},t(document).on("click.bs.alert.data-api",e,i.prototype.close)}(t),+function(t){"use strict";var e=function(i,o){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,o),this.isLoading=!1};e.DEFAULTS={loadingText:"loading..."},e.prototype.setState=function(e){var i="disabled",o=this.$element,n=o.is("input")?"val":"html",s=o.data();e+="Text",s.resetText||o.data("resetText",o[n]()),o[n](s[e]||this.options[e]),setTimeout(t.proxy(function(){"loadingText"==e?(this.isLoading=!0,o.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,o.removeClass(i).removeAttr(i))},this),0)},e.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}t&&this.$element.toggleClass("active")};var i=t.fn.button;t.fn.button=function(i){return this.each(function(){var o=t(this),n=o.data("bs.button"),s="object"==typeof i&&i;n||o.data("bs.button",n=new e(this,s)),"toggle"==i?n.toggle():i&&n.setState(i)})},t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=i,this},t(document).on("click.bs.button.data-api","[data-toggle^=button]",function(e){var i=t(e.target);i.hasClass("btn")||(i=i.closest(".btn")),i.button("toggle"),e.preventDefault()})}(t),+function(t){"use strict";var e=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",t.proxy(this.pause,this)).on("mouseleave",t.proxy(this.cycle,this))};e.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},e.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},e.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},e.prototype.to=function(e){var i=this,o=this.getActiveIndex();return e>this.$items.length-1||0>e?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){i.to(e)}):o==e?this.pause().cycle():this.slide(e>o?"next":"prev",t(this.$items[e]))},e.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},e.prototype.next=function(){return this.sliding?void 0:this.slide("next")},e.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},e.prototype.slide=function(e,i){var o=this.$element.find(".item.active"),n=i||o[e](),s=this.interval,a="next"==e?"left":"right",r="next"==e?"first":"last",l=this;if(!n.length){if(!this.options.wrap)return;n=this.$element.find(".item")[r]()}if(n.hasClass("active"))return this.sliding=!1;var h=t.Event("slide.bs.carousel",{relatedTarget:n[0],direction:a});return this.$element.trigger(h),h.isDefaultPrevented()?void 0:(this.sliding=!0,s&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var e=t(l.$indicators.children()[l.getActiveIndex()]);e&&e.addClass("active")})),t.support.transition&&this.$element.hasClass("slide")?(n.addClass(e),n[0].offsetWidth,o.addClass(a),n.addClass(a),o.one(t.support.transition.end,function(){n.removeClass([e,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*o.css("transition-duration").slice(0,-1))):(o.removeClass("active"),n.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),s&&this.cycle(),this)};var i=t.fn.carousel;t.fn.carousel=function(i){return this.each(function(){var o=t(this),n=o.data("bs.carousel"),s=t.extend({},e.DEFAULTS,o.data(),"object"==typeof i&&i),a="string"==typeof i?i:s.slide;n||o.data("bs.carousel",n=new e(this,s)),"number"==typeof i?n.to(i):a?n[a]():s.interval&&n.pause().cycle()})},t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this},t(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(e){var i,o=t(this),n=t(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),s=t.extend({},n.data(),o.data()),a=o.attr("data-slide-to");a&&(s.interval=!1),n.carousel(s),(a=o.attr("data-slide-to"))&&n.data("bs.carousel").to(a),e.preventDefault()}),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var e=t(this);e.carousel(e.data())})})}(t),+function(t){"use strict";var e=function(i,o){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,o),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.DEFAULTS={toggle:!0},e.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},e.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e=t.Event("show.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.$parent&&this.$parent.find("> .panel > .in");if(i&&i.length){var o=i.data("bs.collapse");if(o&&o.transitioning)return;i.collapse("hide"),o||i.data("bs.collapse",null)}var n=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[n](0),this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[n]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return s.call(this);var a=t.camelCase(["scroll",n].join("-"));this.$element.one(t.support.transition.end,t.proxy(s,this)).emulateTransitionEnd(350)[n](this.$element[0][a])}}},e.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?void this.$element[i](0).one(t.support.transition.end,t.proxy(o,this)).emulateTransitionEnd(350):o.call(this)}}},e.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var i=t.fn.collapse;t.fn.collapse=function(i){return this.each(function(){var o=t(this),n=o.data("bs.collapse"),s=t.extend({},e.DEFAULTS,o.data(),"object"==typeof i&&i);!n&&s.toggle&&"show"==i&&(i=!i),n||o.data("bs.collapse",n=new e(this,s)),"string"==typeof i&&n[i]()})},t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=i,this},t(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(e){var i,o=t(this),n=o.attr("data-target")||e.preventDefault()||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),s=t(n),a=s.data("bs.collapse"),r=a?"toggle":o.data(),l=o.attr("data-parent"),h=l&&t(l);a&&a.transitioning||(h&&h.find('[data-toggle=collapse][data-parent="'+l+'"]').not(o).addClass("collapsed"),o[s.hasClass("in")?"addClass":"removeClass"]("collapsed")),s.collapse(r)})}(t),+function(t){"use strict";function e(e){t(o).remove(),t(n).each(function(){var o=i(t(this)),n={relatedTarget:this};o.hasClass("open")&&(o.trigger(e=t.Event("hide.bs.dropdown",n)),e.isDefaultPrevented()||o.removeClass("open").trigger("hidden.bs.dropdown",n))})}function i(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var o=i&&t(i);return o&&o.length?o:e.parent()}var o=".dropdown-backdrop",n="[data-toggle=dropdown]",s=function(e){t(e).on("click.bs.dropdown",this.toggle)};s.prototype.toggle=function(o){var n=t(this);if(!n.is(".disabled, :disabled")){var s=i(n),a=s.hasClass("open");if(e(),!a){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);var r={relatedTarget:this};if(s.trigger(o=t.Event("show.bs.dropdown",r)),o.isDefaultPrevented())return;s.toggleClass("open").trigger("shown.bs.dropdown",r),n.focus()}return!1}},s.prototype.keydown=function(e){if(/(38|40|27)/.test(e.keyCode)){var o=t(this);if(e.preventDefault(),e.stopPropagation(),!o.is(".disabled, :disabled")){var s=i(o),a=s.hasClass("open");if(!a||a&&27==e.keyCode)return 27==e.which&&s.find(n).focus(),o.click();var r=" li:not(.divider):visible a",l=s.find("[role=menu]"+r+", [role=listbox]"+r);if(l.length){var h=l.index(l.filter(":focus"));38==e.keyCode&&h>0&&h--,40==e.keyCode&&h<l.length-1&&h++,~h||(h=0),l.eq(h).focus()}}}};var a=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var i=t(this),o=i.data("bs.dropdown");o||i.data("bs.dropdown",o=new s(this)),"string"==typeof e&&o[e].call(i)})},t.fn.dropdown.Constructor=s,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",n,s.prototype.toggle).on("keydown.bs.dropdown.data-api",n+", [role=menu], [role=listbox]",s.prototype.keydown)}(t),+function(t){"use strict";var e=function(e,i){this.options=i,this.$element=t(e),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};e.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},e.prototype.toggle=function(t){return this[this.isShown?"hide":"show"](t)},e.prototype.show=function(e){var i=this,o=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var o=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(document.body),i.$element.show().scrollTop(0),o&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});o?i.$element.find(".modal-dialog").one(t.support.transition.end,function(){i.$element.focus().trigger(n)}).emulateTransitionEnd(300):i.$element.focus().trigger(n)}))},e.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one(t.support.transition.end,t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},e.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.focus()},this))},e.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},e.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.removeBackdrop(),t.$element.trigger("hidden.bs.modal")})},e.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},e.prototype.backdrop=function(e){var i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=t.support.transition&&i;if(this.$backdrop=t('<div class="modal-backdrop '+i+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;o?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()):e&&e()};var i=t.fn.modal;t.fn.modal=function(i,o){return this.each(function(){var n=t(this),s=n.data("bs.modal"),a=t.extend({},e.DEFAULTS,n.data(),"object"==typeof i&&i);s||n.data("bs.modal",s=new e(this,a)),"string"==typeof i?s[i](o):a.show&&s.show(o)})},t.fn.modal.Constructor=e,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(e){var i=t(this),o=i.attr("href"),n=t(i.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,"")),s=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},n.data(),i.data());i.is("a")&&e.preventDefault(),n.modal(s,this).one("hide",function(){i.is(":visible")&&i.focus()})}),t(document).on("show.bs.modal",".modal",function(){t(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){t(document.body).removeClass("modal-open")})}(t),+function(t){"use strict";var e=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.prototype.init=function(e,i,o){this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(o);for(var n=this.options.trigger.split(" "),s=n.length;s--;){var a=n[s];if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=a){var r="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},e.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,o){i[t]!=o&&(e[t]=o)}),e},e.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show()},e.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},e.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(e),e.isDefaultPrevented())return;var i=this,o=this.tip();this.setContent(),this.options.animation&&o.addClass("fade");var n="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,s=/\s?auto?\s?/i,a=s.test(n);a&&(n=n.replace(s,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(n),this.options.container?o.appendTo(this.options.container):o.insertAfter(this.$element);var r=this.getPosition(),l=o[0].offsetWidth,h=o[0].offsetHeight;if(a){var p=this.$element.parent(),d=n,c=document.documentElement.scrollTop||document.body.scrollTop,f="body"==this.options.container?window.innerWidth:p.outerWidth(),u="body"==this.options.container?window.innerHeight:p.outerHeight(),v="body"==this.options.container?0:p.offset().left;n="bottom"==n&&r.top+r.height+h-c>u?"top":"top"==n&&r.top-c-h<0?"bottom":"right"==n&&r.right+l>f?"left":"left"==n&&r.left-l<v?"right":n,o.removeClass(d).addClass(n)}var m=this.getCalculatedOffset(n,r,l,h);this.applyPlacement(m,n),this.hoverState=null;var g=function(){i.$element.trigger("shown.bs."+i.type)};t.support.transition&&this.$tip.hasClass("fade")?o.one(t.support.transition.end,g).emulateTransitionEnd(150):g()}},e.prototype.applyPlacement=function(e,i){var o,n=this.tip(),s=n[0].offsetWidth,a=n[0].offsetHeight,r=parseInt(n.css("margin-top"),10),l=parseInt(n.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(l)&&(l=0),e.top=e.top+r,e.left=e.left+l,t.offset.setOffset(n[0],t.extend({using:function(t){n.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),n.addClass("in");var h=n[0].offsetWidth,p=n[0].offsetHeight;if("top"==i&&p!=a&&(o=!0,e.top=e.top+a-p),/bottom|top/.test(i)){var d=0;e.left<0&&(d=-2*e.left,e.left=0,n.offset(e),h=n[0].offsetWidth,p=n[0].offsetHeight),this.replaceArrow(d-s+h,h,"left")}else this.replaceArrow(p-a,p,"top");o&&n.offset(e)},e.prototype.replaceArrow=function(t,e,i){this.arrow().css(i,t?50*(1-t/e)+"%":"")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(){function e(){"in"!=i.hoverState&&o.detach(),i.$element.trigger("hidden.bs."+i.type)}var i=this,o=this.tip(),n=t.Event("hide.bs."+this.type);return this.$element.trigger(n),n.isDefaultPrevented()?void 0:(o.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?o.one(t.support.transition.end,e).emulateTransitionEnd(150):e(),this.hoverState=null,this)},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(){var e=this.$element[0];return t.extend({},"function"==typeof e.getBoundingClientRect?e.getBoundingClientRect():{width:e.offsetWidth,height:e.offsetHeight},this.$element.offset())},e.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},e.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},e.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(e){var i=e?t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;i.tip().hasClass("in")?i.leave(i):i.enter(i)},e.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var i=t.fn.tooltip;t.fn.tooltip=function(i){return this.each(function(){var o=t(this),n=o.data("bs.tooltip"),s="object"==typeof i&&i;(n||"destroy"!=i)&&(n||o.data("bs.tooltip",n=new e(this,s)),"string"==typeof i&&n[i]())})},t.fn.tooltip.Constructor=e,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=i,this}}(t),+function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");e.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),e.prototype.constructor=e,e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content")[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},e.prototype.hasContent=function(){return this.getTitle()||this.getContent()},e.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},e.prototype.tip=function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip};var i=t.fn.popover;t.fn.popover=function(i){return this.each(function(){var o=t(this),n=o.data("bs.popover"),s="object"==typeof i&&i;(n||"destroy"!=i)&&(n||o.data("bs.popover",n=new e(this,s)),"string"==typeof i&&n[i]())})},t.fn.popover.Constructor=e,t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(t),+function(t){"use strict";function e(i,o){var n,s=t.proxy(this.process,this);this.$element=t(t(i).is("body")?window:i),this.$body=t("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",s),this.options=t.extend({},e.DEFAULTS,o),this.selector=(this.options.target||(n=t(i).attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=t([]),this.targets=t([]),this.activeTarget=null,this.refresh(),this.process()}e.DEFAULTS={offset:10},e.prototype.refresh=function(){var e=this.$element[0]==window?"offset":"position";this.offsets=t([]),this.targets=t([]);{var i=this;this.$body.find(this.selector).map(function(){var o=t(this),n=o.data("target")||o.attr("href"),s=/^#./.test(n)&&t(n);return s&&s.length&&s.is(":visible")&&[[s[e]().top+(!t.isWindow(i.$scrollElement.get(0))&&i.$scrollElement.scrollTop()),n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})}},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,o=i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(e>=o)return a!=(t=s.last()[0])&&this.activate(t);if(a&&e<=n[0])return a!=(t=s[0])&&this.activate(t);for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(!n[t+1]||e<=n[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',o=t(i).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")};var i=t.fn.scrollspy;t.fn.scrollspy=function(i){return this.each(function(){var o=t(this),n=o.data("bs.scrollspy"),s="object"==typeof i&&i;n||o.data("bs.scrollspy",n=new e(this,s)),"string"==typeof i&&n[i]()})},t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);e.scrollspy(e.data())})})}(t),+function(t){"use strict";var e=function(e){this.element=t(e)};e.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),o=e.data("target");if(o||(o=e.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=i.find(".active:last a")[0],s=t.Event("show.bs.tab",{relatedTarget:n});if(e.trigger(s),!s.isDefaultPrevented()){var a=t(o);this.activate(e.parent("li"),i),this.activate(a,a.parent(),function(){e.trigger({type:"shown.bs.tab",relatedTarget:n})})}}},e.prototype.activate=function(e,i,o){function n(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),o&&o()}var s=i.find("> .active"),a=o&&t.support.transition&&s.hasClass("fade");a?s.one(t.support.transition.end,n).emulateTransitionEnd(150):n(),s.removeClass("in")};var i=t.fn.tab;t.fn.tab=function(i){return this.each(function(){var o=t(this),n=o.data("bs.tab");n||o.data("bs.tab",n=new e(this)),"string"==typeof i&&n[i]()})},t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){return t.fn.tab=i,this},t(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault(),t(this).tab("show")})}(t),+function(t){"use strict";var e=function(i,o){this.options=t.extend({},e.DEFAULTS,o),this.$window=t(window).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(i),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};e.RESET="affix affix-top affix-bottom",e.DEFAULTS={offset:0},e.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(e.RESET).addClass("affix");var t=this.$window.scrollTop(),i=this.$element.offset();return this.pinnedOffset=i.top-t},e.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},e.prototype.checkPosition=function(){if(this.$element.is(":visible")){var i=t(document).height(),o=this.$window.scrollTop(),n=this.$element.offset(),s=this.options.offset,a=s.top,r=s.bottom;"top"==this.affixed&&(n.top+=o),"object"!=typeof s&&(r=a=s),"function"==typeof a&&(a=s.top(this.$element)),"function"==typeof r&&(r=s.bottom(this.$element));var l=null!=this.unpin&&o+this.unpin<=n.top?!1:null!=r&&n.top+this.$element.height()>=i-r?"bottom":null!=a&&a>=o?"top":!1;if(this.affixed!==l){this.unpin&&this.$element.css("top","");var h="affix"+(l?"-"+l:""),p=t.Event(h+".bs.affix");this.$element.trigger(p),p.isDefaultPrevented()||(this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(e.RESET).addClass(h).trigger(t.Event(h.replace("affix","affixed"))),"bottom"==l&&this.$element.offset({top:i-r-this.$element.height()}))}}};var i=t.fn.affix;t.fn.affix=function(i){return this.each(function(){var o=t(this),n=o.data("bs.affix"),s="object"==typeof i&&i;n||o.data("bs.affix",n=new e(this,s)),"string"==typeof i&&n[i]()})},t.fn.affix.Constructor=e,t.fn.affix.noConflict=function(){return t.fn.affix=i,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var e=t(this),i=e.data();i.offset=i.offset||{},i.offsetBottom&&(i.offset.bottom=i.offsetBottom),i.offsetTop&&(i.offset.top=i.offsetTop),e.affix(i)})})}(t)}module.exports={extendjQuery:extendjQuery};
},{}],"xw4iBK":[function(require,module,exports){
var Hogan={};!function(t,n){function i(t,n,i){var r;return n&&"object"==typeof n&&(null!=n[t]?r=n[t]:i&&n.get&&"function"==typeof n.get&&(r=n.get(t))),r}function r(t,n,i,r,e,s){function a(){}function o(){}a.prototype=t,o.prototype=t.subs;var u,c=new a;c.subs=new o,c.subsText={},c.ib(),r=r||{},c.stackSubs=r;for(u in n)r[u]||(r[u]=n[u]),c.subsText[u]=s;for(u in r)c.subs[u]=r[u];e=e||{},c.stackPartials=e;for(u in i)e[u]||(e[u]=i[u]);for(u in e)c.partials[u]=e[u];return c}function e(t){return String(null===t||void 0===t?"":t)}function s(t){return t=e(t),f.test(t)?t.replace(a,"&amp;").replace(o,"&lt;").replace(u,"&gt;").replace(c,"&#39;").replace(l,"&quot;"):t}t.Template=function(t,n,i,r){t=t||{},this.r=t.code||this.r,this.c=i,this.options=r||{},this.text=n||"",this.partials=t.partials||{},this.subs=t.subs||{},this.ib()},t.Template.prototype={r:function(){return""},v:s,t:e,render:function(t,n,i){return this.ri([t],n||{},i)},ri:function(t,n,i){return this.r(t,n,i)},ep:function(t,n){var i=this.partials[t],e=n[i.name];if(i.instance&&i.base==e)return i.instance;if("string"==typeof e){if(!this.c)throw new Error("No compiler available.");e=this.c.compile(e,this.options)}return e?(this.partials[t].base=e,i.subs&&(void 0===this.activeSub&&(n.stackText=this.text),e=r(e,i.subs,i.partials,this.stackSubs,this.stackPartials,n.stackText||this.text)),this.partials[t].instance=e,e):null},rp:function(t,n,i,r){var e=this.ep(t,i);return e?e.ri(n,i,r):""},rs:function(t,n,i){var r=t[t.length-1];if(!h(r))return void i(t,n,this);for(var e=0;e<r.length;e++)t.push(r[e]),i(t,n,this),t.pop()},s:function(t,n,i,r,e,s,a){var o;return h(t)&&0===t.length?!1:("function"==typeof t&&(t=this.ms(t,n,i,r,e,s,a)),o=!!t,!r&&o&&n&&n.push("object"==typeof t?t:n[n.length-1]),o)},d:function(t,n,r,e){var s,a=t.split("."),o=this.f(a[0],n,r,e),u=this.options.modelGet,c=null;if("."===t&&h(n[n.length-2]))o=n[n.length-1];else for(var l=1;l<a.length;l++)s=i(a[l],o,u),null!=s?(c=o,o=s):o="";return e&&!o?!1:(e||"function"!=typeof o||(n.push(c),o=this.mv(o,n,r),n.pop()),o)},f:function(t,n,r,e){for(var s=!1,a=null,o=!1,u=this.options.modelGet,c=n.length-1;c>=0;c--)if(a=n[c],s=i(t,a,u),null!=s){o=!0;break}return o?(e||"function"!=typeof s||(s=this.mv(s,n,r)),s):e?!1:""},ls:function(t,n,i,r,s){var a=this.options.delimiters;return this.options.delimiters=s,this.b(this.ct(e(t.call(n,r)),n,i)),this.options.delimiters=a,!1},ct:function(t,n,i){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(n,i)},b:n?function(t){this.buf.push(t)}:function(t){this.buf+=t},fl:n?function(){var t=this.buf.join("");return this.buf=[],t}:function(){var t=this.buf;return this.buf="",t},ib:function(){this.buf=n?[]:""},ms:function(t,n,i,r,e,s,a){var o,u=n[n.length-1],c=t.call(u);return"function"==typeof c?r?!0:(o=this.activeSub&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(c,u,i,o.substring(e,s),a)):c},mv:function(t,n,i){var r=n[n.length-1],s=t.call(r);return"function"==typeof s?this.ct(e(s.call(r)),r,i):s},sub:function(t,n,i,r){var e=this.subs[t];e&&(this.activeSub=t,e(n,i,this,r),this.activeSub=!1)}};var a=/&/g,o=/</g,u=/>/g,c=/\'/g,l=/\"/g,f=/[&<>\"\']/,h=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}("undefined"!=typeof exports?exports:Hogan),function(t){function n(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function i(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function r(t,n,i){if(n.charAt(i)!=t.charAt(0))return!1;for(var r=1,e=t.length;e>r;r++)if(n.charAt(i+r)!=t.charAt(r))return!1;return!0}function e(n,i,r,o){var u=[],c=null,l=null,f=null;for(l=r[r.length-1];n.length>0;){if(f=n.shift(),l&&"<"==l.tag&&!(f.tag in w))throw new Error("Illegal content in < super tag.");if(t.tags[f.tag]<=t.tags.$||s(f,o))r.push(f),f.nodes=e(n,f.tag,r,o);else{if("/"==f.tag){if(0===r.length)throw new Error("Closing tag without opener: /"+f.n);if(c=r.pop(),f.n!=c.n&&!a(f.n,c.n,o))throw new Error("Nesting error: "+c.n+" vs. "+f.n);return c.end=f.i,u}"\n"==f.tag&&(f.last=0==n.length||"\n"==n[0].tag)}u.push(f)}if(r.length>0)throw new Error("missing closing tag: "+r.pop().n);return u}function s(t,n){for(var i=0,r=n.length;r>i;i++)if(n[i].o==t.n)return t.tag="#",!0}function a(t,n,i){for(var r=0,e=i.length;e>r;r++)if(i[r].c==t&&i[r].o==n)return!0}function o(t){var n=[];for(var i in t)n.push('"'+c(i)+'": function(c,p,t,i) {'+t[i]+"}");return"{ "+n.join(",")+" }"}function u(t){var n=[];for(var i in t.partials)n.push('"'+c(i)+'":{name:"'+c(t.partials[i].name)+'", '+u(t.partials[i])+"}");return"partials: {"+n.join(",")+"}, subs: "+o(t.subs)}function c(t){return t.replace(m,"\\\\").replace(b,'\\"').replace(v,"\\n").replace(d,"\\r")}function l(t){return~t.indexOf(".")?"d":"f"}function f(t,n){var i="<"+(n.prefix||""),r=i+t.n+x++;return n.partials[r]={name:t.n,partials:{}},n.code+='t.b(t.rp("'+c(r)+'",c,p,"'+(t.indent||"")+'"));',r}function h(t,n){n.code+="t.b(t.t(t."+l(t.n)+'("'+c(t.n)+'",c,p,0)));'}function p(t){return"t.b("+t+");"}var g=/\S/,b=/\"/g,v=/\n/g,d=/\r/g,m=/\\/g;t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(e,s){function a(){m.length>0&&(w.push({tag:"_t",text:new String(m)}),m="")}function o(){for(var n=!0,i=k;i<w.length;i++)if(n=t.tags[w[i].tag]<t.tags._v||"_t"==w[i].tag&&null===w[i].text.match(g),!n)return!1;return n}function u(t,n){if(a(),t&&o())for(var i,r=k;r<w.length;r++)w[r].text&&((i=w[r+1])&&">"==i.tag&&(i.indent=w[r].text.toString()),w.splice(r,1));else n||w.push({tag:"\n"});x=!1,k=w.length}function c(t,n){var r="="+A,e=t.indexOf(r,n),s=i(t.substring(t.indexOf("=",n)+1,e)).split(" ");return S=s[0],A=s[s.length-1],e+r.length-1}var l=e.length,f=0,h=1,p=2,b=f,v=null,d=null,m="",w=[],x=!1,y=0,k=0,S="{{",A="}}";for(s&&(s=s.split(" "),S=s[0],A=s[1]),y=0;l>y;y++)b==f?r(S,e,y)?(--y,a(),b=h):"\n"==e.charAt(y)?u(x):m+=e.charAt(y):b==h?(y+=S.length-1,d=t.tags[e.charAt(y+1)],v=d?e.charAt(y+1):"_v","="==v?(y=c(e,y),b=f):(d&&y++,b=p),x=y):r(A,e,y)?(w.push({tag:v,n:i(m),otag:S,ctag:A,i:"/"==v?x-S.length:y+A.length}),m="",y+=A.length-1,b=f,"{"==v&&("}}"==A?y++:n(w[w.length-1]))):m+=e.charAt(y);return u(x,!0),w};var w={_t:!0,"\n":!0,$:!0,"/":!0};t.stringify=function(n){return"{code: function (c,p,i) { "+t.wrapMain(n.code)+" },"+u(n)+"}"};var x=0;t.generate=function(n,i,r){x=0;var e={code:"",subs:{},partials:{}};return t.walk(n,e),r.asString?this.stringify(e,i,r):this.makeTemplate(e,i,r)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,n,i){var r=this.makePartials(t);return r.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(r,n,this,i)},t.makePartials=function(t){var n,i={subs:{},partials:t.partials,name:t.name};for(n in i.partials)i.partials[n]=this.makePartials(i.partials[n]);for(n in t.subs)i.subs[n]=new Function("c","p","t","i",t.subs[n]);return i},t.codegen={"#":function(n,i){i.code+="if(t.s(t."+l(n.n)+'("'+c(n.n)+'",c,p,1),c,p,0,'+n.i+","+n.end+',"'+n.otag+" "+n.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(n.nodes,i),i.code+="});c.pop();}"},"^":function(n,i){i.code+="if(!t.s(t."+l(n.n)+'("'+c(n.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(n.nodes,i),i.code+="};"},">":f,"<":function(n,i){var r={partials:{},code:"",subs:{},inPartial:!0};t.walk(n.nodes,r);var e=i.partials[f(n,i)];e.subs=r.subs,e.partials=r.partials},$:function(n,i){var r={subs:{},code:"",partials:i.partials,prefix:n.n};t.walk(n.nodes,r),i.subs[n.n]=r.code,i.inPartial||(i.code+='t.sub("'+c(n.n)+'",c,p,i);')},"\n":function(t,n){n.code+=p('"\\n"'+(t.last?"":" + i"))},_v:function(t,n){n.code+="t.b(t.v(t."+l(t.n)+'("'+c(t.n)+'",c,p,0)));'},_t:function(t,n){n.code+=p('"'+c(t.text)+'"')},"{":h,"&":h},t.walk=function(n,i){for(var r,e=0,s=n.length;s>e;e++)r=t.codegen[n[e].tag],r&&r(n[e],i);return i},t.parse=function(t,n,i){return i=i||{},e(t,"",[],i.sectionTags||[])},t.cache={},t.cacheKey=function(t,n){return[t,!!n.asString,!!n.disableLambda,n.delimiters,!!n.modelGet].join("||")},t.compile=function(n,i){i=i||{};var r=t.cacheKey(n,i),e=this.cache[r];if(e){var s=e.partials;for(var a in s)delete s[a].instance;return e}return e=this.generate(this.parse(this.scan(n,i.delimiters),n,i),n,i),this.cache[r]=e}}("undefined"!=typeof exports?exports:Hogan);
},{}],"hogan":[function(require,module,exports){
module.exports=require('xw4iBK');
},{}],"jquery":[function(require,module,exports){
module.exports=require('zjX7fi');
},{}],"zjX7fi":[function(require,module,exports){
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=et.type(e);return"function"===n||et.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(et.isFunction(t))return et.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return et.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(at.test(t))return et.filter(t,e,n);t=et.filter(t,e)}return et.grep(e,function(e){return U.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=ht[e]={};return et.each(e.match(dt)||[],function(e,n){t[n]=!0}),t}function s(){K.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),et.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=et.expando+Math.random()}function u(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(bt,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:xt.test(n)?et.parseJSON(n):n}catch(i){}yt.set(e,t,n)}else n=void 0;return n}function l(){return!0}function c(){return!1}function f(){try{return K.activeElement}catch(e){}}function p(e,t){return et.nodeName(e,"table")&&et.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function d(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Pt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,r=e.length;r>n;n++)vt.set(e[n],"globalEval",!t||vt.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(vt.hasData(e)&&(o=vt.access(e),s=vt.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)et.event.add(t,i,l[i][n])}yt.hasData(e)&&(a=yt.access(e),u=et.extend({},a),yt.set(t,u))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&et.nodeName(e,t)?et.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Nt.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function x(t,n){var r=et(n.createElement(t)).appendTo(n.body),i=e.getDefaultComputedStyle?e.getDefaultComputedStyle(r[0]).display:et.css(r[0],"display");return r.detach(),i}function b(e){var t=K,n=$t[e];return n||(n=x(e,t),"none"!==n&&n||(Wt=(Wt||et("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=Wt[0].contentDocument,t.write(),t.close(),n=x(e,t),Wt.detach()),$t[e]=n),n}function w(e,t,n){var r,i,o,s,a=e.style;return n=n||_t(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||et.contains(e.ownerDocument,e)||(s=et.style(e,t)),It.test(s)&&Bt.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function T(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function C(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,i=Gt.length;i--;)if(t=Gt[i]+n,t in e)return t;return r}function N(e,t,n){var r=zt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=et.css(e,n+Tt[o],!0,i)),r?("content"===n&&(s-=et.css(e,"padding"+Tt[o],!0,i)),"margin"!==n&&(s-=et.css(e,"border"+Tt[o]+"Width",!0,i))):(s+=et.css(e,"padding"+Tt[o],!0,i),"padding"!==n&&(s+=et.css(e,"border"+Tt[o]+"Width",!0,i)));return s}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=_t(e),s="border-box"===et.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=w(e,t,o),(0>i||null==i)&&(i=e.style[t]),It.test(i))return i;r=s&&(J.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(s?"border":"content"),r,o)+"px"}function D(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=vt.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Ct(r)&&(o[s]=vt.access(r,"olddisplay",b(r.nodeName)))):o[s]||(i=Ct(r),(n&&"none"!==n||!i)&&vt.set(r,"olddisplay",i?n:et.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function j(e,t,n,r,i){return new j.prototype.init(e,t,n,r,i)}function S(){return setTimeout(function(){Qt=void 0}),Qt=et.now()}function A(e,t){var n,r=0,i={height:e};for(t=t?1:0;4>r;r+=2-t)n=Tt[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function L(e,t,n){for(var r,i=(nn[t]||[]).concat(nn["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function q(e,t,n){var r,i,o,s,a,u,l,c=this,f={},p=e.style,d=e.nodeType&&Ct(e),h=vt.get(e,"fxshow");n.queue||(a=et._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,c.always(function(){c.always(function(){a.unqueued--,et.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],l=et.css(e,"display"),"none"===l&&(l=b(e.nodeName)),"inline"===l&&"none"===et.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",c.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Kt.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(d?"hide":"show")){if("show"!==i||!h||void 0===h[r])continue;d=!0}f[r]=h&&h[r]||et.style(e,r)}if(!et.isEmptyObject(f)){h?"hidden"in h&&(d=h.hidden):h=vt.access(e,"fxshow",{}),o&&(h.hidden=!d),d?et(e).show():c.done(function(){et(e).hide()}),c.done(function(){var t;vt.remove(e,"fxshow");for(t in f)et.style(e,t,f[t])});for(r in f)s=L(d?h[r]:0,r,c),r in h||(h[r]=s.start,d&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function H(e,t){var n,r,i,o,s;for(n in e)if(r=et.camelCase(n),i=t[r],o=e[n],et.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=et.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function O(e,t,n){var r,i,o=0,s=tn.length,a=et.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qt||S(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:et.extend({},t),opts:et.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qt||S(),duration:n.duration,tweens:[],createTween:function(t,n){var r=et.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(H(c,l.opts.specialEasing);s>o;o++)if(r=tn[o].call(l,e,c,l.opts))return r;return et.map(c,L,l),et.isFunction(l.opts.start)&&l.opts.start.call(e,l),et.fx.timer(et.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function F(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(dt)||[];if(et.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function P(e,t,n,r){function i(a){var u;return o[a]=!0,et.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||s||o[l]?s?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},s=e===Tn;return i(t.dataTypes[0])||!o["*"]&&i("*")}function M(e,t){var n,r,i=et.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&et.extend(!0,e,r),e}function R(e,t,n){for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}function W(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function $(e,t,n,r){var i;if(et.isArray(t))et.each(t,function(t,i){n||En.test(e)?r(e,i):$(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==et.type(t))r(e,t);else for(i in t)$(e+"["+i+"]",t[i],n,r)}function B(e){return et.isWindow(e)?e:9===e.nodeType&&e.defaultView}var I=[],_=I.slice,X=I.concat,z=I.push,U=I.indexOf,V={},Y=V.toString,G=V.hasOwnProperty,Q="".trim,J={},K=e.document,Z="2.1.0",et=function(e,t){return new et.fn.init(e,t)},tt=/^-ms-/,nt=/-([\da-z])/gi,rt=function(e,t){return t.toUpperCase()};et.fn=et.prototype={jquery:Z,constructor:et,selector:"",length:0,toArray:function(){return _.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:_.call(this)},pushStack:function(e){var t=et.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return et.each(this,e,t)},map:function(e){return this.pushStack(et.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(_.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:z,sort:I.sort,splice:I.splice},et.extend=et.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[a]||{},a++),"object"==typeof s||et.isFunction(s)||(s={}),a===u&&(s=this,a--);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(et.isPlainObject(r)||(i=et.isArray(r)))?(i?(i=!1,o=n&&et.isArray(n)?n:[]):o=n&&et.isPlainObject(n)?n:{},s[t]=et.extend(l,o,r)):void 0!==r&&(s[t]=r));return s},et.extend({expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===et.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return e-parseFloat(e)>=0},isPlainObject:function(e){if("object"!==et.type(e)||e.nodeType||et.isWindow(e))return!1;try{if(e.constructor&&!G.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?V[Y.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=et.trim(e),e&&(1===e.indexOf("use strict")?(t=K.createElement("script"),t.text=e,K.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(tt,"ms-").replace(nt,rt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":Q.call(e)},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?et.merge(r,"string"==typeof e?[e]:e):z.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:U.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,s=e.length,a=n(e),u=[];if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&u.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&u.push(i);return X.apply([],u)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),et.isFunction(e)?(r=_.call(arguments,2),i=function(){return e.apply(t||this,r.concat(_.call(arguments)))},i.guid=e.guid=e.guid||et.guid++,i):void 0},now:Date.now,support:J}),et.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){V["[object "+t+"]"]=t.toLowerCase()});var it=function(e){function t(e,t,n,r){var i,o,s,a,u,l,f,h,g,m;if((t?t.ownerDocument||t:$)!==q&&L(t),t=t||q,n=n||[],!e||"string"!=typeof e)return n;if(1!==(a=t.nodeType)&&9!==a)return[];if(O&&!r){if(i=yt.exec(e))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&R(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&C.getElementsByClassName&&t.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(s)),n}if(C.qsa&&(!F||!F.test(e))){if(h=f=W,g=t,m=9===a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(l=p(e),(f=t.getAttribute("id"))?h=f.replace(bt,"\\$&"):t.setAttribute("id",h),h="[id='"+h+"'] ",u=l.length;u--;)l[u]=h+d(l[u]);g=xt.test(e)&&c(t.parentNode)||t,m=l.join(",")}if(m)try{return Z.apply(n,g.querySelectorAll(m)),n}catch(v){}finally{f||t.removeAttribute("id")}}}return w(e.replace(ut,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>N.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[W]=!0,e}function i(e){var t=q.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)N.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||Y)-(~e.sourceIndex||Y);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&typeof e.getElementsByTagName!==V&&e}function f(){}function p(e,n){var r,i,o,s,a,u,l,c=X[e+" "];if(c)return n?0:c.slice(0);for(a=e,u=[],l=N.preFilter;a;){(!r||(i=lt.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,(i=ct.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(ut," ")}),a=a.slice(r.length));for(s in N.filter)!(i=ht[s].exec(a))||l[s]&&!(i=l[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return n?a.length:a?t.error(e):X(e,u).slice(0)}function d(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=I++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,u,l=[B,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(u=t[W]||(t[W]={}),(a=u[r])&&a[0]===B&&a[1]===o)return l[2]=a[2];if(u[r]=l,l[2]=e(t,n,s))return!0}}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,l=null!=t;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[W]&&(i=v(i)),o&&!o[W]&&(o=v(o,s)),r(function(r,s,a,u){var l,c,f,p=[],d=[],h=s.length,g=r||b(t||"*",a.nodeType?[a]:a,[]),v=!e||!r&&t?g:m(g,p,e,a,u),y=n?o||(r?e:h||i)?[]:s:v;if(n&&n(v,y,a,u),i)for(l=m(y,d),i(l,[],a,u),c=l.length;c--;)(f=l[c])&&(y[d[c]]=!(v[d[c]]=f));if(r){if(o||e){if(o){for(l=[],c=y.length;c--;)(f=y[c])&&l.push(v[c]=f);o(null,y=[],l,u)}for(c=y.length;c--;)(f=y[c])&&(l=o?tt.call(r,f):p[c])>-1&&(r[l]=!(s[l]=f))}}else y=m(y===s?y.splice(h,y.length):y),o?o(null,s,y,u):Z.apply(s,y)})}function y(e){for(var t,n,r,i=e.length,o=N.relative[e[0].type],s=o||N.relative[" "],a=o?1:0,u=h(function(e){return e===t},s,!0),l=h(function(e){return tt.call(t,e)>-1},s,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>a;a++)if(n=N.relative[e[a].type])c=[h(g(c),n)];else{if(n=N.filter[e[a].type].apply(null,e[a].matches),n[W]){for(r=++a;i>r&&!N.relative[e[r].type];r++);return v(a>1&&g(c),a>1&&d(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(ut,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&d(e))}c.push(n)}return g(c)}function x(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,u,l){var c,f,p,d=0,h="0",g=r&&[],v=[],y=j,x=r||o&&N.find.TAG("*",l),b=B+=null==y?1:Math.random()||.1,w=x.length;for(l&&(j=s!==q&&s);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0;p=e[f++];)if(p(c,s,a)){u.push(c);break}l&&(B=b)}i&&((c=!p&&c)&&d--,r&&g.push(c))}if(d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,v,s,a);if(r){if(d>0)for(;h--;)g[h]||v[h]||(v[h]=J.call(u));v=m(v)}Z.apply(u,v),l&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(u)}return l&&(B=b,j=y),g};return i?r(s):s}function b(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function w(e,t,n,r){var i,o,s,a,u,l=p(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&C.getById&&9===t.nodeType&&O&&N.relative[o[1].type]){if(t=(N.find.ID(s.matches[0].replace(wt,Tt),t)||[])[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=ht.needsContext.test(e)?0:o.length;i--&&(s=o[i],!N.relative[a=s.type]);)if((u=N.find[a])&&(r=u(s.matches[0].replace(wt,Tt),xt.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&d(o),!e)return Z.apply(n,r),n;break}}return D(e,l)(r,t,!O,n,xt.test(e)&&c(t.parentNode)||t),n}var T,C,N,k,E,D,j,S,A,L,q,H,O,F,P,M,R,W="sizzle"+-new Date,$=e.document,B=0,I=0,_=n(),X=n(),z=n(),U=function(e,t){return e===t&&(A=!0),0},V="undefined",Y=1<<31,G={}.hasOwnProperty,Q=[],J=Q.pop,K=Q.push,Z=Q.push,et=Q.slice,tt=Q.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},nt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",rt="[\\x20\\t\\r\\n\\f]",it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ot=it.replace("w","w#"),st="\\["+rt+"*("+it+")"+rt+"*(?:([*^$|!~]?=)"+rt+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+ot+")|)|)"+rt+"*\\]",at=":("+it+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+st.replace(3,8)+")*)|.*)\\)|)",ut=new RegExp("^"+rt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+rt+"+$","g"),lt=new RegExp("^"+rt+"*,"+rt+"*"),ct=new RegExp("^"+rt+"*([>+~]|"+rt+")"+rt+"*"),ft=new RegExp("="+rt+"*([^\\]'\"]*?)"+rt+"*\\]","g"),pt=new RegExp(at),dt=new RegExp("^"+ot+"$"),ht={ID:new RegExp("^#("+it+")"),CLASS:new RegExp("^\\.("+it+")"),TAG:new RegExp("^("+it.replace("w","w*")+")"),ATTR:new RegExp("^"+st),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+rt+"*(even|odd|(([+-]|)(\\d*)n|)"+rt+"*(?:([+-]|)"+rt+"*(\\d+)|))"+rt+"*\\)|)","i"),bool:new RegExp("^(?:"+nt+")$","i"),needsContext:new RegExp("^"+rt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+rt+"*((?:-\\d)?\\d*)"+rt+"*\\)|)(?=[^-]|$)","i")},gt=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xt=/[+~]/,bt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+rt+"?|("+rt+")|.)","ig"),Tt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{Z.apply(Q=et.call($.childNodes),$.childNodes),Q[$.childNodes.length].nodeType}catch(Ct){Z={apply:Q.length?function(e,t){K.apply(e,et.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}C=t.support={},E=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},L=t.setDocument=function(e){var t,n=e?e.ownerDocument||e:$,r=n.defaultView;return n!==q&&9===n.nodeType&&n.documentElement?(q=n,H=n.documentElement,O=!E(n),r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",function(){L()},!1):r.attachEvent&&r.attachEvent("onunload",function(){L()})),C.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),C.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),C.getElementsByClassName=vt.test(n.getElementsByClassName)&&i(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),C.getById=i(function(e){return H.appendChild(e).id=W,!n.getElementsByName||!n.getElementsByName(W).length}),C.getById?(N.find.ID=function(e,t){if(typeof t.getElementById!==V&&O){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},N.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){return e.getAttribute("id")===t}}):(delete N.find.ID,N.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),N.find.TAG=C.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==V?t.getElementsByTagName(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},N.find.CLASS=C.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==V&&O?t.getElementsByClassName(e):void 0},P=[],F=[],(C.qsa=vt.test(n.querySelectorAll))&&(i(function(e){e.innerHTML="<select t=''><option selected=''></option></select>",e.querySelectorAll("[t^='']").length&&F.push("[*^$]="+rt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||F.push("\\["+rt+"*(?:value|"+nt+")"),e.querySelectorAll(":checked").length||F.push(":checked")}),i(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&F.push("name"+rt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),F.push(",.*:")})),(C.matchesSelector=vt.test(M=H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&i(function(e){C.disconnectedMatch=M.call(e,"div"),M.call(e,"[s!='']:x"),P.push("!=",at)}),F=F.length&&new RegExp(F.join("|")),P=P.length&&new RegExp(P.join("|")),t=vt.test(H.compareDocumentPosition),R=t||vt.test(H.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return A=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r?r:(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!C.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===$&&R($,e)?-1:t===n||t.ownerDocument===$&&R($,t)?1:S?tt.call(S,e)-tt.call(S,t):0:4&r?-1:1)}:function(e,t){if(e===t)return A=!0,0;var r,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:S?tt.call(S,e)-tt.call(S,t):0;if(o===a)return s(e,t);for(r=e;r=r.parentNode;)u.unshift(r);for(r=t;r=r.parentNode;)l.unshift(r);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===$?-1:l[i]===$?1:0},n):q},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==q&&L(e),n=n.replace(ft,"='$1']"),!(!C.matchesSelector||!O||P&&P.test(n)||F&&F.test(n)))try{var r=M.call(e,n);if(r||C.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,q,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==q&&L(e),R(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==q&&L(e);var n=N.attrHandle[t.toLowerCase()],r=n&&G.call(N.attrHandle,t.toLowerCase())?n(e,t,!O):void 0;return void 0!==r?r:C.attributes||!O?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!C.detectDuplicates,S=!C.sortStable&&e.slice(0),e.sort(U),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return S=null,e},k=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=k(t);return n},N=t.selectors={cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(wt,Tt),e[3]=(e[4]||e[5]||"").replace(wt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return ht.CHILD.test(e[0])?null:(e[3]&&void 0!==e[4]?e[2]=e[4]:n&&pt.test(n)&&(t=p(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(wt,Tt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=_[e+" "];return t||(t=new RegExp("(^|"+rt+")"+e+"("+rt+"|$)"))&&_(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!u&&!a;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(c=m[W]||(m[W]={}),l=c[e]||[],d=l[0]===B&&l[1],p=l[0]===B&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[B,d,p];break}}else if(y&&(l=(t[W]||(t[W]={}))[e])&&l[0]===B)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++p||(y&&((f[W]||(f[W]={}))[e]=[B,p]),f!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){var i,o=N.pseudos[e]||N.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[W]?o(n):o.length>1?(i=[e,e,"",n],N.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=tt.call(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=D(e.replace(ut,"$1"));return i[W]?r(function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:r(function(e){return dt.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(wt,Tt).toLowerCase(),function(t){var n;do if(n=O?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!N.pseudos.empty(e)},header:function(e){return mt.test(e.nodeName)},input:function(e){return gt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},N.pseudos.nth=N.pseudos.eq;for(T in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})N.pseudos[T]=a(T);for(T in{submit:!0,reset:!0})N.pseudos[T]=u(T);return f.prototype=N.filters=N.pseudos,N.setFilters=new f,D=t.compile=function(e,t){var n,r=[],i=[],o=z[e+" "];if(!o){for(t||(t=p(e)),n=t.length;n--;)o=y(t[n]),o[W]?r.push(o):i.push(o);o=z(e,x(i,r))}return o},C.sortStable=W.split("").sort(U).join("")===W,C.detectDuplicates=!!A,L(),C.sortDetached=i(function(e){return 1&e.compareDocumentPosition(q.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),C.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(nt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);et.find=it,et.expr=it.selectors,et.expr[":"]=et.expr.pseudos,et.unique=it.uniqueSort,et.text=it.getText,et.isXMLDoc=it.isXML,et.contains=it.contains;var ot=et.expr.match.needsContext,st=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,at=/^.[^:#\[\.,]*$/;et.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?et.find.matchesSelector(r,e)?[r]:[]:et.find.matches(e,et.grep(t,function(e){return 1===e.nodeType}))},et.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;if("string"!=typeof e)return this.pushStack(et(e).filter(function(){for(t=0;n>t;t++)if(et.contains(i[t],this))return!0}));for(t=0;n>t;t++)et.find(e,i[t],r);return r=this.pushStack(n>1?et.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r
},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&ot.test(e)?et(e):e||[],!1).length}});var ut,lt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ct=et.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:lt.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||ut).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof et?t[0]:t,et.merge(this,et.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:K,!0)),st.test(n[1])&&et.isPlainObject(t))for(n in t)et.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return r=K.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=K,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):et.isFunction(e)?"undefined"!=typeof ut.ready?ut.ready(e):e(et):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),et.makeArray(e,this))};ct.prototype=et.fn,ut=et(K);var ft=/^(?:parents|prev(?:Until|All))/,pt={children:!0,contents:!0,next:!0,prev:!0};et.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&et(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),et.fn.extend({has:function(e){var t=et(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(et.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=ot.test(e)||"string"!=typeof e?et(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&et.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?et.unique(o):o)},index:function(e){return e?"string"==typeof e?U.call(et(e),this[0]):U.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(et.unique(et.merge(this.get(),et(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),et.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return et.dir(e,"parentNode")},parentsUntil:function(e,t,n){return et.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return et.dir(e,"nextSibling")},prevAll:function(e){return et.dir(e,"previousSibling")},nextUntil:function(e,t,n){return et.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return et.dir(e,"previousSibling",n)},siblings:function(e){return et.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return et.sibling(e.firstChild)},contents:function(e){return e.contentDocument||et.merge([],e.childNodes)}},function(e,t){et.fn[e]=function(n,r){var i=et.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=et.filter(r,i)),this.length>1&&(pt[e]||et.unique(i),ft.test(e)&&i.reverse()),this.pushStack(i)}});var dt=/\S+/g,ht={};et.Callbacks=function(e){e="string"==typeof e?ht[e]||o(e):et.extend({},e);var t,n,r,i,s,a,u=[],l=!e.once&&[],c=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=u.length,r=!0;u&&s>a;a++)if(u[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,u&&(l?l.length&&c(l.shift()):t?u=[]:f.disable())},f={add:function(){if(u){var n=u.length;!function o(t){et.each(t,function(t,n){var r=et.type(n);"function"===r?e.unique&&f.has(n)||u.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),r?s=u.length:t&&(i=n,c(t))}return this},remove:function(){return u&&et.each(arguments,function(e,t){for(var n;(n=et.inArray(t,u,n))>-1;)u.splice(n,1),r&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?et.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],s=0,this},disable:function(){return u=l=t=void 0,this},disabled:function(){return!u},lock:function(){return l=void 0,t||f.disable(),this},locked:function(){return!l},fireWith:function(e,t){return!u||n&&!l||(t=t||[],t=[e,t.slice?t.slice():t],r?l.push(t):c(t)),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!n}};return f},et.extend({Deferred:function(e){var t=[["resolve","done",et.Callbacks("once memory"),"resolved"],["reject","fail",et.Callbacks("once memory"),"rejected"],["notify","progress",et.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return et.Deferred(function(n){et.each(t,function(t,o){var s=et.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&et.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?et.extend(e,r):r}},i={};return r.pipe=r.then,et.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=_.call(arguments),s=o.length,a=1!==s||e&&et.isFunction(e.promise)?s:0,u=1===a?e:et.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?_.call(arguments):i,r===t?u.notifyWith(n,r):--a||u.resolveWith(n,r)}};if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&et.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--a;return a||u.resolveWith(r,o),u.promise()}});var gt;et.fn.ready=function(e){return et.ready.promise().done(e),this},et.extend({isReady:!1,readyWait:1,holdReady:function(e){e?et.readyWait++:et.ready(!0)},ready:function(e){(e===!0?--et.readyWait:et.isReady)||(et.isReady=!0,e!==!0&&--et.readyWait>0||(gt.resolveWith(K,[et]),et.fn.trigger&&et(K).trigger("ready").off("ready")))}}),et.ready.promise=function(t){return gt||(gt=et.Deferred(),"complete"===K.readyState?setTimeout(et.ready):(K.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),gt.promise(t)},et.ready.promise();var mt=et.access=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===et.type(n)){i=!0;for(a in n)et.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,et.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(et(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o};et.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=et.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,et.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(et.isEmptyObject(o))et.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,et.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{et.isArray(t)?r=t.concat(t.map(et.camelCase)):(i=et.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(dt)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!et.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var vt=new a,yt=new a,xt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,bt=/([A-Z])/g;et.extend({hasData:function(e){return yt.hasData(e)||vt.hasData(e)},data:function(e,t,n){return yt.access(e,t,n)},removeData:function(e,t){yt.remove(e,t)},_data:function(e,t,n){return vt.access(e,t,n)},_removeData:function(e,t){vt.remove(e,t)}}),et.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=yt.get(o),1===o.nodeType&&!vt.get(o,"hasDataAttrs"))){for(n=s.length;n--;)r=s[n].name,0===r.indexOf("data-")&&(r=et.camelCase(r.slice(5)),u(o,r,i[r]));vt.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){yt.set(this,e)}):mt(this,function(t){var n,r=et.camelCase(e);if(o&&void 0===t){if(n=yt.get(o,e),void 0!==n)return n;if(n=yt.get(o,r),void 0!==n)return n;if(n=u(o,r,void 0),void 0!==n)return n}else this.each(function(){var n=yt.get(this,r);yt.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&yt.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){yt.remove(this,e)})}}),et.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=vt.get(e,t),n&&(!r||et.isArray(n)?r=vt.access(e,t,et.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=et.queue(e,t),r=n.length,i=n.shift(),o=et._queueHooks(e,t),s=function(){et.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return vt.get(e,n)||vt.access(e,n,{empty:et.Callbacks("once memory").add(function(){vt.remove(e,[t+"queue",n])})})}}),et.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?et.queue(this[0],e):void 0===t?this:this.each(function(){var n=et.queue(this,e,t);et._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&et.dequeue(this,e)})},dequeue:function(e){return this.each(function(){et.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=et.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=vt.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var wt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Tt=["Top","Right","Bottom","Left"],Ct=function(e,t){return e=t||e,"none"===et.css(e,"display")||!et.contains(e.ownerDocument,e)},Nt=/^(?:checkbox|radio)$/i;!function(){var e=K.createDocumentFragment(),t=e.appendChild(K.createElement("div"));t.innerHTML="<input type='radio' checked='checked' name='t'/>",J.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",J.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var kt="undefined";J.focusinBubbles="onfocusin"in e;var Et=/^key/,Dt=/^(?:mouse|contextmenu)|click/,jt=/^(?:focusinfocus|focusoutblur)$/,St=/^([^.]*)(?:\.(.+)|)$/;et.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=et.guid++),(u=m.events)||(u=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof et!==kt&&et.event.triggered!==t.type?et.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(dt)||[""],l=t.length;l--;)a=St.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d&&(f=et.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=et.event.special[d]||{},c=et.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&et.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||(p=u[d]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(d,s,!1)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),et.event.global[d]=!0)},remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.hasData(e)&&vt.get(e);if(m&&(u=m.events)){for(t=(t||"").match(dt)||[""],l=t.length;l--;)if(a=St.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d){for(f=et.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));s&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||et.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)et.event.remove(e,d+t[l],n,r,!0);et.isEmptyObject(u)&&(delete m.handle,vt.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,u,l,c,f,p=[r||K],d=G.call(t,"type")?t.type:t,h=G.call(t,"namespace")?t.namespace.split("."):[];if(s=a=r=r||K,3!==r.nodeType&&8!==r.nodeType&&!jt.test(d+et.event.triggered)&&(d.indexOf(".")>=0&&(h=d.split("."),d=h.shift(),h.sort()),l=d.indexOf(":")<0&&"on"+d,t=t[et.expando]?t:new et.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:et.makeArray(n,[t]),f=et.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!et.isWindow(r)){for(u=f.delegateType||d,jt.test(u+d)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(r.ownerDocument||K)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||d,c=(vt.get(s,"events")||{})[t.type]&&vt.get(s,"handle"),c&&c.apply(s,n),c=l&&s[l],c&&c.apply&&et.acceptData(s)&&(t.result=c.apply(s,n),t.result===!1&&t.preventDefault());return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!et.acceptData(r)||l&&et.isFunction(r[d])&&!et.isWindow(r)&&(a=r[l],a&&(r[l]=null),et.event.triggered=d,r[d](),et.event.triggered=void 0,a&&(r[l]=a)),t.result}},dispatch:function(e){e=et.event.fix(e);var t,n,r,i,o,s=[],a=_.call(arguments),u=(vt.get(this,"events")||{})[e.type]||[],l=et.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(s=et.event.handlers.call(this,e,u),t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((et.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?et(i,this).index(u)>=0:et.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||K,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[et.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=Dt.test(i)?this.mouseHooks:Et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new et.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=K),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==f()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&et.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return et.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=et.extend(new et.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?et.event.trigger(i,null,t):et.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},et.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},et.Event=function(e,t){return this instanceof et.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.getPreventDefault&&e.getPreventDefault()?l:c):this.type=e,t&&et.extend(this,t),this.timeStamp=e&&e.timeStamp||et.now(),void(this[et.expando]=!0)):new et.Event(e,t)},et.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=l,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=l,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=l,this.stopPropagation()}},et.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){et.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!et.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),J.focusinBubbles||et.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){et.event.simulate(t,e.target,et.event.fix(e),!0)};et.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=vt.access(r,t);i||r.addEventListener(e,n,!0),vt.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=vt.access(r,t)-1;i?vt.access(r,t,i):(r.removeEventListener(e,n,!0),vt.remove(r,t))}}}),et.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=c;else if(!r)return this;return 1===i&&(o=r,r=function(e){return et().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=et.guid++)),this.each(function(){et.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,et(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=c),this.each(function(){et.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){et.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?et.event.trigger(e,t,n,!0):void 0}});var At=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Lt=/<([\w:]+)/,qt=/<|&#?\w+;/,Ht=/<(?:script|style|link)/i,Ot=/checked\s*(?:[^=]|=\s*.checked.)/i,Ft=/^$|\/(?:java|ecma)script/i,Pt=/^true\/(.*)/,Mt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Rt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Rt.optgroup=Rt.option,Rt.tbody=Rt.tfoot=Rt.colgroup=Rt.caption=Rt.thead,Rt.th=Rt.td,et.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=et.contains(e.ownerDocument,e);if(!(J.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||et.isXMLDoc(e)))for(s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!u&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,u,l,c=t.createDocumentFragment(),f=[],p=0,d=e.length;d>p;p++)if(i=e[p],i||0===i)if("object"===et.type(i))et.merge(f,i.nodeType?[i]:i);else if(qt.test(i)){for(o=o||c.appendChild(t.createElement("div")),s=(Lt.exec(i)||["",""])[1].toLowerCase(),a=Rt[s]||Rt._default,o.innerHTML=a[1]+i.replace(At,"<$1></$2>")+a[2],l=a[0];l--;)o=o.lastChild;et.merge(f,o.childNodes),o=c.firstChild,o.textContent=""}else f.push(t.createTextNode(i));for(c.textContent="",p=0;i=f[p++];)if((!r||-1===et.inArray(i,r))&&(u=et.contains(i.ownerDocument,i),o=v(c.appendChild(i),"script"),u&&g(o),n))for(l=0;i=o[l++];)Ft.test(i.type||"")&&n.push(i);return c},cleanData:function(e){for(var t,n,r,i,o,s,a=et.event.special,u=0;void 0!==(n=e[u]);u++){if(et.acceptData(n)&&(o=n[vt.expando],o&&(t=vt.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;void 0!==(i=r[s]);s++)a[i]?et.event.remove(n,i):et.removeEvent(n,i,t.handle);vt.cache[o]&&delete vt.cache[o]}delete yt.cache[n[yt.expando]]}}}),et.fn.extend({text:function(e){return mt(this,function(e){return void 0===e?et.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?et.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||et.cleanData(v(n)),n.parentNode&&(t&&et.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(et.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return et.clone(this,e,t)})},html:function(e){return mt(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ht.test(e)&&!Rt[(Lt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(At,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(et.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,et.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=X.apply([],e);var n,r,i,o,s,a,u=0,l=this.length,c=this,f=l-1,p=e[0],g=et.isFunction(p);if(g||l>1&&"string"==typeof p&&!J.checkClone&&Ot.test(p))return this.each(function(n){var r=c.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(l&&(n=et.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=et.map(v(n,"script"),d),o=i.length;l>u;u++)s=n,u!==f&&(s=et.clone(s,!0,!0),o&&et.merge(i,v(s,"script"))),t.call(this[u],s,u);if(o)for(a=i[i.length-1].ownerDocument,et.map(i,h),u=0;o>u;u++)s=i[u],Ft.test(s.type||"")&&!vt.access(s,"globalEval")&&et.contains(a,s)&&(s.src?et._evalUrl&&et._evalUrl(s.src):et.globalEval(s.textContent.replace(Mt,"")))}return this}}),et.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){et.fn[e]=function(e){for(var n,r=[],i=et(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),et(i[s])[t](n),z.apply(r,n.get());return this.pushStack(r)}});var Wt,$t={},Bt=/^margin/,It=new RegExp("^("+wt+")(?!px)[a-z%]+$","i"),_t=function(e){return e.ownerDocument.defaultView.getComputedStyle(e,null)};!function(){function t(){a.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",o.appendChild(s);var t=e.getComputedStyle(a,null);n="1%"!==t.top,r="4px"===t.width,o.removeChild(s)}var n,r,i="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",o=K.documentElement,s=K.createElement("div"),a=K.createElement("div");a.style.backgroundClip="content-box",a.cloneNode(!0).style.backgroundClip="",J.clearCloneStyle="content-box"===a.style.backgroundClip,s.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",s.appendChild(a),e.getComputedStyle&&et.extend(J,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){var t,n=a.appendChild(K.createElement("div"));return n.style.cssText=a.style.cssText=i,n.style.marginRight=n.style.width="0",a.style.width="1px",o.appendChild(s),t=!parseFloat(e.getComputedStyle(n,null).marginRight),o.removeChild(s),a.innerHTML="",t}})}(),et.swap=function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i};var Xt=/^(none|table(?!-c[ea]).+)/,zt=new RegExp("^("+wt+")(.*)$","i"),Ut=new RegExp("^([+-])=("+wt+")","i"),Vt={position:"absolute",visibility:"hidden",display:"block"},Yt={letterSpacing:0,fontWeight:400},Gt=["Webkit","O","Moz","ms"];et.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=w(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=et.camelCase(t),u=e.style;return t=et.cssProps[a]||(et.cssProps[a]=C(u,a)),s=et.cssHooks[t]||et.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t]:(o=typeof n,"string"===o&&(i=Ut.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(et.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||et.cssNumber[a]||(n+="px"),J.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u[t]="",u[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=et.camelCase(t);return t=et.cssProps[a]||(et.cssProps[a]=C(e.style,a)),s=et.cssHooks[t]||et.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=w(e,t,r)),"normal"===i&&t in Yt&&(i=Yt[t]),""===n||n?(o=parseFloat(i),n===!0||et.isNumeric(o)?o||0:i):i}}),et.each(["height","width"],function(e,t){et.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&Xt.test(et.css(e,"display"))?et.swap(e,Vt,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&_t(e);return N(e,n,r?k(e,t,r,"border-box"===et.css(e,"boxSizing",!1,i),i):0)}}}),et.cssHooks.marginRight=T(J.reliableMarginRight,function(e,t){return t?et.swap(e,{display:"inline-block"},w,[e,"marginRight"]):void 0}),et.each({margin:"",padding:"",border:"Width"},function(e,t){et.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Tt[r]+t]=o[r]||o[r-2]||o[0];return i}},Bt.test(e)||(et.cssHooks[e+t].set=N)}),et.fn.extend({css:function(e,t){return mt(this,function(e,t,n){var r,i,o={},s=0;if(et.isArray(t)){for(r=_t(e),i=t.length;i>s;s++)o[t[s]]=et.css(e,t[s],!1,r);return o}return void 0!==n?et.style(e,t,n):et.css(e,t)},e,t,arguments.length>1)},show:function(){return D(this,!0)},hide:function(){return D(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ct(this)?et(this).show():et(this).hide()})}}),et.Tween=j,j.prototype={constructor:j,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(et.cssNumber[n]?"":"px")},cur:function(){var e=j.propHooks[this.prop];return e&&e.get?e.get(this):j.propHooks._default.get(this)},run:function(e){var t,n=j.propHooks[this.prop];return this.pos=t=this.options.duration?et.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):j.propHooks._default.set(this),this}},j.prototype.init.prototype=j.prototype,j.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=et.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){et.fx.step[e.prop]?et.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[et.cssProps[e.prop]]||et.cssHooks[e.prop])?et.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},j.propHooks.scrollTop=j.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},et.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},et.fx=j.prototype.init,et.fx.step={};var Qt,Jt,Kt=/^(?:toggle|show|hide)$/,Zt=new RegExp("^(?:([+-])=|)("+wt+")([a-z%]*)$","i"),en=/queueHooks$/,tn=[q],nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Zt.exec(t),o=i&&i[3]||(et.cssNumber[e]?"":"px"),s=(et.cssNumber[e]||"px"!==o&&+r)&&Zt.exec(et.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,et.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};et.Animation=et.extend(O,{tweener:function(e,t){et.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nn[n]=nn[n]||[],nn[n].unshift(t)},prefilter:function(e,t){t?tn.unshift(e):tn.push(e)}}),et.speed=function(e,t,n){var r=e&&"object"==typeof e?et.extend({},e):{complete:n||!n&&t||et.isFunction(e)&&e,duration:e,easing:n&&t||t&&!et.isFunction(t)&&t};return r.duration=et.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in et.fx.speeds?et.fx.speeds[r.duration]:et.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){et.isFunction(r.old)&&r.old.call(this),r.queue&&et.dequeue(this,r.queue)},r},et.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Ct).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=et.isEmptyObject(e),o=et.speed(t,n,r),s=function(){var t=O(this,et.extend({},e),o);(i||vt.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=et.timers,s=vt.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&en.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&et.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=vt.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=et.timers,s=r?r.length:0;for(n.finish=!0,et.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),et.each(["toggle","show","hide"],function(e,t){var n=et.fn[t];et.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(A(t,!0),e,r,i)
}}),et.each({slideDown:A("show"),slideUp:A("hide"),slideToggle:A("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){et.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),et.timers=[],et.fx.tick=function(){var e,t=0,n=et.timers;for(Qt=et.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||et.fx.stop(),Qt=void 0},et.fx.timer=function(e){et.timers.push(e),e()?et.fx.start():et.timers.pop()},et.fx.interval=13,et.fx.start=function(){Jt||(Jt=setInterval(et.fx.tick,et.fx.interval))},et.fx.stop=function(){clearInterval(Jt),Jt=null},et.fx.speeds={slow:600,fast:200,_default:400},et.fn.delay=function(e,t){return e=et.fx?et.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=K.createElement("input"),t=K.createElement("select"),n=t.appendChild(K.createElement("option"));e.type="checkbox",J.checkOn=""!==e.value,J.optSelected=n.selected,t.disabled=!0,J.optDisabled=!n.disabled,e=K.createElement("input"),e.value="t",e.type="radio",J.radioValue="t"===e.value}();var rn,on,sn=et.expr.attrHandle;et.fn.extend({attr:function(e,t){return mt(this,et.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){et.removeAttr(this,e)})}}),et.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===kt?et.prop(e,t,n):(1===o&&et.isXMLDoc(e)||(t=t.toLowerCase(),r=et.attrHooks[t]||(et.expr.match.bool.test(t)?on:rn)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=et.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void et.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(dt);if(o&&1===e.nodeType)for(;n=o[i++];)r=et.propFix[n]||n,et.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!J.radioValue&&"radio"===t&&et.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),on={set:function(e,t,n){return t===!1?et.removeAttr(e,n):e.setAttribute(n,n),n}},et.each(et.expr.match.bool.source.match(/\w+/g),function(e,t){var n=sn[t]||et.find.attr;sn[t]=function(e,t,r){var i,o;return r||(o=sn[t],sn[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,sn[t]=o),i}});var an=/^(?:input|select|textarea|button)$/i;et.fn.extend({prop:function(e,t){return mt(this,et.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[et.propFix[e]||e]})}}),et.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!et.isXMLDoc(e),o&&(t=et.propFix[t]||t,i=et.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||an.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),J.optSelected||(et.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),et.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){et.propFix[this.toLowerCase()]=this});var un=/[\t\r\n\f]/g;et.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,u=0,l=this.length;if(et.isFunction(e))return this.each(function(t){et(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");s=et.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,u=0,l=this.length;if(et.isFunction(e))return this.each(function(t){et(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");s=e?et.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(et.isFunction(e)?function(n){et(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=et(this),o=e.match(dt)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===kt||"boolean"===n)&&(this.className&&vt.set(this,"__className__",this.className),this.className=this.className||e===!1?"":vt.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(un," ").indexOf(t)>=0)return!0;return!1}});var ln=/\r/g;et.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=et.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,et(this).val()):e,null==i?i="":"number"==typeof i?i+="":et.isArray(i)&&(i=et.map(i,function(e){return null==e?"":e+""})),t=et.valHooks[this.type]||et.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=et.valHooks[i.type]||et.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(ln,""):null==n?"":n)}}}),et.extend({valHooks:{select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(J.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&et.nodeName(n.parentNode,"optgroup"))){if(t=et(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=et.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=et.inArray(et(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),et.each(["radio","checkbox"],function(){et.valHooks[this]={set:function(e,t){return et.isArray(t)?e.checked=et.inArray(et(e).val(),t)>=0:void 0}},J.checkOn||(et.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),et.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){et.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),et.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var cn=et.now(),fn=/\?/;et.parseJSON=function(e){return JSON.parse(e+"")},et.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&et.error("Invalid XML: "+e),t};var pn,dn,hn=/#.*$/,gn=/([?&])_=[^&]*/,mn=/^(.*?):[ \t]*([^\r\n]*)$/gm,vn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,yn=/^(?:GET|HEAD)$/,xn=/^\/\//,bn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,wn={},Tn={},Cn="*/".concat("*");try{dn=location.href}catch(Nn){dn=K.createElement("a"),dn.href="",dn=dn.href}pn=bn.exec(dn.toLowerCase())||[],et.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:dn,type:"GET",isLocal:vn.test(pn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Cn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":et.parseJSON,"text xml":et.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?M(M(e,et.ajaxSettings),t):M(et.ajaxSettings,e)},ajaxPrefilter:F(wn),ajaxTransport:F(Tn),ajax:function(e,t){function n(e,t,n,s){var u,c,v,y,b,T=t;2!==x&&(x=2,a&&clearTimeout(a),r=void 0,o=s||"",w.readyState=e>0?4:0,u=e>=200&&300>e||304===e,n&&(y=R(f,w,n)),y=W(f,y,w,u),u?(f.ifModified&&(b=w.getResponseHeader("Last-Modified"),b&&(et.lastModified[i]=b),b=w.getResponseHeader("etag"),b&&(et.etag[i]=b)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=y.state,c=y.data,v=y.error,u=!v)):(v=T,(e||!T)&&(T="error",0>e&&(e=0))),w.status=e,w.statusText=(t||T)+"",u?h.resolveWith(p,[c,T,w]):h.rejectWith(p,[w,T,v]),w.statusCode(m),m=void 0,l&&d.trigger(u?"ajaxSuccess":"ajaxError",[w,f,u?c:v]),g.fireWith(p,[w,T]),l&&(d.trigger("ajaxComplete",[w,f]),--et.active||et.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,u,l,c,f=et.ajaxSetup({},t),p=f.context||f,d=f.context&&(p.nodeType||p.jquery)?et(p):et.event,h=et.Deferred(),g=et.Callbacks("once memory"),m=f.statusCode||{},v={},y={},x=0,b="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=mn.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||b;return r&&r.abort(t),n(0,t),this}};if(h.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,f.url=((e||f.url||dn)+"").replace(hn,"").replace(xn,pn[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=et.trim(f.dataType||"*").toLowerCase().match(dt)||[""],null==f.crossDomain&&(u=bn.exec(f.url.toLowerCase()),f.crossDomain=!(!u||u[1]===pn[1]&&u[2]===pn[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(pn[3]||("http:"===pn[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=et.param(f.data,f.traditional)),P(wn,f,t,w),2===x)return w;l=f.global,l&&0===et.active++&&et.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!yn.test(f.type),i=f.url,f.hasContent||(f.data&&(i=f.url+=(fn.test(i)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=gn.test(i)?i.replace(gn,"$1_="+cn++):i+(fn.test(i)?"&":"?")+"_="+cn++)),f.ifModified&&(et.lastModified[i]&&w.setRequestHeader("If-Modified-Since",et.lastModified[i]),et.etag[i]&&w.setRequestHeader("If-None-Match",et.etag[i])),(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",f.contentType),w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+Cn+"; q=0.01":""):f.accepts["*"]);for(c in f.headers)w.setRequestHeader(c,f.headers[c]);if(f.beforeSend&&(f.beforeSend.call(p,w,f)===!1||2===x))return w.abort();b="abort";for(c in{success:1,error:1,complete:1})w[c](f[c]);if(r=P(Tn,f,t,w)){w.readyState=1,l&&d.trigger("ajaxSend",[w,f]),f.async&&f.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},f.timeout));try{x=1,r.send(v,n)}catch(T){if(!(2>x))throw T;n(-1,T)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return et.get(e,t,n,"json")},getScript:function(e,t){return et.get(e,void 0,t,"script")}}),et.each(["get","post"],function(e,t){et[t]=function(e,n,r,i){return et.isFunction(n)&&(i=i||r,r=n,n=void 0),et.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),et.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){et.fn[t]=function(e){return this.on(t,e)}}),et._evalUrl=function(e){return et.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},et.fn.extend({wrapAll:function(e){var t;return et.isFunction(e)?this.each(function(t){et(this).wrapAll(e.call(this,t))}):(this[0]&&(t=et(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(et.isFunction(e)?function(t){et(this).wrapInner(e.call(this,t))}:function(){var t=et(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=et.isFunction(e);return this.each(function(n){et(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){et.nodeName(this,"body")||et(this).replaceWith(this.childNodes)}).end()}}),et.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},et.expr.filters.visible=function(e){return!et.expr.filters.hidden(e)};var kn=/%20/g,En=/\[\]$/,Dn=/\r?\n/g,jn=/^(?:submit|button|image|reset|file)$/i,Sn=/^(?:input|select|textarea|keygen)/i;et.param=function(e,t){var n,r=[],i=function(e,t){t=et.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=et.ajaxSettings&&et.ajaxSettings.traditional),et.isArray(e)||e.jquery&&!et.isPlainObject(e))et.each(e,function(){i(this.name,this.value)});else for(n in e)$(n,e[n],t,i);return r.join("&").replace(kn,"+")},et.fn.extend({serialize:function(){return et.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=et.prop(this,"elements");return e?et.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!et(this).is(":disabled")&&Sn.test(this.nodeName)&&!jn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=et(this).val();return null==n?null:et.isArray(n)?et.map(n,function(e){return{name:t.name,value:e.replace(Dn,"\r\n")}}):{name:t.name,value:n.replace(Dn,"\r\n")}}).get()}}),et.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var An=0,Ln={},qn={0:200,1223:204},Hn=et.ajaxSettings.xhr();e.ActiveXObject&&et(e).on("unload",function(){for(var e in Ln)Ln[e]()}),J.cors=!!Hn&&"withCredentials"in Hn,J.ajax=Hn=!!Hn,et.ajaxTransport(function(e){var t;return J.cors||Hn&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++An;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete Ln[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status,o.statusText):r(qn[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=Ln[s]=t("abort"),o.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:void 0}),et.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return et.globalEval(e),e}}}),et.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),et.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=et("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),K.head.appendChild(t[0])},abort:function(){n&&n()}}}});var On=[],Fn=/(=)\?(?=&|$)|\?\?/;et.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||et.expando+"_"+cn++;return this[e]=!0,e}}),et.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(Fn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Fn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=et.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(Fn,"$1"+i):t.jsonp!==!1&&(t.url+=(fn.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||et.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,On.push(i)),s&&et.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),et.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||K;var r=st.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=et.buildFragment([e],t,i),i&&i.length&&et(i).remove(),et.merge([],r.childNodes))};var Pn=et.fn.load;et.fn.load=function(e,t,n){if("string"!=typeof e&&Pn)return Pn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),et.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&et.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?et("<div>").append(et.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},et.expr.filters.animated=function(e){return et.grep(et.timers,function(t){return e===t.elem}).length};var Mn=e.document.documentElement;et.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=et.css(e,"position"),f=et(e),p={};"static"===c&&(e.style.position="relative"),a=f.offset(),o=et.css(e,"top"),u=et.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=f.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),et.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):f.css(p)}},et.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){et.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)return t=o.documentElement,et.contains(t,r)?(typeof r.getBoundingClientRect!==kt&&(i=r.getBoundingClientRect()),n=B(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===et.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),et.nodeName(e[0],"html")||(r=e.offset()),r.top+=et.css(e[0],"borderTopWidth",!0),r.left+=et.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-et.css(n,"marginTop",!0),left:t.left-r.left-et.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||Mn;e&&!et.nodeName(e,"html")&&"static"===et.css(e,"position");)e=e.offsetParent;return e||Mn})}}),et.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;et.fn[t]=function(i){return mt(this,function(t,i,o){var s=B(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),et.each(["top","left"],function(e,t){et.cssHooks[t]=T(J.pixelPosition,function(e,n){return n?(n=w(e,t),It.test(n)?et(e).position()[t]+"px":n):void 0})}),et.each({Height:"height",Width:"width"},function(e,t){et.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){et.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return mt(this,function(t,n,r){var i;return et.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?et.css(t,n,s):et.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),et.fn.size=function(){return this.length},et.fn.andSelf=et.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return et});var Rn=e.jQuery,Wn=e.$;return et.noConflict=function(t){return e.$===et&&(e.$=Wn),t&&e.jQuery===et&&(e.jQuery=Rn),et},typeof t===kt&&(e.jQuery=e.$=et),et});
},{}],18:[function(require,module,exports){
module.exports={DSA:require("./lib/dsa.js"),OTR:require("./lib/otr.js")};
},{"./lib/dsa.js":21,"./lib/otr.js":23}],19:[function(require,module,exports){
(function(){"use strict";function t(t,i,r,e,a){var n=s.enc.Latin1.parse(a),o=s.algo.HMAC.create(s.algo.SHA256,n);return o.update(s.enc.Latin1.parse(h.packMPI(t))),o.update(s.enc.Latin1.parse(h.packMPI(i))),o.update(s.enc.Latin1.parse(r)),o.update(s.enc.Latin1.parse(e)),o.finalize().toString(s.enc.Latin1)}function i(t){if(!(this instanceof i))return new i(t);this.otr=t,this.our_dh=t.our_old_dh,this.our_keyid=t.our_keyid-1,this.their_y=null,this.their_keyid=null,this.their_priv_pk=null,this.ssid=null,this.transmittedRS=!1,this.r=null;var s=this;["sendMsg"].forEach(function(t){s[t]=s[t].bind(s)})}var s,r,e,h,a,n=this;"undefined"!=typeof module&&module.exports?(module.exports=i,s=require("../vendor/crypto.js"),r=require("../vendor/bigint.js"),e=require("./const.js"),h=require("./helpers.js"),a=require("./dsa.js")):(n.OTR.AKE=i,s=n.CryptoJS,r=n.BigInt,e=n.OTR.CONST,h=n.OTR.HLP,a=n.DSA);var o=r.str2bigInt(e.N,16),u=r.sub(o,r.str2bigInt("2",10));i.prototype={constructor:i,createKeys:function(t){var i=r.powMod(t,this.our_dh.privateKey,o),s=h.packMPI(i);this.ssid=h.mask(h.h2("\x00",s),0,64);var e=h.h2("",s);this.c=h.mask(e,0,128),this.c_prime=h.mask(e,128,128),this.m1=h.h2("",s),this.m2=h.h2("",s),this.m1_prime=h.h2("",s),this.m2_prime=h.h2("",s)},verifySignMac:function(i,r,e,n,o,u,c,_){var l=h.makeMac(r,e);if(!h.compare(i,l))return["MACs do not match."];var d=h.decryptAes(r.substring(4),n,_);d=h.splitype(["PUBKEY","INT","SIG"],d.toString(s.enc.Latin1));var p=t(o,u,d[0],d[1],c),m=a.parsePublic(d[0]),y=h.bits2bigInt(d[2].substring(0,20)),A=h.bits2bigInt(d[2].substring(20));return a.verify(m,p,y,A)?[null,h.readLen(d[1]),m]:["Cannot verify signature of m."]},makeM:function(i,e,a,n){var o=this.otr.priv.packPublic(),u=h.packINT(this.our_keyid),c=t(this.our_dh.publicKey,i,o,u,e);c=this.otr.priv.sign(c);var _=o+u;_+=r.bigInt2bits(c[0],20),_+=r.bigInt2bits(c[1],20),_=s.enc.Latin1.parse(_);var l=h.packData(h.encryptAes(_,a,h.packCtr(0))),d=h.makeMac(l,n);return l+d},akeSuccess:function(t){return h.debug.call(this.otr,"success"),r.equals(this.their_y,this.our_dh.publicKey)?this.otr.error("equal keys - we have a problem.",!0):(this.otr.our_old_dh=this.our_dh,this.otr.their_priv_pk=this.their_priv_pk,this.their_keyid===this.otr.their_keyid&&r.equals(this.their_y,this.otr.their_y)||this.their_keyid===this.otr.their_keyid-1&&r.equals(this.their_y,this.otr.their_old_y)||(this.otr.their_y=this.their_y,this.otr.their_old_y=null,this.otr.their_keyid=this.their_keyid,this.otr.sessKeys[0]=[new this.otr.DHSession(this.otr.our_dh,this.otr.their_y),null],this.otr.sessKeys[1]=[new this.otr.DHSession(this.otr.our_old_dh,this.otr.their_y),null]),this.otr.ssid=this.ssid,this.otr.transmittedRS=this.transmittedRS,this.otr_version=t,this.otr.authstate=e.AUTHSTATE_NONE,this.otr.msgstate=e.MSGSTATE_ENCRYPTED,this.r=null,this.myhashed=null,this.dhcommit=null,this.encrypted=null,this.hashed=null,this.otr.trigger("status",[e.STATUS_AKE_SUCCESS]),void this.otr.sendStored())},handleAKE:function(t){var i,a,n,o=t.version;switch(t.type){case"":if(h.debug.call(this.otr,"d-h key message"),t=h.splitype(["DATA","DATA"],t.msg),this.otr.authstate===e.AUTHSTATE_AWAITING_DHKEY){var c=h.readMPI(this.myhashed),_=h.readMPI(t[1]);if(r.greater(c,_)){n="",i=this.dhcommit;break}this.our_dh=this.otr.dh(),this.otr.authstate=e.AUTHSTATE_NONE,this.r=null,this.myhashed=null}else this.otr.authstate===e.AUTHSTATE_AWAITING_SIG&&(this.our_dh=this.otr.dh());this.otr.authstate=e.AUTHSTATE_AWAITING_REVEALSIG,this.encrypted=t[0].substring(4),this.hashed=t[1].substring(4),n="\n",i=h.packMPI(this.our_dh.publicKey);break;case"\n":if(h.debug.call(this.otr,"reveal signature message"),t=h.splitype(["MPI"],t.msg),this.otr.authstate!==e.AUTHSTATE_AWAITING_DHKEY){if(this.otr.authstate!==e.AUTHSTATE_AWAITING_SIG)return;if(!r.equals(this.their_y,h.readMPI(t[0])))return}if(this.otr.authstate=e.AUTHSTATE_AWAITING_SIG,this.their_y=h.readMPI(t[0]),!h.checkGroup(this.their_y,u))return this.otr.error("Illegal g^y.",!0);this.createKeys(this.their_y),n="",i=h.packMPI(this.r),i+=this.makeM(this.their_y,this.m1,this.c,this.m2),this.m1=null,this.m2=null,this.c=null;break;case"":if(h.debug.call(this.otr,"signature message"),this.otr.authstate!==e.AUTHSTATE_AWAITING_REVEALSIG)return;t=h.splitype(["DATA","DATA","MAC"],t.msg),this.r=h.readMPI(t[0]);var l=s.enc.Hex.parse(r.bigInt2str(this.r,16));l=s.enc.Latin1.stringify(l);var d=h.decryptAes(this.encrypted,l,h.packCtr(0));d=d.toString(s.enc.Latin1),this.their_y=h.readMPI(d);var p=s.SHA256(s.enc.Latin1.parse(d));return h.compare(this.hashed,p.toString(s.enc.Latin1))?h.checkGroup(this.their_y,u)?(this.createKeys(this.their_y),a=this.verifySignMac(t[2],t[1],this.m2,this.c,this.their_y,this.our_dh.publicKey,this.m1,h.packCtr(0)),a[0]?this.otr.error(a[0],!0):(this.their_keyid=a[1],this.their_priv_pk=a[2],i=this.makeM(this.their_y,this.m1_prime,this.c_prime,this.m2_prime),this.m1=null,this.m2=null,this.m1_prime=null,this.m2_prime=null,this.c=null,this.c_prime=null,this.sendMsg(o,"",i),void this.akeSuccess(o))):this.otr.error("Illegal g^x.",!0):this.otr.error("Hashed g^x does not match.",!0);case"":if(h.debug.call(this.otr,"data message"),this.otr.authstate!==e.AUTHSTATE_AWAITING_SIG)return;return t=h.splitype(["DATA","MAC"],t.msg),a=this.verifySignMac(t[1],t[0],this.m2_prime,this.c_prime,this.their_y,this.our_dh.publicKey,this.m1_prime,h.packCtr(0)),a[0]?this.otr.error(a[0],!0):(this.their_keyid=a[1],this.their_priv_pk=a[2],this.m1_prime=null,this.m2_prime=null,this.c_prime=null,this.transmittedRS=!0,void this.akeSuccess(o));default:return}this.sendMsg(o,n,i)},sendMsg:function(t,i,s){var r=t+i,a=t===e.OTR_VERSION_3;return a&&(h.debug.call(this.otr,"instance tags"),r+=this.otr.our_instance_tag,r+=this.otr.their_instance_tag),r+=s,r=h.wrapMsg(r,this.otr.fragment_size,a,this.otr.our_instance_tag,this.otr.their_instance_tag),r[0]?this.otr.error(r[0]):void this.otr.io(r[1])},initiateAKE:function(t){h.debug.call(this.otr,"d-h commit message"),this.otr.trigger("status",[e.STATUS_AKE_INIT]),this.otr.authstate=e.AUTHSTATE_AWAITING_DHKEY;var i=h.packMPI(this.our_dh.publicKey);i=s.enc.Latin1.parse(i),this.r=r.randBigInt(128);var a=s.enc.Hex.parse(r.bigInt2str(this.r,16));a=s.enc.Latin1.stringify(a),this.myhashed=s.SHA256(i),this.myhashed=h.packData(this.myhashed.toString(s.enc.Latin1)),this.dhcommit=h.packData(h.encryptAes(i,a,h.packCtr(0))),this.dhcommit+=this.myhashed,this.sendMsg(t,"",this.dhcommit)}}}).call(this);
},{"../vendor/bigint.js":26,"../vendor/crypto.js":27,"./const.js":20,"./dsa.js":21,"./helpers.js":22}],20:[function(require,module,exports){
(function(){"use strict";var E=this,T={N:"FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA237327FFFFFFFFFFFFFFFF",G:"2",MSGSTATE_PLAINTEXT:0,MSGSTATE_ENCRYPTED:1,MSGSTATE_FINISHED:2,AUTHSTATE_NONE:0,AUTHSTATE_AWAITING_DHKEY:1,AUTHSTATE_AWAITING_REVEALSIG:2,AUTHSTATE_AWAITING_SIG:3,WHITESPACE_TAG:" 	  				 	 	 	  ",WHITESPACE_TAG_V2:"  		  	 ",WHITESPACE_TAG_V3:"  		  		",OTR_TAG:"?OTR",OTR_VERSION_1:"\x00",OTR_VERSION_2:"\x00",OTR_VERSION_3:"\x00",SMPSTATE_EXPECT0:0,SMPSTATE_EXPECT1:1,SMPSTATE_EXPECT2:2,SMPSTATE_EXPECT3:3,SMPSTATE_EXPECT4:4,STATUS_SEND_QUERY:0,STATUS_AKE_INIT:1,STATUS_AKE_SUCCESS:2,STATUS_END_OTR:3};"undefined"!=typeof module&&module.exports?module.exports=T:E.OTR.CONST=T}).call(this);
},{}],21:[function(require,module,exports){
var __dirname="/vendor/otr/lib";(function(){"use strict";function e(){var e=(new Date).getTime();return function(t){if(v&&"undefined"!=typeof console){var r=(new Date).getTime();console.log(t+": "+(r-e)),e=r}}}function t(e,r){var n=u.randBigInt(u.bitSize(r));return f.between(n,e,r)?n:t(e,r)}function r(e,t){var r,n=3e4,i=u.bitSize(e),a=u.primes;for(0===a.length&&(a=u.findPrimes(n)),I.length!=e.length&&(I=u.dup(e)),r=0;r<a.length&&a[r]<=n;r++)if(0===u.modInt(e,a[r])&&!u.equalsInt(e,a[r]))return 0;for(r=0;t>r;r++){for(u.randBigInt_(I,i,0);!u.greater(e,I);)u.randBigInt_(I,i,0);if(!u.millerRabin(e,I))return 0}return 1}function n(t){for(var n,i,a,s,o=e(),p=y[t].repeat,c=y[t].N,f=u.twoToThe(t-1),d=4*t,g=!1;;)if(n=u.randBigInt(c,1),n[0]|=1,r(n,p)){for(o("q"),s=0;d>s;s++)if(i=u.randBigInt(t,1),i[0]|=1,a=u.mod(i,n),a=u.sub(a,h),i=u.sub(i,a),!u.greater(f,i)&&r(i,p)){o("p"),w[t]={p:i,q:n},g=!0;break}if(g)break}for(var b,v=u.dup(l),I=u.sub(i,h),M=u.multMod(I,u.inverseMod(n,i),i);;){b=u.powMod(v,M,i);{if(!u.equals(b,h))return w[t].g=b,void o("g");v=u.add(v,h)}}throw new Error("Unreachable!")}function i(e,r){if(!(this instanceof i))return new i(e,r);if(r=r||{},e){var a=this;return["p","q","g","y","x"].forEach(function(t){a[t]=e[t]}),void(this.type=e.type||b)}var s=parseInt(r.bit_length?r.bit_length:1024,10);if(!y[s])throw new Error("Unsupported bit length.");w[s]||n(s),this.p=w[s].p,this.q=w[s].q,this.g=w[s].g,this.type=b,this.x=t(g,this.q),this.y=u.powMod(this.g,this.x,this.p),r.nocache&&(w[s]=null)}function a(e){var t,r;if(t=e.indexOf("("),r=e.lastIndexOf(")"),0>t||0>r)throw new Error("Malformed S-Expression");e=e.substring(t+1,r);var n=e.search(/\s/),i={type:e.substring(0,n),val:[]};if(e=e.substring(n+1,r),t=e.indexOf("("),0>t)i.val.push(e);else for(var s,o,u,p;t>-1;){for(s=t+1,o=e.length,u=1,p=0;o>s&&u>p;s++)"("===e[s]&&u++,")"===e[s]&&p++;i.val.push(a(e.substring(t,++s))),e=e.substring(++s),t=e.indexOf("(")}return i}function s(e){if(!e.type)throw new Error("Parse error.");var t,r;return"privkeys"===e.type?(t=[],e.val.forEach(function(e){t.push(s(e))}),t):(t={},e.val.forEach(function(e){r=e.val[0],"string"==typeof r?0===r.indexOf("#")&&(r=r.substring(1,r.lastIndexOf("#")),r=u.str2bigInt(r,16)):r=s(e),t[e.type]=r}),t)}var o,u,p,c,f,d=this;"undefined"!=typeof module&&module.exports?(module.exports=i,o=require("../vendor/crypto.js"),u=require("../vendor/bigint.js"),c=require("path").join(__dirname,"/dsa-webworker.js"),f=require("./helpers.js")):(Object.keys(d.DSA).forEach(function(e){i[e]=d.DSA[e]}),d.DSA=i,o=d.CryptoJS,u=d.BigInt,p=d.Worker,c="dsa-webworker.js",f=i.HLP);var g=u.str2bigInt("0",10),h=u.str2bigInt("1",10),l=u.str2bigInt("2",10),b="\x00\x00",v=!1,I=[],y={1024:{N:160,repeat:40},2048:{N:224,repeat:56}},w={};i.prototype={constructor:i,packPublic:function(){var e=this.type;return e+=f.packMPI(this.p),e+=f.packMPI(this.q),e+=f.packMPI(this.g),e+=f.packMPI(this.y)},packPrivate:function(){var e=this.packPublic()+f.packMPI(this.x);return e=o.enc.Latin1.parse(e),e.toString(o.enc.Base64)},generateNonce:function(e){var t=u.bigInt2bits(u.trim(this.x,0)),r=u.bigInt2bits(u.randBigInt(256)),n=o.algo.SHA256.create();n.update(o.enc.Latin1.parse(t)),n.update(e),n.update(o.enc.Latin1.parse(r));var i=n.finalize();return i=f.bits2bigInt(i.toString(o.enc.Latin1)),u.rightShift_(i,256-u.bitSize(this.q)),f.between(i,g,this.q)?i:this.generateNonce(e)},sign:function(e){e=o.enc.Latin1.parse(e);for(var t,r=u.str2bigInt(e.toString(o.enc.Hex),16),n=g,i=g;u.isZero(i)||u.isZero(n);)t=this.generateNonce(e),n=u.mod(u.powMod(this.g,t,this.p),this.q),u.isZero(n)||(i=u.inverseMod(t,this.q),i=u.mult(i,u.add(r,u.mult(this.x,n))),i=u.mod(i,this.q));return[n,i]},fingerprint:function(){var e=this.packPublic();return this.type===b&&(e=e.substring(2)),e=o.enc.Latin1.parse(e),o.SHA1(e).toString(o.enc.Hex)}},i.parsePublic=function(e,t){var r=["SHORT","MPI","MPI","MPI","MPI"];t&&r.push("MPI"),e=f.splitype(r,e);var n={type:e[0],p:f.readMPI(e[1]),q:f.readMPI(e[2]),g:f.readMPI(e[3]),y:f.readMPI(e[4])};return t&&(n.x=f.readMPI(e[5])),new i(n)},i.parsePrivate=function(e,t){return t?s(a(e))[0]["private-key"].dsa:(e=o.enc.Base64.parse(e),e=e.toString(o.enc.Latin1),i.parsePublic(e,!0))},i.verify=function(e,t,r,n){if(!f.between(r,g,e.q)||!f.between(n,g,e.q))return!1;var i=o.enc.Latin1.parse(t);i=u.str2bigInt(i.toString(o.enc.Hex),16);var a=u.inverseMod(n,e.q),s=u.multMod(i,a,e.q),p=u.multMod(r,a,e.q);s=u.powMod(e.g,s,e.p),p=u.powMod(e.y,p,e.p);var c=u.mod(u.multMod(s,p,e.p),e.q);return u.equals(c,r)},i.createInWebWorker=function(e,t){var r={path:c,seed:u.getSeed};e&&"object"==typeof e&&Object.keys(e).forEach(function(t){r[t]=e[t]});var n=new p(r.path);n.onmessage=function(e){var r=e.data;switch(r.type){case"debug":if(!v||"undefined"==typeof console)return;console.log(r.val);break;case"data":n.terminate(),t(i.parsePrivate(r.val));break;default:throw new Error("Unrecognized type.")}},n.postMessage({seed:r.seed(),imports:r.imports,debug:v})}}).call(this);
},{"../vendor/bigint.js":26,"../vendor/crypto.js":27,"./helpers.js":22,"path":42}],22:[function(require,module,exports){
(function(){"use strict";function n(n,t){var r=~(n^t);return r&=r>>16,r&=r>>8,r&=r>>4,r&=r>>2,r&=r>>1,1&r}var t,r,e=this,a={};"undefined"!=typeof module&&module.exports?(module.exports=a={},t=require("../vendor/crypto.js"),r=require("../vendor/bigint.js")):(e.OTR&&(e.OTR.HLP=a),e.DSA&&(e.DSA.HLP=a),t=e.CryptoJS,r=e.BigInt);var i={BYTE:1,SHORT:2,INT:4,CTR:8,MAC:20,SIG:40},u="?OTR",c=".",o=r.str2bigInt("2",10);a.debug=function(n){this.debug&&"function"!=typeof this.debug&&"undefined"!=typeof console&&console.log(n)},a.extend=function(n,t){function r(){this.constructor=n}for(var e in t)Object.hasOwnProperty.call(t,e)&&(n[e]=t[e]);r.prototype=t.prototype,n.prototype=new r,n.__super__=t.prototype},a.compare=function(t,r){if(t.length!==r.length)return!1;for(var e=0,a=0;e<t.length;e++)a|=t[e].charCodeAt(0)^r[e].charCodeAt(0);return n(a,0)},a.randomExponent=function(){return r.randBigInt(1536)},a.smpHash=function(n,r,e){var u=t.algo.SHA256.create();u.update(t.enc.Latin1.parse(a.packBytes(n,i.BYTE))),u.update(t.enc.Latin1.parse(a.packMPI(r))),e&&u.update(t.enc.Latin1.parse(a.packMPI(e)));var c=u.finalize();return a.bits2bigInt(c.toString(t.enc.Latin1))},a.makeMac=function(n,r){var e=t.enc.Latin1.parse(r),i=t.HmacSHA256(t.enc.Latin1.parse(n),e);return a.mask(i.toString(t.enc.Latin1),0,160)},a.make1Mac=function(n,r){var e=t.enc.Latin1.parse(r),a=t.HmacSHA1(t.enc.Latin1.parse(n),e);return a.toString(t.enc.Latin1)},a.encryptAes=function(n,r,e){var a={mode:t.mode.CTR,iv:t.enc.Latin1.parse(e),padding:t.pad.NoPadding},i=t.AES.encrypt(n,t.enc.Latin1.parse(r),a),u=t.enc.Base64.parse(i.toString());return t.enc.Latin1.stringify(u)},a.decryptAes=function(n,r,e){n=t.enc.Latin1.parse(n);var a={mode:t.mode.CTR,iv:t.enc.Latin1.parse(e),padding:t.pad.NoPadding};return t.AES.decrypt(t.enc.Base64.stringify(n),t.enc.Latin1.parse(r),a)},a.multPowMod=function(n,t,e,a,i){return r.multMod(r.powMod(n,t,i),r.powMod(e,a,i),i)},a.ZKP=function(n,t,e,i){return r.equals(t,a.smpHash(n,e,i))},a.GTOE=function(n,t){return r.equals(n,t)||r.greater(n,t)},a.between=function(n,t,e){return r.greater(n,t)&&r.greater(e,n)},a.checkGroup=function(n,t){return a.GTOE(n,o)&&a.GTOE(t,n)},a.h1=function(n,r){var e=t.algo.SHA1.create();return e.update(t.enc.Latin1.parse(n)),e.update(t.enc.Latin1.parse(r)),e.finalize().toString(t.enc.Latin1)},a.h2=function(n,r){var e=t.algo.SHA256.create();return e.update(t.enc.Latin1.parse(n)),e.update(t.enc.Latin1.parse(r)),e.finalize().toString(t.enc.Latin1)},a.mask=function(n,t,r){return n.substr(t/8,r/8)};var p=String.fromCharCode;a.packBytes=function(n,t){n=n.toString(16);for(var r,e="";t>0;t--)r=n.length?n.substr(-2,2):"0",n=n.substr(0,n.length-2),e=p(parseInt(r,16))+e;return e},a.packINT=function(n){return a.packBytes(n,i.INT)},a.packCtr=function(n){return a.padCtr(a.packBytes(n,i.CTR))},a.padCtr=function(n){return n+"\x00\x00\x00\x00\x00\x00\x00\x00"},a.unpackCtr=function(n){return n=a.toByteArray(n.substring(0,8)),a.unpack(n)},a.unpack=function(n){for(var t=0,r=0,e=n.length;e>r;r++)t=256*t+n[r];return t},a.packData=function(n){return a.packINT(n.length)+n},a.bits2bigInt=function(n){return n=a.toByteArray(n),r.ba2bigInt(n)},a.packMPI=function(n){return a.packData(r.bigInt2bits(r.trim(n,0)))},a.packSHORT=function(n){return a.packBytes(n,i.SHORT)},a.unpackSHORT=function(n){return n=a.toByteArray(n),a.unpack(n)},a.packTLV=function(n,t){return a.packSHORT(n)+a.packSHORT(t.length)+t},a.readLen=function(n){return n=a.toByteArray(n.substring(0,4)),a.unpack(n)},a.readData=function(n){var t=a.unpack(n.splice(0,4));return[t,n]},a.readMPI=function(n){return n=a.toByteArray(n),n=a.readData(n),r.ba2bigInt(n[1])},a.packMPIs=function(n){return n.reduce(function(n,t){return n+a.packMPI(t)},"")},a.unpackMPIs=function(n,t){for(var r=0,e=[];n>r;r++)e.push("MPI");return a.splitype(e,t).map(function(n){return a.readMPI(n)})},a.wrapMsg=function(n,r,e,i,o){n=t.enc.Base64.stringify(t.enc.Latin1.parse(n)),n=u+":"+n+c;var p;if(e&&(p="|",p+=a.readLen(i).toString(16),p+="|",p+=a.readLen(o).toString(16)),!r)return[null,n];var s=Math.ceil(n.length/r);if(s>65535)return["Too many fragments"];if(1==s)return[null,n];var f,d,g,l,y,h=[];for(f=1;s>=f;f++)d=(f-1)*r,g=f*r,l=n.slice(d,g),y=u,e&&(y+=p),y+=","+f+",",y+=s+",",y+=l+",",h.push(y);return[null,h]},a.splitype=function f(n,t){var r=[];return n.forEach(function(n){var e;switch(n){case"PUBKEY":e=f(["SHORT","MPI","MPI","MPI","MPI"],t).join("");break;case"DATA":case"MPI":e=t.substring(0,a.readLen(t)+4);break;default:e=t.substring(0,i[n])}r.push(e),t=t.substring(e.length)}),r};var s=function(){for(var n=0,t={};256>n;++n)t[String.fromCharCode(n)]=n;for(n=128;256>n;++n)t[String.fromCharCode(63232+n)]=n;return t}();a.toByteArray=function(n){for(var t=[],r=n.split(""),e=-1,a=r.length,i=a%8;i--;)++e,t[e]=s[r[e]];for(i=a>>3;i--;)t.push(s[r[++e]],s[r[++e]],s[r[++e]],s[r[++e]],s[r[++e]],s[r[++e]],s[r[++e]],s[r[++e]]);return t}}).call(this);
},{"../vendor/bigint.js":26,"../vendor/crypto.js":27}],23:[function(require,module,exports){
var __dirname="/vendor/otr/lib";(function(){"use strict";function t(e){if(!(this instanceof t))return new t(e);if(e=e||{},e.priv&&!(e.priv instanceof _))throw new Error("Requires long-lived DSA key.");if(this.priv=e.priv?e.priv:new _,this.fragment_size=e.fragment_size||0,this.fragment_size<0)throw new Error("Fragment size must be a positive integer.");if(this.send_interval=e.send_interval||0,this.send_interval<0)throw new Error("Send interval must be a positive integer.");this.outgoing=[],this.our_instance_tag=e.instance_tag||t.makeInstanceTag(),this.debug=!!e.debug,this.smw=e.smw,this.init();var s=this;["sendMsg","receiveMsg"].forEach(function(t){s[t]=s[t].bind(s)}),i.call(this)}var e,s,i,r,n,o,a,h,c,u,_,d=this;"undefined"!=typeof module&&module.exports?(module.exports=t,e=require("../vendor/crypto.js"),s=require("../vendor/bigint.js"),i=require("../vendor/eventemitter.js"),n=require("path").join(__dirname,"/sm-webworker.js"),o=require("./const.js"),a=require("./helpers.js"),h=require("./parse.js"),c=require("./ake.js"),u=require("./sm.js"),_=require("./dsa.js"),t.CONST=o):(Object.keys(d.OTR).forEach(function(e){t[e]=d.OTR[e]}),d.OTR=t,e=d.CryptoJS,s=d.BigInt,i=d.EventEmitter,r=d.Worker,n="sm-webworker.js",o=t.CONST,a=t.HLP,h=t.Parse,c=t.AKE,u=t.SM,_=d.DSA);var g=s.str2bigInt(o.G,10),p=s.str2bigInt(o.N,16),y=Math.pow(2,53)-1,T=Math.pow(2,31)-1;a.extend(t,i),t.prototype.init=function(){this.msgstate=o.MSGSTATE_PLAINTEXT,this.authstate=o.AUTHSTATE_NONE,this.ALLOW_V2=!0,this.ALLOW_V3=!0,this.REQUIRE_ENCRYPTION=!1,this.SEND_WHITESPACE_TAG=!1,this.WHITESPACE_START_AKE=!1,this.ERROR_START_AKE=!1,h.initFragment(this),this.their_y=null,this.their_old_y=null,this.their_keyid=0,this.their_priv_pk=null,this.their_instance_tag="\x00\x00\x00\x00",this.our_dh=this.dh(),this.our_old_dh=this.dh(),this.our_keyid=2,this.sessKeys=[new Array(2),new Array(2)],this.storedMgs=[],this.oldMacKeys=[],this.sm=null,this._akeInit(),this.receivedPlaintext=!1},t.prototype._akeInit=function(){this.ake=new c(this),this.transmittedRS=!1,this.ssid=null},t.prototype._SMW=function(t,e){this.otr=t;var i={path:n,seed:s.getSeed};"object"==typeof t.smw&&Object.keys(t.smw).forEach(function(e){i[e]=t.smw[e]}),this.worker=new r(i.path);var o=this;this.worker.onmessage=function(t){var e=t.data;e&&o.trigger(e.method,e.args)},this.worker.postMessage({type:"seed",seed:i.seed(),imports:i.imports}),this.worker.postMessage({type:"init",reqs:e})},a.extend(t.prototype._SMW,i),["handleSM","rcvSecret","abort"].forEach(function(e){t.prototype._SMW.prototype[e]=function(){this.worker.postMessage({type:"method",method:e,args:Array.prototype.slice.call(arguments,0)})}}),t.prototype._smInit=function(){var t={ssid:this.ssid,our_fp:this.priv.fingerprint(),their_fp:this.their_priv_pk.fingerprint(),debug:this.debug};this.smw?(this.sm&&this.sm.worker.terminate(),this.sm=new this._SMW(this,t)):this.sm=new u(t);var e=this;["trust","abort","question"].forEach(function(t){e.sm.on(t,function(){e.trigger("smp",[t].concat(Array.prototype.slice.call(arguments)))})}),this.sm.on("send",function(t,s){e.ssid===t&&(s=e.prepareMsg(s),e.io(s))})},t.prototype.io=function(t,e){t=[].concat(t).map(function(t){return{msg:t,meta:e}}),this.outgoing=this.outgoing.concat(t);var s=this;!function i(t){if(!t){if(!s.outgoing.length)return;var e=s.outgoing.shift();s.trigger("io",[e.msg,e.meta])}setTimeout(i,t?0:s.send_interval)}(!0)},t.prototype.dh=function(){var t={privateKey:s.randBigInt(320)};return t.publicKey=s.powMod(g,t.privateKey,p),t},t.prototype.DHSession=function m(t,i){if(!(this instanceof m))return new m(t,i);var r=s.powMod(i,t.privateKey,p),n=a.packMPI(r);this.id=a.mask(a.h2("\x00",n),0,64);var o=s.greater(t.publicKey,i),h=o?"":"",c=o?"":"";this.sendenc=a.mask(a.h1(h,n),0,128),this.sendmac=e.SHA1(e.enc.Latin1.parse(this.sendenc)),this.sendmac=this.sendmac.toString(e.enc.Latin1),this.rcvenc=a.mask(a.h1(c,n),0,128),this.rcvmac=e.SHA1(e.enc.Latin1.parse(this.rcvenc)),this.rcvmac=this.rcvmac.toString(e.enc.Latin1),this.rcvmacused=!1,this.extra_symkey=a.h2("ÿ",n),this.send_counter=0,this.rcv_counter=0},t.prototype.rotateOurKeys=function(){var t=this;this.sessKeys[1].forEach(function(e){e&&e.rcvmacused&&t.oldMacKeys.push(e.rcvmac)}),this.our_old_dh=this.our_dh,this.our_dh=this.dh(),this.our_keyid+=1,this.sessKeys[1][0]=this.sessKeys[0][0],this.sessKeys[1][1]=this.sessKeys[0][1],this.sessKeys[0]=[this.their_y?new this.DHSession(this.our_dh,this.their_y):null,this.their_old_y?new this.DHSession(this.our_dh,this.their_old_y):null]},t.prototype.rotateTheirKeys=function(t){this.their_keyid+=1;var e=this;this.sessKeys.forEach(function(t){t[1]&&t[1].rcvmacused&&e.oldMacKeys.push(t[1].rcvmac)}),this.their_old_y=this.their_y,this.sessKeys[0][1]=this.sessKeys[0][0],this.sessKeys[1][1]=this.sessKeys[1][0],this.their_y=t,this.sessKeys[0][0]=new this.DHSession(this.our_dh,this.their_y),this.sessKeys[1][0]=new this.DHSession(this.our_old_dh,this.their_y)},t.prototype.prepareMsg=function(t,s){if(this.msgstate!==o.MSGSTATE_ENCRYPTED||0===this.their_keyid)return this.error("Not ready to encrypt.");var i=this.sessKeys[1][0];if(i.send_counter>=y)return this.error("Should have rekeyed by now.");i.send_counter+=1;var r=a.packCtr(i.send_counter),n=this.ake.otr_version+"",h=this.ake.otr_version===o.OTR_VERSION_3;if(h&&(n+=this.our_instance_tag,n+=this.their_instance_tag),n+="\x00",n+=a.packINT(this.our_keyid-1),n+=a.packINT(this.their_keyid),n+=a.packMPI(this.our_dh.publicKey),n+=r.substring(0,8),Math.ceil(t.length/8)>=T)return this.error("Message is too long.");var c=a.encryptAes(e.enc.Latin1.parse(t),i.sendenc,r);return n+=a.packData(c),n+=a.make1Mac(n,i.sendmac),n+=a.packData(this.oldMacKeys.splice(0).join("")),n=a.wrapMsg(n,this.fragment_size,h,this.our_instance_tag,this.their_instance_tag),n[0]?this.error(n[0]):(s&&this.trigger("file",["send",i.extra_symkey,s]),n[1])},t.prototype.handleDataMsg=function(t){var s=t.version+t.type;this.ake.otr_version===o.OTR_VERSION_3&&(s+=t.instance_tags);var i=["BYTE","INT","INT","MPI","CTR","DATA","MAC","DATA"];t=a.splitype(i,t.msg);var r=""===t[0];if(this.msgstate!==o.MSGSTATE_ENCRYPTED||8!==t.length)return void(r||this.error("Received an unreadable encrypted message.",!0));var n=this.our_keyid-a.readLen(t[2]),h=this.their_keyid-a.readLen(t[1]);if(0>n||n>1)return void(r||this.error("Not of our latest keys.",!0));if(0>h||h>1)return void(r||this.error("Not of your latest keys.",!0));var c=h?this.their_old_y:this.their_y;if(1===h&&!c)return void(r||this.error("Do not have that key."));var u=this.sessKeys[n][h],_=a.unpackCtr(t[4]);if(_<=u.rcv_counter)return void(r||this.error("Counter in message is not larger."));u.rcv_counter=_,s+=t.slice(0,6).join("");var d=a.make1Mac(s,u.rcvmac);if(!a.compare(t[6],d))return void(r||this.error("MACs do not match."));u.rcvmacused=!0;var g=a.decryptAes(t[5].substring(4),u.rcvenc,a.padCtr(t[4]));g=g.toString(e.enc.Latin1),n||this.rotateOurKeys(),h||this.rotateTheirKeys(a.readMPI(t[3]));var p=g.indexOf("\x00");return~p&&(this.handleTLVs(g.substring(p+1),u),g=g.substring(0,p)),g=e.enc.Latin1.parse(g),g.toString(e.enc.Utf8)},t.prototype.handleTLVs=function(t,s){for(var i,r,n;t.length&&(i=a.unpackSHORT(t.substr(0,2)),r=a.unpackSHORT(t.substr(2,2)),n=t.substr(4,r),!(n.length<r));){switch(i){case 1:this.msgstate=o.MSGSTATE_FINISHED,this.trigger("status",[o.STATUS_END_OTR]);break;case 2:case 3:case 4:case 5:case 6:case 7:if(this.msgstate!==o.MSGSTATE_ENCRYPTED)return void(this.sm&&this.sm.abort());this.sm||this._smInit(),this.sm.handleSM({msg:n,type:i});break;case 8:n=n.substring(4),n=e.enc.Latin1.parse(n),n=n.toString(e.enc.Utf8),this.trigger("file",["receive",s.extra_symkey,n])}t=t.substring(4+r)}},t.prototype.smpSecret=function(t,s){return this.msgstate!==o.MSGSTATE_ENCRYPTED?this.error("Must be encrypted for SMP."):"string"!=typeof t||t.length<1?this.error("Secret is required."):(this.sm||this._smInit(),t=e.enc.Utf8.parse(t).toString(e.enc.Latin1),s=e.enc.Utf8.parse(s).toString(e.enc.Latin1),void this.sm.rcvSecret(t,s))},t.prototype.sendQueryMsg=function(){var t={},e=o.OTR_TAG;this.ALLOW_V2&&(t[2]=!0),this.ALLOW_V3&&(t[3]=!0);var s=Object.keys(t);s.length&&(e+="v",s.forEach(function(t){"1"!==t&&(e+=t)}),e+="?"),this.io(e),this.trigger("status",[o.STATUS_SEND_QUERY])},t.prototype.sendMsg=function(t,s){switch((this.REQUIRE_ENCRYPTION||this.msgstate!==o.MSGSTATE_PLAINTEXT)&&(t=e.enc.Utf8.parse(t),t=t.toString(e.enc.Latin1)),this.msgstate){case o.MSGSTATE_PLAINTEXT:if(this.REQUIRE_ENCRYPTION)return this.storedMgs.push({msg:t,meta:s}),void this.sendQueryMsg();this.SEND_WHITESPACE_TAG&&!this.receivedPlaintext&&(t+=o.WHITESPACE_TAG,this.ALLOW_V3&&(t+=o.WHITESPACE_TAG_V3),this.ALLOW_V2&&(t+=o.WHITESPACE_TAG_V2));break;case o.MSGSTATE_FINISHED:return this.storedMgs.push({msg:t,meta:s}),void this.error("Message cannot be sent at this time.");case o.MSGSTATE_ENCRYPTED:t=this.prepareMsg(t);break;default:throw new Error("Unknown message state.")}t&&this.io(t,s)},t.prototype.receiveMsg=function(t){if(t=h.parseMsg(this,t)){switch(t.cls){case"error":return void this.error(t.msg);case"ake":if(t.version===o.OTR_VERSION_3&&this.checkInstanceTags(t.instance_tags))return;return void this.ake.handleAKE(t);case"data":if(t.version===o.OTR_VERSION_3&&this.checkInstanceTags(t.instance_tags))return;t.msg=this.handleDataMsg(t),t.encrypted=!0;break;case"query":this.msgstate===o.MSGSTATE_ENCRYPTED&&this._akeInit(),this.doAKE(t);break;default:(this.REQUIRE_ENCRYPTION||this.msgstate!==o.MSGSTATE_PLAINTEXT)&&this.error("Received an unencrypted message."),this.receivedPlaintext=!0,this.WHITESPACE_START_AKE&&t.ver.length>0&&this.doAKE(t)}t.msg&&this.trigger("ui",[t.msg,!!t.encrypted])}},t.prototype.checkInstanceTags=function(t){var e=a.readLen(t.substr(0,4)),s=a.readLen(t.substr(4,4));if(s&&s!==a.readLen(this.our_instance_tag))return!0;if(a.readLen(this.their_instance_tag)){if(a.readLen(this.their_instance_tag)!==e)return!0}else{if(100>e)return!0;this.their_instance_tag=a.packINT(e)}},t.prototype.doAKE=function(t){this.ALLOW_V3&&~t.ver.indexOf(o.OTR_VERSION_3)?this.ake.initiateAKE(o.OTR_VERSION_3):this.ALLOW_V2&&~t.ver.indexOf(o.OTR_VERSION_2)?this.ake.initiateAKE(o.OTR_VERSION_2):this.error("OTR conversation requested, but no compatible protocol version found.")},t.prototype.error=function(t,e){return e?(this.debug||(t="An OTR error has occurred."),t="?OTR Error:"+t,void this.io(t)):void this.trigger("error",[t])},t.prototype.sendStored=function(){var t=this;this.storedMgs.splice(0).forEach(function(e){var s=t.prepareMsg(e.msg);t.io(s,e.meta)})},t.prototype.sendFile=function(t){if(this.msgstate!==o.MSGSTATE_ENCRYPTED)return this.error("Not ready to encrypt.");if(this.ake.otr_version!==o.OTR_VERSION_3)return this.error("Protocol v3 required.");if(!t)return this.error("Please specify a filename.");var s=e.enc.Utf8.parse(t);if(s=s.toString(e.enc.Latin1),s.length>=65532)return this.error("filename is too long.");var i="\x00";i+="\x00\b",i+=a.packSHORT(4+s.length),i+="\x00\x00\x00",i+=s,i=this.prepareMsg(i,t),this.io(i)},t.prototype.endOtr=function(){this.msgstate===o.MSGSTATE_ENCRYPTED&&(this.sendMsg("\x00\x00\x00\x00"),this.sm&&(this.smw&&this.sm.worker.terminate(),this.sm=null)),this.msgstate=o.MSGSTATE_PLAINTEXT,this.receivedPlaintext=!1,this.trigger("status",[o.STATUS_END_OTR])},t.makeInstanceTag=function(){var e=s.randBigInt(32);return s.greater(s.str2bigInt("100",16),e)?t.makeInstanceTag():a.packINT(parseInt(s.bigInt2str(e,10),10))}}).call(this);
},{"../vendor/bigint.js":26,"../vendor/crypto.js":27,"../vendor/eventemitter.js":28,"./ake.js":19,"./const.js":20,"./dsa.js":21,"./helpers.js":22,"./parse.js":24,"./sm.js":25,"path":42}],24:[function(require,module,exports){
(function(){"use strict";var r,n,s,t=this,e={};"undefined"!=typeof module&&module.exports?(module.exports=e,r=require("../vendor/crypto.js"),n=require("./const.js"),s=require("./helpers.js")):(t.OTR.Parse=e,r=t.CryptoJS,n=t.OTR.CONST,s=t.OTR.HLP);var i={};i[n.WHITESPACE_TAG_V2]=n.OTR_VERSION_2,i[n.WHITESPACE_TAG_V3]=n.OTR_VERSION_3,e.parseMsg=function(t,e){var a=[],g=e.indexOf(n.OTR_TAG);if(!~g){if(this.initFragment(t),c=e.indexOf(n.WHITESPACE_TAG),~c){e=e.split(""),e.splice(c,16);for(var u,f=e.length;f>c;)u=e.slice(c,c+8).join(""),Object.hasOwnProperty.call(i,u)?(e.splice(c,8),a.push(i[u])):c+=8;e=e.join("")}return{msg:e,ver:a}}var c=g+n.OTR_TAG.length,p=e[c];if(","===p||"|"===p)return this.msgFragment(t,e.substring(c+1),"|"===p);if(this.initFragment(t),~["?","v"].indexOf(p)){"?"===e[c]&&(a.push(n.OTR_VERSION_1),c+=1);var O={2:n.OTR_VERSION_2,3:n.OTR_VERSION_3},m=e.substring(c+1),o=m.indexOf("?");return o>=1&&(m=m.substring(0,o).split(""),"v"===e[c]&&m.forEach(function(r){Object.hasOwnProperty.call(O,r)&&a.push(O[r])})),{cls:"query",ver:a}}if(":"===p){c+=1;var T=e.substring(c,c+4);if(T.length<4)return{msg:e};T=r.enc.Base64.parse(T).toString(r.enc.Latin1);var l=T.substring(0,2),h=T.substring(2);if(!t["ALLOW_V"+s.unpackSHORT(l)])return{msg:e};c+=4;var _=e.substring(c).indexOf(".");if(!~_)return{msg:e};e=r.enc.Base64.parse(e.substring(c,c+_)),e=r.enc.Latin1.stringify(e);var R;l===n.OTR_VERSION_3&&(R=e.substring(0,8),e=e.substring(8));var v;return~["","\n","",""].indexOf(h)?v="ake":""===h&&(v="data"),{version:l,type:h,msg:e,cls:v,instance_tags:R}}return" Error:"===e.substring(c,c+7)?(t.ERROR_START_AKE&&t.sendQueryMsg(),{msg:e.substring(c+7),cls:"error"}):{msg:e}},e.initFragment=function(r){r.fragment={s:"",j:0,k:0}},e.msgFragment=function(r,n,t){if(n=n.split(","),t){var e=n.shift().split("|"),i=s.packINT(parseInt(e[0],16)),a=s.packINT(parseInt(e[1],16));if(r.checkInstanceTags(i+a))return}if(!(n.length<4||isNaN(parseInt(n[0],10))||isNaN(parseInt(n[1],10)))){var g=parseInt(n[0],10),u=parseInt(n[1],10);return n=n[2],g>u||0===u||0===g?void this.initFragment(r):(1===g?(this.initFragment(r),r.fragment={k:1,n:u,s:n}):u===r.fragment.n&&g===r.fragment.k+1?(r.fragment.s+=n,r.fragment.k+=1):this.initFragment(r),u===g?(n=r.fragment.s,this.initFragment(r),this.parseMsg(r,n)):void 0)}}}).call(this);
},{"../vendor/crypto.js":27,"./const.js":20,"./helpers.js":22}],25:[function(require,module,exports){
(function(){"use strict";function t(s){return this instanceof t?(this.version=1,this.our_fp=s.our_fp,this.their_fp=s.their_fp,this.ssid=s.ssid,this.debug=!!s.debug,void this.init()):new t(s)}var s,i,o,e,h,r=this;"undefined"!=typeof module&&module.exports?(module.exports=t,s=require("../vendor/crypto.js"),i=require("../vendor/bigint.js"),o=require("../vendor/eventemitter.js"),e=require("./const.js"),h=require("./helpers.js")):(r.OTR.SM=t,s=r.CryptoJS,i=r.BigInt,o=r.EventEmitter,e=r.OTR.CONST,h=r.OTR.HLP);var p=i.str2bigInt(e.G,10),n=i.str2bigInt(e.N,16),a=i.sub(n,i.str2bigInt("2",10)),u=i.sub(n,i.str2bigInt("1",10));i.divInt_(u,2),h.extend(t,o),t.prototype.init=function(){this.smpstate=e.SMPSTATE_EXPECT1,this.secret=null},t.prototype.makeSecret=function(t,i){var o=s.algo.SHA256.create();o.update(s.enc.Latin1.parse(h.packBytes(this.version,1))),o.update(s.enc.Hex.parse(t?this.our_fp:this.their_fp)),o.update(s.enc.Hex.parse(t?this.their_fp:this.our_fp)),o.update(s.enc.Latin1.parse(this.ssid)),o.update(s.enc.Latin1.parse(i));var e=o.finalize();this.secret=h.bits2bigInt(e.toString(s.enc.Latin1))},t.prototype.makeG2s=function(){this.a2=h.randomExponent(),this.a3=h.randomExponent(),this.g2a=i.powMod(p,this.a2,n),this.g3a=i.powMod(p,this.a3,n),h.checkGroup(this.g2a,a)&&h.checkGroup(this.g3a,a)||this.makeG2s()},t.prototype.computeGs=function(t,s){this.g2=i.powMod(t,this.a2,n),this.g3=i.powMod(s,this.a3,n)},t.prototype.computePQ=function(t){this.p=i.powMod(this.g3,t,n),this.q=h.multPowMod(p,t,this.g2,this.secret,n)},t.prototype.computeR=function(){this.r=i.powMod(this.QoQ,this.a3,n)},t.prototype.computeRab=function(t){return i.powMod(t,this.a3,n)},t.prototype.computeC=function(t,s){return h.smpHash(t,i.powMod(p,s,n))},t.prototype.computeD=function(t,s,o){return i.subMod(t,i.multMod(s,o,u),u)},t.prototype.handleSM=function(t){var o,r,u,c,d,m,g,P,M,E,T,b,l,f,S={2:e.SMPSTATE_EXPECT1,3:e.SMPSTATE_EXPECT2,4:e.SMPSTATE_EXPECT3,5:e.SMPSTATE_EXPECT4,7:e.SMPSTATE_EXPECT1};if(6===t.type)return this.init(),void this.trigger("abort");if(this.smpstate!==S[t.type])return this.abort();switch(this.smpstate){case e.SMPSTATE_EXPECT1:h.debug.call(this,"smp tlv 2");var k,w;return 7===t.type&&(k=t.msg.indexOf("\x00"),w=t.msg.substring(0,k),t.msg=t.msg.substring(k+1)),l=h.readLen(t.msg.substr(0,4)),6!==l?this.abort():(t=h.unpackMPIs(6,t.msg.substring(4)),h.checkGroup(t[0],a)&&h.checkGroup(t[3],a)&&h.ZKP(1,t[1],h.multPowMod(p,t[2],t[0],t[1],n))&&h.ZKP(2,t[4],h.multPowMod(p,t[5],t[3],t[4],n))?(this.g3ao=t[3],this.makeG2s(),r=h.randomExponent(),u=h.randomExponent(),this.c2=this.computeC(3,r),this.c3=this.computeC(4,u),this.d2=this.computeD(r,this.a2,this.c2),this.d3=this.computeD(u,this.a3,this.c3),this.computeGs(t[0],t[3]),this.smpstate=e.SMPSTATE_EXPECT0,w=s.enc.Latin1.parse(w).toString(s.enc.Utf8),void this.trigger("question",[w])):this.abort());case e.SMPSTATE_EXPECT2:if(h.debug.call(this,"smp tlv 3"),l=h.readLen(t.msg.substr(0,4)),11!==l)return this.abort();if(t=h.unpackMPIs(11,t.msg.substring(4)),!(h.checkGroup(t[0],a)&&h.checkGroup(t[3],a)&&h.checkGroup(t[6],a)&&h.checkGroup(t[7],a)))return this.abort();if(!h.ZKP(3,t[1],h.multPowMod(p,t[2],t[0],t[1],n)))return this.abort();if(!h.ZKP(4,t[4],h.multPowMod(p,t[5],t[3],t[4],n)))return this.abort();if(this.g3ao=t[3],this.computeGs(t[0],t[3]),d=h.multPowMod(this.g3,t[9],t[6],t[8],n),m=h.multPowMod(p,t[9],this.g2,t[10],n),m=i.multMod(m,i.powMod(t[7],t[8],n),n),!h.ZKP(5,t[8],d,m))return this.abort();var v=h.randomExponent();this.computePQ(v);var _=h.randomExponent(),x=h.randomExponent(),C=h.multPowMod(p,_,this.g2,x,n),y=h.smpHash(6,i.powMod(this.g3,_,n),C),G=this.computeD(_,v,y),I=this.computeD(x,this.secret,y);this.QoQ=i.divMod(this.q,t[7],n),this.PoP=i.divMod(this.p,t[6],n),this.computeR(),c=h.randomExponent(),E=i.powMod(this.QoQ,c,n),T=h.smpHash(7,i.powMod(p,c,n),E),b=this.computeD(c,this.a3,T),this.smpstate=e.SMPSTATE_EXPECT4,o=h.packINT(8)+h.packMPIs([this.p,this.q,y,G,I,this.r,T,b]),o=h.packTLV(4,o);break;case e.SMPSTATE_EXPECT3:if(h.debug.call(this,"smp tlv 4"),l=h.readLen(t.msg.substr(0,4)),8!==l)return this.abort();if(t=h.unpackMPIs(8,t.msg.substring(4)),!h.checkGroup(t[0],a)||!h.checkGroup(t[1],a)||!h.checkGroup(t[5],a))return this.abort();if(d=h.multPowMod(this.g3,t[3],t[0],t[2],n),m=h.multPowMod(p,t[3],this.g2,t[4],n),m=i.multMod(m,i.powMod(t[1],t[2],n),n),!h.ZKP(6,t[2],d,m))return this.abort();if(g=h.multPowMod(p,t[7],this.g3ao,t[6],n),this.QoQ=i.divMod(t[1],this.q,n),P=h.multPowMod(this.QoQ,t[7],t[5],t[6],n),!h.ZKP(7,t[6],g,P))return this.abort();this.computeR(),c=h.randomExponent(),E=i.powMod(this.QoQ,c,n),T=h.smpHash(8,i.powMod(p,c,n),E),b=this.computeD(c,this.a3,T),o=h.packINT(3)+h.packMPIs([this.r,T,b]),o=h.packTLV(5,o),M=this.computeRab(t[5]),f=!!i.equals(M,i.divMod(t[0],this.p,n)),this.trigger("trust",[f,"answered"]),this.init();break;case e.SMPSTATE_EXPECT4:return h.debug.call(this,"smp tlv 5"),l=h.readLen(t.msg.substr(0,4)),3!==l?this.abort():(t=h.unpackMPIs(3,t.msg.substring(4)),h.checkGroup(t[0],a)?(g=h.multPowMod(p,t[2],this.g3ao,t[1],n),P=h.multPowMod(this.QoQ,t[2],t[0],t[1],n),h.ZKP(8,t[1],g,P)?(M=this.computeRab(t[0]),f=!!i.equals(M,this.PoP),this.trigger("trust",[f,"asked"]),void this.init()):this.abort()):this.abort())}this.sendMsg(o)},t.prototype.sendMsg=function(t){this.trigger("send",[this.ssid,"\x00"+t])},t.prototype.rcvSecret=function(t,s){h.debug.call(this,"receive secret");var i,o=!1;this.smpstate===e.SMPSTATE_EXPECT0?i=this.answer:(i=this.initiate,o=!0),this.makeSecret(o,t),i.call(this,s)},t.prototype.answer=function(){h.debug.call(this,"smp answer");var t=h.randomExponent();this.computePQ(t);var s=h.randomExponent(),o=h.randomExponent(),r=h.multPowMod(p,s,this.g2,o,n),a=h.smpHash(5,i.powMod(this.g3,s,n),r),u=this.computeD(s,t,a),c=this.computeD(o,this.secret,a);this.smpstate=e.SMPSTATE_EXPECT3;var d=h.packINT(11)+h.packMPIs([this.g2a,this.c2,this.d2,this.g3a,this.c3,this.d3,this.p,this.q,a,u,c]);this.sendMsg(h.packTLV(3,d))},t.prototype.initiate=function(t){h.debug.call(this,"smp initiate"),this.smpstate!==e.SMPSTATE_EXPECT1&&this.abort(),this.makeG2s();var s=h.randomExponent(),i=h.randomExponent();this.c2=this.computeC(1,s),this.c3=this.computeC(2,i),this.d2=this.computeD(s,this.a2,this.c2),this.d3=this.computeD(i,this.a3,this.c3),this.smpstate=e.SMPSTATE_EXPECT2;var o="",r=2;t&&(o+=t,o+="\x00",r=7),o+=h.packINT(6)+h.packMPIs([this.g2a,this.c2,this.d2,this.g3a,this.c3,this.d3]),this.sendMsg(h.packTLV(r,o))},t.prototype.abort=function(){this.init(),this.sendMsg(h.packTLV(6,"")),this.trigger("abort")}}).call(this);
},{"../vendor/bigint.js":26,"../vendor/crypto.js":27,"../vendor/eventemitter.js":28,"./const.js":20,"./helpers.js":22}],26:[function(require,module,exports){
!function(n,r){"function"==typeof define&&define.amd?define(r.bind(n,n.crypto||n.msCrypto)):"undefined"!=typeof module&&module.exports?module.exports=r(require("crypto")):n.BigInt=r(n.crypto||n.msCrypto)}(this,function(n){function r(n){var r,t,e,o;for(t=new Array(n),r=0;n>r;r++)t[r]=0;for(t[0]=2,e=0;t[e]<n;){for(r=t[e]*t[e];n>r;r+=t[e])t[r]=1;for(e++,t[e]=t[e-1]+1;t[e]<n&&t[t[e]];t[e]++);}for(o=new Array(e),r=0;e>r;r++)o[r]=t[r];return o}function t(n,r){var t,e,o,f;if(sr.length!=n.length&&(sr=S(n),wr=S(n),Ar=S(n)),R(Ar,r),R(wr,n),R(sr,n),q(wr,-1),q(sr,-1),B(wr))return 0;for(o=0;0==wr[o];o++);for(t=1,e=2;wr[o]%e==0;e*=2,t++);if(f=o*tr+t-1,f&&E(wr,f),H(Ar,wr,n),!I(Ar,1)&&!x(Ar,sr)){for(e=1;f-1>=e&&!x(Ar,sr);){if(D(Ar,n),I(Ar,1))return 0;e++}if(!x(Ar,sr))return 0}return 1}function e(n){var r,t,e;for(r=n.length-1;0==n[r]&&r>0;r--);for(t=0,e=n[r];e;e>>=1,t++);return t+=tr*r}function o(n,r){var t=b(0,(n.length>r?n.length:r)*tr,0);return R(t,n),t}function f(n,r){var t=S(n);return Z(t,r),F(t,1)}function l(n,r){var t=o(n,n.length+r.length);return U(t,r),F(t,1)}function i(n,r,t){var e=o(n,t.length);return H(e,F(r,2),F(t,2),0),F(e,1)}function u(n,r){var t=o(n,n.length>r.length?n.length+1:r.length+1);return K(t,r),F(t,1)}function h(n,r){var t=o(n,n.length>r.length?n.length+1:r.length+1);return N(t,r),F(t,1)}function g(n,r){var t,e=o(n,r.length);return t=d(e,r),t?F(e,1):null}function a(n,r,t){var e=o(n,t.length);return j(e,r,t),F(e,1)}function c(n,r){var t,e;return t=Math.floor((n-1)/tr)+2,e=b(0,0,t),v(e,n,r),e}function v(n,r,t){var e,o;for(e=0;e<n.length;e++)n[e]=0;for(o=Math.floor((r-1)/tr)+1,e=0;o>e;e++)n[e]=rr(tr);n[o-1]&=(2<<(r-1)%tr)-1,1==t&&(n[o-1]|=1<<(r-1)%tr)}function d(n,r){var t=1+2*Math.max(n.length,r.length);if(!(1&n[0]||1&r[0]))return _(n,0),0;for(pr.length!=t&&(pr=new Array(t),mr=new Array(t),br=new Array(t),Mr=new Array(t),Ir=new Array(t),xr=new Array(t)),R(pr,n),R(mr,r),_(br,1),_(Mr,0),_(Ir,0),_(xr,1);;){for(;!(1&pr[0]);)T(pr),1&br[0]||1&Mr[0]?(N(br,r),T(br),K(Mr,n),T(Mr)):(T(br),T(Mr));for(;!(1&mr[0]);)T(mr),1&Ir[0]||1&xr[0]?(N(Ir,r),T(Ir),K(xr,n),T(xr)):(T(Ir),T(xr));if(A(mr,pr)?(K(mr,pr),K(Ir,br),K(xr,Mr)):(K(pr,mr),K(br,Ir),K(Mr,xr)),I(pr,0)){for(;s(Ir);)N(Ir,r);return R(n,Ir),I(mr,1)?1:(_(n,0),0)}}}function y(n,r){for(var t=1,e=0;;){if(1==n)return t;if(0==n)return 0;if(e-=t*Math.floor(r/n),r%=n,1==r)return e;if(0==r)return 0;t-=e*Math.floor(n/r),n%=r}}function s(n){return n[n.length-1]>>tr-1&1}function w(n,r,t){var e,o=n.length,f=r.length,l=f>o+t?o+t:f;for(e=f-1-t;o>e&&e>=0;e++)if(n[e]>0)return 1;for(e=o-1+t;f>e;e++)if(r[e]>0)return 0;for(e=l-1;e>=t;e--){if(n[e-t]>r[e])return 1;if(n[e-t]<r[e])return 0}return 0}function A(n,r){var t,e=n.length<r.length?n.length:r.length;for(t=n.length;t<r.length;t++)if(r[t])return 0;for(t=r.length;t<n.length;t++)if(n[t])return 1;for(t=e-1;t>=0;t--){if(n[t]>r[t])return 1;if(n[t]<r[t])return 0}return 0}function m(n,r,t,e){var o,f,l,i,u,h,g,a;for(R(e,n),f=r.length;0==r[f-1];f--);for(a=r[f-1],g=0;a;g++)a>>=1;for(g=tr-g,k(r,g),k(e,g),o=e.length;0==e[o-1]&&o>f;o--);for(_(t,0);!w(r,e,o-f);)G(e,r,o-f),t[o-f]++;for(l=o-1;l>=f;l--){for(t[l-f]=e[l]==r[f-1]?or:Math.floor((e[l]*er+e[l-1])/r[f-1]);u=(f>1?r[f-2]:0)*t[l-f],h=u,u&=or,h=(h-u)/er,i=h+t[l-f]*r[f-1],h=i,i&=or,h=(h-i)/er,h==e[l]?i==e[l-1]?u>(l>1?e[l-2]:0):i>e[l-1]:h>e[l];)t[l-f]--;V(e,r,-t[l-f],l-f),s(e)&&(z(e,r,l-f),t[l-f]--)}E(r,g),E(e,g)}function p(n,r){var t,e=0;for(t=n.length-1;t>=0;t--)e=(e*er+n[t])%r;return e}function b(n,r,t){var e,o;return e=Math.ceil(r/tr)+1,e=t>e?t:e,o=new Array(e),_(o,n),o}function M(n,r,t){var e,o,f,l,i,u=n.length;if(-1==r){for(f=new Array(0);;){for(l=new Array(f.length+1),o=0;o<f.length;o++)l[o+1]=f[o];if(l[0]=parseInt(n,10),f=l,e=n.indexOf(",",0),1>e)break;if(n=n.substring(e+1),0==n.length)break}return f.length<t?(l=new Array(t),R(l,f),l):f}for(var h=r,g=0,a=1==r?u:0;h>1;)1&h&&(g=1),a+=u,h>>=1;for(a+=g*u,f=b(0,a,0),o=0;u>o&&(e=fr.indexOf(n.substring(o,o+1),0),36>=r&&e>=36&&(e-=26),!(e>=r||0>e));o++)O(f,r),q(f,e);for(u=f.length;u>0&&!f[u-1];u--);for(u=t>u+1?t:u+1,l=new Array(u),i=u<f.length?u:f.length,o=0;i>o;o++)l[o]=f[o];for(;u>o;o++)l[o]=0;return l}function I(n,r){var t;if(n[0]!=r)return 0;for(t=1;t<n.length;t++)if(n[t])return 0;return 1}function x(n,r){var t,e=n.length<r.length?n.length:r.length;for(t=0;e>t;t++)if(n[t]!=r[t])return 0;if(n.length>r.length){for(;t<n.length;t++)if(n[t])return 0}else for(;t<r.length;t++)if(r[t])return 0;return 1}function B(n){var r;for(r=0;r<n.length;r++)if(n[r])return 0;return 1}function C(n,r){var t,e,o="";if(vr.length!=n.length?vr=S(n):R(vr,n),-1==r){for(t=n.length-1;t>0;t--)o+=n[t]+",";o+=n[0]}else for(;!B(vr);)e=P(vr,r),o=fr.substring(e,e+1)+o;return 0==o.length&&(o="0"),o}function S(n){var r;return r=new Array(n.length),R(r,n),r}function R(n,r){var t,e=n.length<r.length?n.length:r.length;for(t=0;e>t;t++)n[t]=r[t];for(t=e;t<n.length;t++)n[t]=0}function _(n,r){var t,e;for(e=r,t=0;t<n.length;t++)n[t]=e&or,e>>=tr}function q(n,r){var t,e,o,f;for(n[0]+=r,e=n.length,o=0,t=0;e>t;t++)if(o+=n[t],f=0,0>o&&(f=o&or,f=-((o-f)/er),o+=f*er),n[t]=o&or,o=(o-n[t])/er-f,!o)return}function E(n,r){var t,e=Math.floor(r/tr);if(e){for(t=0;t<n.length-e;t++)n[t]=n[t+e];for(;t<n.length;t++)n[t]=0;r%=tr}for(t=0;t<n.length-1;t++)n[t]=or&(n[t+1]<<tr-r|n[t]>>r);n[t]>>=r}function T(n){var r;for(r=0;r<n.length-1;r++)n[r]=or&(n[r+1]<<tr-1|n[r]>>1);n[r]=n[r]>>1|n[r]&er>>1}function k(n,r){var t,e=Math.floor(r/tr);if(e){for(t=n.length;t>=e;t--)n[t]=n[t-e];for(;t>=0;t--)n[t]=0;r%=tr}if(r){for(t=n.length-1;t>0;t--)n[t]=or&(n[t]<<r|n[t-1]>>tr-r);n[t]=or&n[t]<<r}}function O(n,r){var t,e,o,f;if(r)for(e=n.length,o=0,t=0;e>t;t++)o+=n[t]*r,f=0,0>o&&(f=o&or,f=-((o-f)/er),o+=f*er),n[t]=o&or,o=(o-n[t])/er-f}function P(n,r){var t,e,o=0;for(t=n.length-1;t>=0;t--)e=o*er+n[t],n[t]=Math.floor(e/r),o=e%r;return o}function V(n,r,t,e){var o,f,l,i;for(l=n.length<e+r.length?n.length:e+r.length,i=n.length,f=0,o=e;l>o;o++)f+=n[o]+t*r[o-e],n[o]=f&or,f=(f-n[o])/er;for(o=l;f&&i>o;o++)f+=n[o],n[o]=f&or,f=(f-n[o])/er}function z(n,r,t){var e,o,f,l;for(f=n.length<t+r.length?n.length:t+r.length,l=n.length,o=0,e=t;f>e;e++)o+=n[e]+r[e-t],n[e]=o&or,o=(o-n[e])/er;for(e=f;o&&l>e;e++)o+=n[e],n[e]=o&or,o=(o-n[e])/er}function G(n,r,t){var e,o,f,l;for(f=n.length<t+r.length?n.length:t+r.length,l=n.length,o=0,e=t;f>e;e++)o+=n[e]-r[e-t],n[e]=o&or,o=(o-n[e])/er;for(e=f;o&&l>e;e++)o+=n[e],n[e]=o&or,o=(o-n[e])/er}function K(n,r){var t,e,o;for(o=n.length<r.length?n.length:r.length,e=0,t=0;o>t;t++)e+=n[t]-r[t],n[t]=e&or,e=(e-n[t])/er;for(t=o;e&&t<n.length;t++)e+=n[t],n[t]=e&or,e=(e-n[t])/er}function N(n,r){var t,e,o;for(o=n.length<r.length?n.length:r.length,e=0,t=0;o>t;t++)e+=n[t]+r[t],n[t]=e&or,e=(e-n[t])/er;for(t=o;e&&t<n.length;t++)e+=n[t],n[t]=e&or,e=(e-n[t])/er}function U(n,r){var t;for(ur.length!=2*n.length&&(ur=new Array(2*n.length)),_(ur,0),t=0;t<r.length;t++)r[t]&&V(ur,n,r[t],t);R(n,ur)}function Z(n,r){ar.length!=n.length?ar=S(n):R(ar,n),cr.length!=n.length&&(cr=S(n)),m(ar,r,cr,n)}function j(n,r,t){var e;for(hr.length!=2*n.length&&(hr=new Array(2*n.length)),_(hr,0),e=0;e<r.length;e++)r[e]&&V(hr,n,r[e],e);Z(hr,t),R(n,hr)}function D(n,r){var t,e,o,f,l;for(f=n.length;f>0&&!n[f-1];f--);for(l=f>r.length?2*f:2*r.length,hr.length!=l&&(hr=new Array(l)),_(hr,0),t=0;f>t;t++){for(o=hr[2*t]+n[t]*n[t],hr[2*t]=o&or,o=(o-hr[2*t])/er,e=t+1;f>e;e++)o=hr[t+e]+2*n[t]*n[e]+o,hr[t+e]=o&or,o=(o-hr[t+e])/er;hr[t+f]=o}Z(hr,r),R(n,hr)}function F(n,r){var t,e;for(t=n.length;t>0&&!n[t-1];t--);return e=new Array(t+r),R(e,n),e}function H(n,r,t){var e,o,f,l;if(dr.length!=t.length&&(dr=S(t)),0!=(1&t[0])){for(_(dr,0),f=t.length;f>0&&!t[f-1];f--);for(l=er-y(p(t,er),er),dr[f]=1,j(n,dr,t),gr.length!=n.length?gr=S(n):R(gr,n),e=r.length-1;e>0&!r[e];e--);if(0==r[e])return void _(n,1);for(o=1<<tr-1;o&&!(r[e]&o);o>>=1);for(;;){if(!(o>>=1)){if(e--,0>e)return void J(n,lr,t,l);o=1<<tr-1}J(n,n,t,l),o&r[e]&&J(n,gr,t,l)}}else for(R(dr,n),_(n,1);!I(r,0);)1&r[0]&&j(n,dr,t),P(r,2),D(dr,t)}function J(n,r,t,e){var o,f,l,i,u,h,g,a=t.length,c=r.length;for(yr.length!=a&&(yr=new Array(a)),_(yr,0);a>0&&0==t[a-1];a--);for(;c>0&&0==r[c-1];c--);for(g=yr.length-1,o=0;a>o;o++){for(u=yr[0]+n[o]*r[0],i=(u&or)*e&or,l=u+i*t[0],l=(l-(l&or))/er,u=n[o],f=1;c-4>f;)l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++;for(;c>f;)l+=yr[f]+i*t[f]+u*r[f],h=yr[f-1]=l&or,l=(l-h)/er,f++;for(;a-4>f;)l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++,l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++;for(;a>f;)l+=yr[f]+i*t[f],h=yr[f-1]=l&or,l=(l-h)/er,f++;for(;g>f;)l+=yr[f],h=yr[f-1]=l&or,l=(l-h)/er,f++;yr[f-1]=l&or}A(t,yr)||K(yr,t),R(n,yr)}function L(n,r,t){return a(n,g(r,t),t)}function Q(n,r,t){return n=f(n,t),r=f(r,t),A(r,n)&&(n=h(n,t)),u(n,r)}function W(n){for(var r=Math.floor(n/tr)+2,t=new Array(r),e=0;r>e;e++)t[e]=0;return t[r-2]=1<<n%tr,t}function X(n,r){r||(r=0),n=S(n);for(var t="";!B(n);)t=Cr[255&n[0]]+t,E(n,8);for(;t.length<r;)t="\x00"+t;return t}function Y(n){var r=M("0",10,n.length);return n.forEach(function(n,t){t&&k(r,8),r[0]|=n}),r}function $(){return Sr(40)}function nr(){return Sr(1)[0]}function rr(n){if(n>31)throw new Error("Too many bits.");var r=0,t=0,e=Math.floor(n/8),o=(1<<n%8)-1;for(o&&(t=nr()&o);e>r;r++)t=256*t+nr();return t}var tr=26,er=1<<tr,or=er-1,fr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-",lr=b(1,1,1),ir=new Array(0),ur=ir,hr=ir,gr=ir,ar=ir,cr=ir,vr=ir,dr=ir,yr=ir,sr=ir,wr=ir,Ar=ir,mr=ir,pr=ir,br=ir,Mr=ir,Ir=ir,xr=ir,Br=ir,Cr=function(){for(var n=0,r={};256>n;++n)r[n]=String.fromCharCode(n);return r}(),Sr=function(){if("undefined"!=typeof n&&"function"==typeof n.randomBytes)return function(r){try{var t=n.randomBytes(r)}catch(e){throw e}return Array.prototype.slice.call(t,0)};if("undefined"!=typeof n&&"function"==typeof n.getRandomValues)return function(r){var t=new Uint8Array(r);return n.getRandomValues(t),Array.prototype.slice.call(t,0)};throw new Error("Keys should not be generated without CSPRNG.")}();return{str2bigInt:M,bigInt2str:C,int2bigInt:b,multMod:a,powMod:i,inverseMod:g,randBigInt:c,randBigInt_:v,equals:x,equalsInt:I,sub:u,mod:f,modInt:p,mult:l,divInt_:P,rightShift_:E,dup:S,greater:A,add:h,isZero:B,bitSize:e,millerRabin:t,divide_:m,trim:F,primes:Br,findPrimes:r,getSeed:$,divMod:L,subMod:Q,twoToThe:W,bigInt2bits:X,ba2bigInt:Y}});
},{"crypto":48}],27:[function(require,module,exports){
!function(t,e){"function"==typeof define&&define.amd?define(e):"undefined"!=typeof module&&module.exports?module.exports=e():t.CryptoJS=e()}(this,function(){var t=t||function(t,e){var r={},i=r.lib={},n=i.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var r=new t;return e&&r.mixIn(e),r.hasOwnProperty("init")||(r.init=function(){r.$super.init.apply(this,arguments)}),r.init.prototype=r,r.$super=this,r},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),s=i.WordArray=n.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var s=0;n>s;s++){var o=r[s>>>2]>>>24-s%4*8&255;e[i+s>>>2]|=o<<24-(i+s)%4*8}else if(r.length>65535)for(var s=0;n>s;s+=4)e[i+s>>>2]=r[s>>>2];else e.push.apply(e,r);return this.sigBytes+=n,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=n.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r=[],i=0;e>i;i+=4)r.push(4294967296*t.random()|0);return new s.init(r,e)}}),o=r.enc={},c=o.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;r>n;n++){var s=e[n>>>2]>>>24-n%4*8&255;i.push((s>>>4).toString(16)),i.push((15&s).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;e>i;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new s.init(r,e/2)}},a=o.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;r>n;n++){var s=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(s))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;e>i;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new s.init(r,e)}},h=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},f=i.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,i=r.words,n=r.sigBytes,o=this.blockSize,c=4*o,a=n/c;a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0);var h=a*o,f=t.min(4*h,n);if(h){for(var u=0;h>u;u+=o)this._doProcessBlock(i,u);var l=i.splice(0,h);r.sigBytes-=f}return new s.init(l,f)},clone:function(){var t=n.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),u=(i.Hasher=f.extend({cfg:n.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new u.HMAC.init(t,r).finalize(e)}}}),r.algo={});return r}(Math);return function(){{var e=t,r=e.lib,i=r.WordArray,n=e.enc;n.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],s=0;r>s;s+=3)for(var o=e[s>>>2]>>>24-s%4*8&255,c=e[s+1>>>2]>>>24-(s+1)%4*8&255,a=e[s+2>>>2]>>>24-(s+2)%4*8&255,h=o<<16|c<<8|a,f=0;4>f&&r>s+.75*f;f++)n.push(i.charAt(h>>>6*(3-f)&63));var u=i.charAt(64);if(u)for(;n.length%4;)n.push(u);return n.join("")},parse:function(t){var e=t.length,r=this._map,n=r.charAt(64);if(n){var s=t.indexOf(n);-1!=s&&(e=s)}for(var o=[],c=0,a=0;e>a;a++)if(a%4){var h=r.indexOf(t.charAt(a-1))<<a%4*2,f=r.indexOf(t.charAt(a))>>>6-a%4*2;o[c>>>2]|=(h|f)<<24-c%4*8,c++}return i.create(o,c)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}}(),t.lib.Cipher||function(e){var r=t,i=r.lib,n=i.Base,s=i.WordArray,o=i.BufferedBlockAlgorithm,c=r.enc,a=(c.Utf8,c.Base64),h=r.algo,f=h.EvpKDF,u=i.Cipher=o.extend({cfg:n.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?S:m}return function(e){return{encrypt:function(r,i,n){return t(i).encrypt(e,r,i,n)},decrypt:function(r,i,n){return t(i).decrypt(e,r,i,n)}}}}()}),l=(i.StreamCipher=u.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),r.mode={}),d=i.BlockCipherMode=n.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),p=l.CBC=function(){function t(t,r,i){var n=this._iv;if(n){var s=n;this._iv=e}else var s=this._prevBlock;for(var o=0;i>o;o++)t[r+o]^=s[o]}var r=d.extend();return r.Encryptor=r.extend({processBlock:function(e,r){var i=this._cipher,n=i.blockSize;t.call(this,e,r,n),i.encryptBlock(e,r),this._prevBlock=e.slice(r,r+n)}}),r.Decryptor=r.extend({processBlock:function(e,r){var i=this._cipher,n=i.blockSize,s=e.slice(r,r+n);i.decryptBlock(e,r),t.call(this,e,r,n),this._prevBlock=s}}),r}(),v=r.pad={},_=v.Pkcs7={pad:function(t,e){for(var r=4*e,i=r-t.sigBytes%r,n=i<<24|i<<16|i<<8|i,o=[],c=0;i>c;c+=4)o.push(n);var a=s.create(o,i);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(i.BlockCipher=u.extend({cfg:u.cfg.extend({mode:p,padding:_}),reset:function(){u.reset.call(this);var t=this.cfg,e=t.iv,r=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var i=r.createEncryptor;else{var i=r.createDecryptor;this._minBufferSize=1}this._mode=i.call(r,this,e&&e.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else{var e=this._process(!0);t.unpad(e)}return e},blockSize:4}),i.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),g=r.format={},B=g.OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;if(r)var i=s.create([1398893684,1701076831]).concat(r).concat(e);else var i=e;return i.toString(a)},parse:function(t){var e=a.parse(t),r=e.words;if(1398893684==r[0]&&1701076831==r[1]){var i=s.create(r.slice(2,4));r.splice(0,4),e.sigBytes-=16}return y.create({ciphertext:e,salt:i})}},m=i.SerializableCipher=n.extend({cfg:n.extend({format:B}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),s=n.finalize(e),o=n.cfg;return y.create({ciphertext:s,key:r,iv:o.iv,algorithm:t,mode:o.mode,padding:o.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=t.createDecryptor(r,i).finalize(e.ciphertext);return n},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),k=r.kdf={},x=k.OpenSSL={execute:function(t,e,r,i){i||(i=s.random(8));var n=f.create({keySize:e+r}).compute(t,i),o=s.create(n.words.slice(e),4*r);return n.sigBytes=4*e,y.create({key:n,iv:o,salt:i})}},S=i.PasswordBasedCipher=m.extend({cfg:m.cfg.extend({kdf:x}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=i.kdf.execute(r,t.keySize,t.ivSize);i.iv=n.iv;var s=m.encrypt.call(this,t,e,n.key,i);return s.mixIn(n),s},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=i.kdf.execute(r,t.keySize,t.ivSize,e.salt);i.iv=n.iv;var s=m.decrypt.call(this,t,e,n.key,i);return s}})}(),function(){var e=t,r=e.lib,i=r.BlockCipher,n=e.algo,s=[],o=[],c=[],a=[],h=[],f=[],u=[],l=[],d=[],p=[];!function(){for(var t=[],e=0;256>e;e++)t[e]=128>e?e<<1:e<<1^283;for(var r=0,i=0,e=0;256>e;e++){var n=i^i<<1^i<<2^i<<3^i<<4;n=n>>>8^255&n^99,s[r]=n,o[n]=r;var v=t[r],_=t[v],y=t[_],g=257*t[n]^16843008*n;c[r]=g<<24|g>>>8,a[r]=g<<16|g>>>16,h[r]=g<<8|g>>>24,f[r]=g;var g=16843009*y^65537*_^257*v^16843008*r;u[n]=g<<24|g>>>8,l[n]=g<<16|g>>>16,d[n]=g<<8|g>>>24,p[n]=g,r?(r=v^t[t[t[y^v]]],i^=t[t[i]]):r=i=1}}();var v=[0,1,2,4,8,16,32,64,128,27,54],_=n.AES=i.extend({_doReset:function(){for(var t=this._key,e=t.words,r=t.sigBytes/4,i=this._nRounds=r+6,n=4*(i+1),o=this._keySchedule=[],c=0;n>c;c++)if(r>c)o[c]=e[c];else{var a=o[c-1];c%r?r>6&&c%r==4&&(a=s[a>>>24]<<24|s[a>>>16&255]<<16|s[a>>>8&255]<<8|s[255&a]):(a=a<<8|a>>>24,a=s[a>>>24]<<24|s[a>>>16&255]<<16|s[a>>>8&255]<<8|s[255&a],a^=v[c/r|0]<<24),o[c]=o[c-r]^a}for(var h=this._invKeySchedule=[],f=0;n>f;f++){var c=n-f;if(f%4)var a=o[c];else var a=o[c-4];h[f]=4>f||4>=c?a:u[s[a>>>24]]^l[s[a>>>16&255]]^d[s[a>>>8&255]]^p[s[255&a]]}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,c,a,h,f,s)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,u,l,d,p,o);var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,s,o,c){for(var a=this._nRounds,h=t[e]^r[0],f=t[e+1]^r[1],u=t[e+2]^r[2],l=t[e+3]^r[3],d=4,p=1;a>p;p++){var v=i[h>>>24]^n[f>>>16&255]^s[u>>>8&255]^o[255&l]^r[d++],_=i[f>>>24]^n[u>>>16&255]^s[l>>>8&255]^o[255&h]^r[d++],y=i[u>>>24]^n[l>>>16&255]^s[h>>>8&255]^o[255&f]^r[d++],g=i[l>>>24]^n[h>>>16&255]^s[f>>>8&255]^o[255&u]^r[d++];h=v,f=_,u=y,l=g}var v=(c[h>>>24]<<24|c[f>>>16&255]<<16|c[u>>>8&255]<<8|c[255&l])^r[d++],_=(c[f>>>24]<<24|c[u>>>16&255]<<16|c[l>>>8&255]<<8|c[255&h])^r[d++],y=(c[u>>>24]<<24|c[l>>>16&255]<<16|c[h>>>8&255]<<8|c[255&f])^r[d++],g=(c[l>>>24]<<24|c[h>>>16&255]<<16|c[f>>>8&255]<<8|c[255&u])^r[d++];t[e]=v,t[e+1]=_,t[e+2]=y,t[e+3]=g},keySize:8});e.AES=i._createHelper(_)}(),function(){var e=t,r=e.lib,i=r.WordArray,n=r.Hasher,s=e.algo,o=[],c=s.SHA1=n.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],s=r[2],c=r[3],a=r[4],h=0;80>h;h++){if(16>h)o[h]=0|t[e+h];else{var f=o[h-3]^o[h-8]^o[h-14]^o[h-16];o[h]=f<<1|f>>>31}var u=(i<<5|i>>>27)+a+o[h];u+=20>h?(n&s|~n&c)+1518500249:40>h?(n^s^c)+1859775393:60>h?(n&s|n&c|s&c)-1894007588:(n^s^c)-899497514,a=c,c=s,s=n<<30|n>>>2,n=i,i=u}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+s|0,r[3]=r[3]+c|0,r[4]=r[4]+a|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[(i+64>>>9<<4)+14]=Math.floor(r/4294967296),e[(i+64>>>9<<4)+15]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=n.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA1=n._createHelper(c),e.HmacSHA1=n._createHmacHelper(c)}(),function(e){var r=t,i=r.lib,n=i.WordArray,s=i.Hasher,o=r.algo,c=[],a=[];!function(){function t(t){for(var r=e.sqrt(t),i=2;r>=i;i++)if(!(t%i))return!1;return!0}function r(t){return 4294967296*(t-(0|t))|0}for(var i=2,n=0;64>n;)t(i)&&(8>n&&(c[n]=r(e.pow(i,.5))),a[n]=r(e.pow(i,1/3)),n++),i++}();var h=[],f=o.SHA256=s.extend({_doReset:function(){this._hash=new n.init(c.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],s=r[2],o=r[3],c=r[4],f=r[5],u=r[6],l=r[7],d=0;64>d;d++){if(16>d)h[d]=0|t[e+d];else{var p=h[d-15],v=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,_=h[d-2],y=(_<<15|_>>>17)^(_<<13|_>>>19)^_>>>10;h[d]=v+h[d-7]+y+h[d-16]}var g=c&f^~c&u,B=i&n^i&s^n&s,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),k=(c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25),x=l+k+g+a[d]+h[d],S=m+B;l=u,u=f,f=c,c=o+x|0,o=s,s=n,n=i,i=x+S|0}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+s|0,r[3]=r[3]+o|0,r[4]=r[4]+c|0,r[5]=r[5]+f|0,r[6]=r[6]+u|0,r[7]=r[7]+l|0},_doFinalize:function(){var t=this._data,r=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;return r[n>>>5]|=128<<24-n%32,r[(n+64>>>9<<4)+14]=e.floor(i/4294967296),r[(n+64>>>9<<4)+15]=i,t.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=s.clone.call(this);return t._hash=this._hash.clone(),t}});r.SHA256=s._createHelper(f),r.HmacSHA256=s._createHmacHelper(f)}(Math),function(){{var e=t,r=e.lib,i=r.Base,n=e.enc,s=n.Utf8,o=e.algo;o.HMAC=i.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=s.parse(e));var r=t.blockSize,i=4*r;e.sigBytes>i&&(e=t.finalize(e)),e.clamp();for(var n=this._oKey=e.clone(),o=this._iKey=e.clone(),c=n.words,a=o.words,h=0;r>h;h++)c[h]^=1549556828,a[h]^=909522486;n.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);e.reset();var i=e.finalize(this._oKey.clone().concat(r));return i}})}}(),t.pad.NoPadding={pad:function(){},unpad:function(){}},t.mode.CTR=function(){var e=t.lib.BlockCipherMode.extend(),r=e.Encryptor=e.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,s=this._counter;n&&(s=this._counter=n.slice(0),this._iv=void 0);var o=s.slice(0);r.encryptBlock(o,0),s[i-1]=s[i-1]+1|0;for(var c=0;i>c;c++)t[e+c]^=o[c]}});return e.Decryptor=r,e}(),t});
},{}],28:[function(require,module,exports){
(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var r=e.prototype;r.getListeners=function(e){var t,n,r=this._getEvents();if("object"==typeof e){t={};for(n in r)r.hasOwnProperty(n)&&e.test(n)&&(t[n]=r[n])}else t=r[e]||(r[e]=[]);return t},r.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},r.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},r.addListener=function(e,n){var r,i=this.getListenersAsObject(e),s="object"==typeof n;for(r in i)i.hasOwnProperty(r)&&-1===t(i[r],n)&&i[r].push(s?n:{listener:n,once:!1});return this},r.on=n("addListener"),r.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},r.once=n("addOnceListener"),r.defineEvent=function(e){return this.getListeners(e),this},r.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},r.removeListener=function(e,n){var r,i,s=this.getListenersAsObject(e);for(i in s)s.hasOwnProperty(i)&&(r=t(s[i],n),-1!==r&&s[i].splice(r,1));return this},r.off=n("removeListener"),r.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},r.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},r.manipulateListeners=function(e,t,n){var r,i,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(r=n.length;r--;)s.call(this,t,n[r]);else for(r in t)t.hasOwnProperty(r)&&(i=t[r])&&("function"==typeof i?s.call(this,r,i):o.call(this,r,i));return this},r.removeEvent=function(e){var t,n=typeof e,r=this._getEvents();if("string"===n)delete r[e];else if("object"===n)for(t in r)r.hasOwnProperty(t)&&e.test(t)&&delete r[t];else delete this._events;return this},r.emitEvent=function(e,t){var n,r,i,s,o=this.getListenersAsObject(e);for(i in o)if(o.hasOwnProperty(i))for(r=o[i].length;r--;)n=o[i][r],n.once===!0&&this.removeListener(e,n.listener),s=n.listener.apply(this,t||[]),s===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},r.trigger=n("emitEvent"),r.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},r.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},r._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},r._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this);
},{}],29:[function(require,module,exports){
var $,Backbone,CallRequest,Media,Templates,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),Media=require("../utils/media.coffee"),CallRequest=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.initialize=function(e){return this.options=e||{}},t.prototype.events={"click .accept":"accept_call","click .reject":"reject_call"},t.prototype.render=function(){var e;switch(this.$el.html(Templates["user/call_request"].render({user:this.model.toJSON(),type:this.options.type})),this.$el.find(".call-request").modal({backdrop:!1,keyboard:!1}),this.options.type){case"video":e=new Media({audio:!0,video:!0});break;case"audio":e=new Media({audio:!0,video:!1})}return e.on("success",function(e){return function(){return e.$el.find(".accept").fadeIn(),e.$el.find(".reject").fadeIn()}}(this)),this},t.prototype.accept_call=function(){return this.trigger("accepted",this.model),this.$el.find(".call-request").modal("hide"),this.$el.find(".call-request").on("hidden.bs.modal",function(e){return function(){return e.remove()}}(this))},t.prototype.reject_call=function(){return this.trigger("rejected",this.model),this.$el.find(".call-request").modal("hide"),this.$el.find(".call-request").on("hidden.bs.modal",function(e){return function(){return e.remove()}}(this))},t}(Backbone.View),module.exports=CallRequest;

},{"../templates.js":6,"../utils/media.coffee":8,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],30:[function(require,module,exports){
var $,Backbone,Home,Roster,ServerSentEvents,Sidebar,Templates,User,UserView,Users,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,r){function t(){this.constructor=e}for(var n in r)__hasProp.call(r,n)&&(e[n]=r[n]);return t.prototype=r.prototype,e.prototype=new t,e.__super__=r.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),User=require("../models/user.coffee"),Sidebar=require("./sidebar.coffee"),UserView=require("./user_view.coffee"),ServerSentEvents=require("../utils/sse.coffee"),Users=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.model=User,r}(Backbone.Collection),Roster=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.initialize=function(){return this.views={},this.collection.bind("add",function(e){return function(r){return $("#placeholder").hide(),e.views[r.id]=new UserView({model:r}),e.$el.append(e.views[r.id].render().el)}}(this)),this.collection.bind("remove",function(e){return function(r){return e.views[r.id].remove()}}(this))},r.prototype.render=function(){return this},r}(Backbone.View),Home=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.id="home",r.prototype.initialize=function(){return this.sse=new ServerSentEvents("home",this.model.id)},r.prototype.render=function(){var e,r,t;return this.$el.html(Templates["layout/home"].render({user:this.model.toJSON(),host:ENV.host})),t=new Sidebar({model:this.model}),this.$el.find("#navbar").html(t.render().el),e=new Users,r=new Roster({collection:e}),this.$el.find("#roster").html(r.render().el),this.sse.on("home",function(r){return function(t){var n,o;return o=e.get(t.src.id),o&&e.remove(o),n=new User(t.src,{parent:r.model}),e.add(n),n.ack("home")}}(this)),this.sse.on("ack",function(r){return function(t){var n,o;return o=e.get(t.src.id),o&&e.remove(o),n=new User(t.src,{parent:r.model}),e.add(n),n.handshake()}}(this)),this.sse.on("profile-"+this.model.id,function(r){return function(t){var n,o;return o=e.get(t.src.id),o&&e.remove(o),n=new User(t.src,{parent:r.model}),e.add(n),n.handshake()}}(this)),this.sse.on("otr",function(){return function(r){var t;return t=e.get(r.src),t.otr.receiveMsg(r.body),t.on("data:disconnected",function(){return e.remove(t)})}}(this)),window.beforeunload.push(function(){return function(){return e.forEach(function(e){return e.disconnect()})}}(this)),this},r}(Backbone.View),module.exports=Home;

},{"../models/user.coffee":5,"../templates.js":6,"../utils/sse.coffee":10,"../vendor/bootstrap-3.1.1.js":13,"./sidebar.coffee":38,"./user_view.coffee":39,"backbone":"8vo2L+","jquery":"zjX7fi"}],31:[function(require,module,exports){
var $,Backbone,MessageInput,Templates,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),MessageInput=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.events={keypress:"keypress"},t.prototype.render=function(){return this.$el.html(Templates["chat/input"].render()),this},t.prototype.keypress=function(e){return 13===e.keyCode?this.send():void 0},t.prototype.send=function(){var e,t;return t=this.$el.find("#textbox")[0],e=t.value,""!==e?(t.value="",this.trigger("message",e)):void 0},t}(Backbone.View),module.exports=MessageInput;

},{"../templates.js":6,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],32:[function(require,module,exports){
var $,Backbone,MessageItemView,Templates,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),MessageItemView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.tagName="li",t.prototype.render=function(){return this.$el.html(Templates["chat/message"].render(this.model.toJSON())),this},t}(Backbone.View),module.exports=MessageItemView;

},{"../templates.js":6,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],33:[function(require,module,exports){
var $,Backbone,MessageItemView,MessagesView,__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,MessageItemView=require("./message_item.coffee"),MessagesView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.tagName="ul",t.prototype.initialize=function(){return this.collection.bind("add",function(e){return function(t){return e.$el.append(new MessageItemView({model:t}).render().el)}}(this))},t.prototype.render=function(){return this},t}(Backbone.View),module.exports=MessagesView;

},{"./message_item.coffee":32,"backbone":"8vo2L+","jquery":"zjX7fi"}],34:[function(require,module,exports){
var $,Backbone,OneToOne,Templates,adapter,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,t){function o(){this.constructor=e}for(var r in t)__hasProp.call(t,r)&&(e[r]=t[r]);return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),adapter=require("../utils/adapter.coffee"),OneToOne=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.id="one-to-one",t.prototype.initialize=function(){return this.audio=!0,this.video=!0,this.fullscreen=!1},t.prototype.events={"click #hangup":"hangup","click #toggle-audio":"toggleAudio","click #toggle-video":"toggleVideo","click #toggle-fullscreen":"toggleFullscreen"},t.prototype.toggleFullscreen=function(){return this.fullscreen?this.exitFullscreen:this.enterFullscreen},t.prototype.enterFullscreen=function(){return this.fullscreen=!0,document.documentElement.webkitRequestFullscreen()},t.prototype.exitFullscreen=function(){return this.fullscreen=!1,document.documentElement.webkitExitFullscreen()},t.prototype.toggleAudio=function(){var e,t;return this.model.toggleAudio(),e=this.$el.find("#toggle-audio"),e.toggleClass("muted fa-microphone-slash fa-microphone"),t=e.hasClass("muted")?"OFF":"ON",e.attr("data-original-title","Microphone is "+t),this.$el.find(".tip").tooltip("hide")},t.prototype.toggleVideo=function(){var e,t;return this.model.toggleVideo(),e=this.$el.find("#toggle-video"),e.toggleClass("muted fa-video-camera fa-eye-slash"),t=e.hasClass("muted")?"OFF":"ON",e.attr("data-original-title","Camera is "+t),this.$el.find(".tip").tooltip("hide")},t.prototype.hangup=function(){return this.model.videochannel.disconnect()},t.prototype.render=function(){return this.$el.html(Templates["user/one_to_one"].render()),this.$el.find(".tip").tooltip(),adapter.attachMediaStream(this.$el.find("#local")[0],localStream),adapter.attachMediaStream(this.$el.find("#remote")[0],this.model.remoteVideoStream),this},t}(Backbone.View),module.exports=OneToOne;

},{"../templates.js":6,"../utils/adapter.coffee":7,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],35:[function(require,module,exports){
var $,Backbone,OneToOneAudio,Templates,adapter,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,t){function o(){this.constructor=e}for(var r in t)__hasProp.call(t,r)&&(e[r]=t[r]);return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),adapter=require("../utils/adapter.coffee"),OneToOneAudio=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.events={"click .hangup":"hangup"},t.prototype.hangup=function(){return this.model.audiochannel.disconnect()},t.prototype.render=function(){return this.$el.html(Templates["user/one_to_one_audio"].render(this.model.toJSON())),adapter.attachMediaStream(this.$el.find(".stream")[0],this.model.remoteAudioStream),this},t}(Backbone.View),module.exports=OneToOneAudio;

},{"../templates.js":6,"../utils/adapter.coffee":7,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],36:[function(require,module,exports){
var $,Backbone,Profile,ServerSentEvents,Sidebar,Templates,User,UserView,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,r){function t(){this.constructor=e}for(var o in r)__hasProp.call(r,o)&&(e[o]=r[o]);return t.prototype=r.prototype,e.prototype=new t,e.__super__=r.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),User=require("../models/user.coffee"),Sidebar=require("./sidebar.coffee"),UserView=require("./user_view.coffee"),ServerSentEvents=require("../utils/sse.coffee"),Profile=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,e),r.prototype.id="profile",r.prototype.initialize=function(e){return this.model=e.model,this.profile_user=e.profile_user,this.sse=new ServerSentEvents("profile-"+this.profile_user.get("id"))},r.prototype.render=function(){var e,r;return this.$el.html(Templates["layout/profile"].render(this.profile_user.toJSON())),r=new User(this.profile_user.toJSON(),{parent:this.model,active:!1}),this.$el.find("#singleuser").html(new UserView({model:this.profile_user}).render().el),e=new Sidebar({model:this.model}),this.$el.find("#navbar").html(e.render().el),this.sse.on("otr",function(e){return function(r){return console.debug("[OTR]",r),e.profile_user.otr.receiveMsg(r.body)}}(this)),this.sse.on("signal",function(){return function(e){return console.debug("[IN] "+e.type)}}(this)),this},r}(Backbone.View),module.exports=Profile;

},{"../models/user.coffee":5,"../templates.js":6,"../utils/sse.coffee":10,"../vendor/bootstrap-3.1.1.js":13,"./sidebar.coffee":38,"./user_view.coffee":39,"backbone":"8vo2L+","jquery":"zjX7fi"}],37:[function(require,module,exports){
var $,APC,Backbone,DPC,LocalUserView,Media,Message,MessageInput,MessagesCollection,MessagesView,Room,ServerSentEvents,Sidebar,Stream,Templates,User,UserView,Users,VPC,adapter,bootstrap,_ref,__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),adapter=require("../utils/adapter.coffee"),_ref=require("../utils/peer_connection.coffee"),DPC=_ref[0],VPC=_ref[1],APC=_ref[2],Media=require("../utils/media.coffee"),User=require("../models/user.coffee"),Stream=require("../models/stream.coffee"),Sidebar=require("./sidebar.coffee"),Message=require("../models/message.coffee"),MessagesCollection=require("../models/messages_collection.coffee"),MessagesView=require("./messages.coffee"),MessageInput=require("./message_input.coffee"),ServerSentEvents=require("../utils/sse.coffee"),Users=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.model=User,t}(Backbone.Collection),LocalUserView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.className="stream-view",t.prototype.events={"click #toggle-audio":"toggleAudio","click #toggle-video":"toggleVideo"},t.prototype.toggleAudio=function(){var e,t;return e=this.$el.find("#toggle-audio"),e.toggleClass("muted fa-microphone-slash fa-microphone"),t=e.hasClass("muted")?"OFF":"ON",e.attr("data-original-title","Microphone is "+t),this.$el.find(".tip").tooltip("hide"),this.collection.forEach(function(e){return e.toggleAudio()})},t.prototype.toggleVideo=function(){var e,t;return e=this.$el.find("#toggle-video"),e.toggleClass("muted fa-video-camera fa-eye-slash"),t=e.hasClass("muted")?"OFF":"ON",e.attr("data-original-title","Camera is "+t),this.$el.find(".tip").tooltip("hide"),this.collection.forEach(function(e){return e.toggleVideo()})},t.prototype.render=function(){return this.$el.html(Templates["user/localvideo"].render()),this.$el.find(".tip").tooltip(),adapter.attachMediaStream(this.$el.find("video")[0],localStream),this},t}(Backbone.View),UserView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.className="stream-view",t.prototype.render=function(){return this.$el.html(Templates["user/video"].render(this.model.toJSON())),this.model.on("video:ready",function(e){return function(t,r){return adapter.attachMediaStream(e.$el.find("video")[0],r)}}(this)),this},t}(Backbone.View),Room=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.id="room",t.prototype.initialize=function(e){return this.room_name=e.room_name.toLowerCase(),this.sse=new ServerSentEvents("room-"+this.room_name)},t.prototype.scrollChat=function(){return this.$el.find("#chat-messages").scrollTop(1e4)},t.prototype.render=function(){var e,t,r,o,n,i,s,a,u;return this.$el.html(Templates["layout/room"].render()),u={},s=new Users,a=new Sidebar({model:this.model}),this.$el.find("#navbar").html(a.render().el),t=new MessageInput,this.$el.find("#chat-input").html(t.render().el),t.on("message",function(e){return function(t){var r;return r=new Message(e.model.get("profile_image_url_https"),t),o.add(r),e.scrollChat(),s.forEach(function(e){return e.sendChat(t)})}}(this)),o=new MessagesCollection,e=new MessagesView({collection:o}),this.$el.find("#chat-messages").html(e.render().el),s.bind("add",function(e){return function(t){return u[t.id]=new UserView({model:t,collection:s}),e.$el.find("#streams").append(u[t.id].render().el)}}(this)),s.bind("remove",function(){return function(e){return u[e.id].remove()}}(this)),window.beforeunload.push(function(){return function(){return s.forEach(function(e){return e.disconnect()})}}(this)),i=function(e){return function(t){return e.media&&t.offerVideo(),t.datachannel.on("videoOffer",function(){var r;return e.media?(r=t.newConnection("video"),r.initiate()):void 0}),t.datachannel.on("message",function(r){var n,i;return n=t.get("profile_image_url_https"),i=new Message(n,r),o.add(i),e.scrollChat()})}}(this),n=function(){return function(e){return s.remove(e)}}(this),this.sse.on("otr",function(){return function(e){var t;return t=s.get(e.src),t?t.otr.receiveMsg(e.body):void 0}}(this)),this.sse.on("room-"+this.room_name,function(e){return function(t){var r,o;return o=s.get(t.src.id),o&&s.remove(o),r=new User(t.src,{parent:e.model}),s.add(r),r.ack("room-"+e.room_name),r.on("data:ready",i),r.on("data:disconnected",n)}}(this)),this.sse.on("ack",function(e){return function(t){var r,o;return o=s.get(t.src.id),o&&s.remove(o),r=new User(t.src,{parent:e.model}),s.add(r),r.handshake(),r.on("data:ready",i),r.on("data:disconnected",n)}}(this)),r=new Media({audio:!0,video:!0}),r.on("success",function(e){return function(){var t;return e.media=!0,t=new LocalUserView({model:e.model,collection:s}),e.$el.find("#streams").prepend(t.render().el),s.forEach(function(e){return e.offerVideo()})}}(this)),r.on("error",function(){return function(){return alert("Request to access media denied. Reload.")}}(this)),this},t}(Backbone.View),module.exports=Room;

},{"../models/message.coffee":2,"../models/messages_collection.coffee":3,"../models/stream.coffee":4,"../models/user.coffee":5,"../templates.js":6,"../utils/adapter.coffee":7,"../utils/media.coffee":8,"../utils/peer_connection.coffee":9,"../utils/sse.coffee":10,"../vendor/bootstrap-3.1.1.js":13,"./message_input.coffee":31,"./messages.coffee":33,"./sidebar.coffee":38,"backbone":"8vo2L+","jquery":"zjX7fi"}],38:[function(require,module,exports){
var $,Backbone,InfoModal,RoomModal,Sidebar,Templates,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,o){function r(){this.constructor=e}for(var t in o)__hasProp.call(o,t)&&(e[t]=o[t]);return r.prototype=o.prototype,e.prototype=new r,e.__super__=o.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),RoomModal=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,e),o.prototype.events={"click #join":"join_room",keypress:"keypress"},o.prototype.join_room=function(){var e;return(e=this.$el.find("#room").val().match(/\w+/))?window.location="/room/"+e:void 0},o.prototype.keypress=function(e){return 13===e.keyCode?this.join_room():void 0},o.prototype.render=function(){return this.$el.html(Templates["sidebar/room_modal"].render()),this.$el.find("#modal").modal(),this},o}(Backbone.View),InfoModal=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,e),o.prototype.render=function(){return this.$el.html(Templates["sidebar/info_modal"].render()),this.$el.find("#modal").modal({backdrop:"static",keyboard:!1}),this},o}(Backbone.View),Sidebar=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,e),o.prototype.events={"click #home":"go_home","click #group":"join_group","click #info":"show_info"},o.prototype.go_home=function(e){return e.preventDefault(),window.location="/home"},o.prototype.join_group=function(e){var o;return e.preventDefault(),o=new RoomModal,$("body").append(o.render().el)},o.prototype.show_info=function(e){var o;return e.preventDefault(),o=new InfoModal,$("body").append(o.render().el)},o.prototype.render=function(){return this.$el.html(Templates["user/sidebar"].render(this.model.toJSON())),this},o}(Backbone.View),module.exports=Sidebar;

},{"../templates.js":6,"../vendor/bootstrap-3.1.1.js":13,"backbone":"8vo2L+","jquery":"zjX7fi"}],39:[function(require,module,exports){
var $,Backbone,CallRequest,Media,Message,MessageInput,MessagesCollection,MessagesView,OneToOne,OneToOneAudio,Templates,UserDetail,adapter,bootstrap,__hasProp={}.hasOwnProperty,__extends=function(e,n){function t(){this.constructor=e}for(var o in n)__hasProp.call(n,o)&&(e[o]=n[o]);return t.prototype=n.prototype,e.prototype=new t,e.__super__=n.prototype,e};$=require("jquery"),Backbone=require("backbone"),Backbone.$=$,Templates=require("../templates.js"),bootstrap=require("../vendor/bootstrap-3.1.1.js"),bootstrap.extendjQuery($),adapter=require("../utils/adapter.coffee"),CallRequest=require("./call_request.coffee"),OneToOne=require("./one_to_one.coffee"),OneToOneAudio=require("./one_to_one_audio.coffee"),Message=require("../models/message.coffee"),MessagesCollection=require("../models/messages_collection.coffee"),MessagesView=require("./messages.coffee"),MessageInput=require("./message_input.coffee"),Media=require("../utils/media.coffee"),UserDetail=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return __extends(n,e),n.prototype.className="user",n.prototype.initialize=function(){return this.unreadCount=0,this.chatVisible=!1},n.prototype.events={"click .show-chat":"showChat","click .hide-chat":"hideChat","click .audiocall":"audiocall","click .videocall":"videocall"},n.prototype.showChat=function(){return this.$el.find(".chat").modal({backdrop:!1,keyboard:!1,toggle:!0}),this.resetUnreadCount(),this.scrollChat(),this.chatVisible=!0},n.prototype.hideChat=function(){return this.$el.find(".chat").modal("hide"),this.chatVisible=!1},n.prototype.audiocall=function(){var e;return e=new Media({audio:!0,video:!1}),e.on("success",function(e){return function(){return e.model.requestAudiocall(),e.$el.find(".audiocall").addClass("active")}}(this)),e.on("error",function(e){return function(){return alert("Request to access media denied. Reload."),e.$el.find(".audiocall").removeClass("active")}}(this))},n.prototype.videocall=function(){var e;return e=new Media({audio:!0,video:!0}),e.on("success",function(e){return function(){return e.model.requestVideocall(),e.$el.find(".videocall").addClass("active")}}(this)),e.on("error",function(e){return function(){return alert("Request to access media denied. Reload."),e.$el.find(".videocall").removeClass("active")}}(this))},n.prototype.scrollChat=function(){return this.$el.find(".chat-messages").scrollTop(1e4)},n.prototype.incrementUnreadCount=function(){return this.unreadCount+=1,this.$el.find(".unreadCount").html(this.unreadCount),this.$el.find(".unreadCount").show(),this.$el.find(".show-chat").addClass("active")},n.prototype.resetUnreadCount=function(){return this.unreadCount=0,this.$el.find(".unreadCount").hide(),this.$el.find(".unreadCount").html(""),this.$el.find(".show-chat").removeClass("active")},n.prototype.render=function(){var e,n,t;return this.$el.html(Templates["user/detail"].render(this.model.toJSON())),t=new MessagesCollection,e=new MessagesView({collection:t}),this.$el.find(".chat-messages").html(e.render().el),n=new MessageInput,this.$el.find(".chat-input").html(n.render().el),n.on("message",function(e){return function(n){var o,r;return o=e.model.options.parent.get("profile_image_url_https"),r=new Message(o,n),t.add(r),e.model.sendChat(n),e.scrollChat()}}(this)),this.model.on("video:ready",function(e){return function(){return e.one_to_one=new OneToOne({model:e.model}),$("#conversation").html(e.one_to_one.render().el),$("#container").fadeOut(200,function(){return $("#bgvideo").hide(),$("#conversation").fadeIn(200)})}}(this)),this.model.on("video:disconnected",function(e){return function(){return e.one_to_one.remove(),$("#conversation").fadeOut(200,function(){return $("#container").fadeIn(200,function(){return $("#bgvideo").fadeIn()})})}}(this)),this.model.on("audio:ready",function(e){return function(){return e.onetooneaudio=new OneToOneAudio({model:e.model}),e.$el.find(".one-to-one-audio").html(e.onetooneaudio.render().el),e.$el.find(".audio").modal({backdrop:!1,keyboard:!1})}}(this)),this.model.on("audio:disconnected",function(e){return function(){return e.$el.find(".audio").modal("hide"),e.$el.find(".audio").on("hidden.bs.modal",function(){return e.onetooneaudio.remove()})}}(this)),this.model.on("data:ready",function(e){return function(){var n;return e.$el.find(".actions").fadeIn(),e.model.datachannel.on("message",function(n){var o,r;return e.chatVisible||e.incrementUnreadCount(),o=e.model.get("profile_image_url_https"),r=new Message(o,n),t.add(r),e.scrollChat()}),n=function(n){var t;return t=new CallRequest({model:e.model,type:n}),e.$el.append(t.render().el),t},e.model.datachannel.on("requestVideo",function(){var t;return t=n("video"),t.on("accepted",function(){var n;return n=e.model.newConnection("video"),n.initiate()}),t.on("rejected",function(){return e.model.sendChat("Sorry, can't talk right now"),e.model.datachannel.sendMessage({type:"declineVideo"}),e.model.stopLocalStream()})}),e.model.datachannel.on("requestAudio",function(){var t;return t=n("audio"),t.on("accepted",function(){var n;return n=e.model.newConnection("audio"),n.initiate()}),t.on("rejected",function(){return e.model.sendChat("Sorry, can't talk right now"),e.model.datachannel.sendMessage({type:"declineAudio"}),e.model.stopLocalStream()})}),e.model.datachannel.on("declineAudio",function(){return e.$el.find(".audiocall").removeClass("active"),e.model.stopLocalStream()}),e.model.datachannel.on("declineVideo",function(){return e.$el.find(".videocall").removeClass("active"),e.model.stopLocalStream()})}}(this)),this},n}(Backbone.View),module.exports=UserDetail;

},{"../models/message.coffee":2,"../models/messages_collection.coffee":3,"../templates.js":6,"../utils/adapter.coffee":7,"../utils/media.coffee":8,"../vendor/bootstrap-3.1.1.js":13,"./call_request.coffee":29,"./message_input.coffee":31,"./messages.coffee":33,"./one_to_one.coffee":34,"./one_to_one_audio.coffee":35,"backbone":"8vo2L+","jquery":"zjX7fi"}],40:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],41:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// UTILITY
var util = require('util');
var shims = require('_shims');
var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.message = options.message || getMessage(this);
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = shims.keys(a),
        kb = shims.keys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};
},{"_shims":40,"util":43}],42:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util');
var shims = require('_shims');

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = shims.substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(shims.filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(shims.filter(paths, function(p, index) {
    if (!util.isString(p)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

},{"__browserify_process":54,"_shims":40,"util":43}],43:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.binarySlice === 'function'
  ;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":40}],44:[function(require,module,exports){
exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],45:[function(require,module,exports){
var assert;
exports.Buffer = Buffer;
exports.SlowBuffer = Buffer;
Buffer.poolSize = 8192;
exports.INSPECT_MAX_BYTES = 50;

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function Buffer(subject, encoding, offset) {
  if(!assert) assert= require('assert');
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }
  this.parent = this;
  this.offset = 0;

  // Work-around: node's base64 implementation
  // allows for non-padded strings while base64-js
  // does not..
  if (encoding == "base64" && typeof subject == "string") {
    subject = stringtrim(subject);
    while (subject.length % 4 != 0) {
      subject = subject + "="; 
    }
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    // slicing works, with limitations (no parent tracking/update)
    // check https://github.com/toots/buffer-browserify/issues/19
    for (var i = 0; i < this.length; i++) {
        this[i] = subject.get(i+offset);
    }
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        if (subject instanceof Buffer) {
          this[i] = subject.readUInt8(i);
        }
        else {
          this[i] = subject[i];
        }
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    } else if (type === 'number') {
      for (var i = 0; i < this.length; i++) {
        this[i] = 0;
      }
    }
  }
}

Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this[i];
};

Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this[i] = v;
};

Buffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
    case 'binary':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

Buffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

Buffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

Buffer.prototype.binaryWrite = Buffer.prototype.asciiWrite;

Buffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

Buffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
};

Buffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

Buffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

Buffer.prototype.binarySlice = Buffer.prototype.asciiSlice;

Buffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


Buffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  Buffer._charsWritten = i * 2;
  return i;
};


Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};

// slice(start, end)
function clamp(index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue;
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len;
  if (index >= 0) return index;
  index += len;
  if (index >= 0) return index;
  return 0;
}

Buffer.prototype.slice = function(start, end) {
  var len = this.length;
  start = clamp(start, len, 0);
  end = clamp(end, len, len);
  return new Buffer(this, end - start, +start);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  if (end === undefined || isNaN(end)) {
    end = this.length;
  }
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  var temp = [];
  for (var i=start; i<end; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=target_start; i<target_start+temp.length; i++) {
    target[i] = temp[i-target_start];
  }
};

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  for (var i = start; i < end; i++) {
    this[i] = value;
  }
}

// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof Buffer;
};

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

Buffer.isEncoding = function(encoding) {
  switch ((encoding + '').toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true;

    default:
      return false;
  }
};

// helpers

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}

function isArray(subject) {
  return (Array.isArray ||
    function(subject){
      return {}.toString.apply(subject) == '[object Array]'
    })
    (subject)
}

function isArrayIsh(subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

// read/write bit-twiddling

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  return buffer[offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    val = buffer[offset] << 8;
    if (offset + 1 < buffer.length) {
      val |= buffer[offset + 1];
    }
  } else {
    val = buffer[offset];
    if (offset + 1 < buffer.length) {
      val |= buffer[offset + 1] << 8;
    }
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    if (offset + 1 < buffer.length)
      val = buffer[offset + 1] << 16;
    if (offset + 2 < buffer.length)
      val |= buffer[offset + 2] << 8;
    if (offset + 3 < buffer.length)
      val |= buffer[offset + 3];
    val = val + (buffer[offset] << 24 >>> 0);
  } else {
    if (offset + 2 < buffer.length)
      val = buffer[offset + 2] << 16;
    if (offset + 1 < buffer.length)
      val |= buffer[offset + 1] << 8;
    val |= buffer[offset];
    if (offset + 3 < buffer.length)
      val = val + (buffer[offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  neg = buffer[offset] & 0x80;
  if (!neg) {
    return (buffer[offset]);
  }

  return ((0xff - buffer[offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  if (offset < buffer.length) {
    buffer[offset] = value;
  }
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
    buffer[offset + i] =
        (value & (0xff << (8 * (isBigEndian ? 1 - i : i)))) >>>
            (isBigEndian ? 1 - i : i) * 8;
  }

}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
    buffer[offset + i] =
        (value >>> (isBigEndian ? 3 - i : i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

},{"./buffer_ieee754":44,"assert":41,"base64-js":46}],46:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}],47:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":45}],48:[function(require,module,exports){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":49,"./rng":50,"./sha":51,"./sha256":52,"buffer":45}],49:[function(require,module,exports){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = require('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":47}],50:[function(require,module,exports){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],51:[function(require,module,exports){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = require('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":47}],52:[function(require,module,exports){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":47}],53:[function(require,module,exports){
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],"q9TxCC":[function(require,module,exports){
var assert;
exports.Buffer = Buffer;
exports.SlowBuffer = Buffer;
Buffer.poolSize = 8192;
exports.INSPECT_MAX_BYTES = 50;

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function Buffer(subject, encoding, offset) {
  if(!assert) assert= require('assert');
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }
  this.parent = this;
  this.offset = 0;

  // Work-around: node's base64 implementation
  // allows for non-padded strings while base64-js
  // does not..
  if (encoding == "base64" && typeof subject == "string") {
    subject = stringtrim(subject);
    while (subject.length % 4 != 0) {
      subject = subject + "="; 
    }
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    // slicing works, with limitations (no parent tracking/update)
    // check https://github.com/toots/buffer-browserify/issues/19
    for (var i = 0; i < this.length; i++) {
        this[i] = subject.get(i+offset);
    }
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        if (subject instanceof Buffer) {
          this[i] = subject.readUInt8(i);
        }
        else {
          this[i] = subject[i];
        }
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    } else if (type === 'number') {
      for (var i = 0; i < this.length; i++) {
        this[i] = 0;
      }
    }
  }
}

Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this[i];
};

Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this[i] = v;
};

Buffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
    case 'binary':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

Buffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

Buffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

Buffer.prototype.binaryWrite = Buffer.prototype.asciiWrite;

Buffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return Buffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

Buffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
};

Buffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

Buffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

Buffer.prototype.binarySlice = Buffer.prototype.asciiSlice;

Buffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


Buffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  Buffer._charsWritten = i * 2;
  return i;
};


Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};

// slice(start, end)
function clamp(index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue;
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len;
  if (index >= 0) return index;
  index += len;
  if (index >= 0) return index;
  return 0;
}

Buffer.prototype.slice = function(start, end) {
  var len = this.length;
  start = clamp(start, len, 0);
  end = clamp(end, len, len);
  return new Buffer(this, end - start, +start);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  if (end === undefined || isNaN(end)) {
    end = this.length;
  }
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  var temp = [];
  for (var i=start; i<end; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=target_start; i<target_start+temp.length; i++) {
    target[i] = temp[i-target_start];
  }
};

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  for (var i = start; i < end; i++) {
    this[i] = value;
  }
}

// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof Buffer;
};

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

Buffer.isEncoding = function(encoding) {
  switch ((encoding + '').toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true;

    default:
      return false;
  }
};

// helpers

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}

function isArray(subject) {
  return (Array.isArray ||
    function(subject){
      return {}.toString.apply(subject) == '[object Array]'
    })
    (subject)
}

function isArrayIsh(subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

// read/write bit-twiddling

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  return buffer[offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    val = buffer[offset] << 8;
    if (offset + 1 < buffer.length) {
      val |= buffer[offset + 1];
    }
  } else {
    val = buffer[offset];
    if (offset + 1 < buffer.length) {
      val |= buffer[offset + 1] << 8;
    }
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    if (offset + 1 < buffer.length)
      val = buffer[offset + 1] << 16;
    if (offset + 2 < buffer.length)
      val |= buffer[offset + 2] << 8;
    if (offset + 3 < buffer.length)
      val |= buffer[offset + 3];
    val = val + (buffer[offset] << 24 >>> 0);
  } else {
    if (offset + 2 < buffer.length)
      val = buffer[offset + 2] << 16;
    if (offset + 1 < buffer.length)
      val |= buffer[offset + 1] << 8;
    val |= buffer[offset];
    if (offset + 3 < buffer.length)
      val = val + (buffer[offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  neg = buffer[offset] & 0x80;
  if (!neg) {
    return (buffer[offset]);
  }

  return ((0xff - buffer[offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  if (offset < buffer.length) {
    buffer[offset] = value;
  }
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
    buffer[offset + i] =
        (value & (0xff << (8 * (isBigEndian ? 1 - i : i)))) >>>
            (isBigEndian ? 1 - i : i) * 8;
  }

}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
    buffer[offset + i] =
        (value >>> (isBigEndian ? 3 - i : i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

},{"./buffer_ieee754":1,"assert":6,"base64-js":4}],"buffer-browserify":[function(require,module,exports){
module.exports=require('q9TxCC');
},{}],4:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}],5:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// UTILITY
var util = require('util');
var shims = require('_shims');
var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.message = options.message || getMessage(this);
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = shims.keys(a),
        kb = shims.keys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};
},{"_shims":5,"util":7}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg instanceof Buffer;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":5}]},{},[])
;;module.exports=require("buffer-browserify")

},{}],54:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],55:[function(require,module,exports){
var Buffer=require("__browserify_Buffer").Buffer;//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

},{"__browserify_Buffer":53,"crypto":48}],56:[function(require,module,exports){
(function() {
  if (typeof twttr === "undefined" || twttr === null) {
    var twttr = {};
  }

  twttr.txt = {};
  twttr.txt.regexen = {};

  var HTML_ENTITIES = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  // HTML escaping
  twttr.txt.htmlEscape = function(text) {
    return text && text.replace(/[&"'><]/g, function(character) {
      return HTML_ENTITIES[character];
    });
  };

  // Builds a RegExp
  function regexSupplant(regex, flags) {
    flags = flags || "";
    if (typeof regex !== "string") {
      if (regex.global && flags.indexOf("g") < 0) {
        flags += "g";
      }
      if (regex.ignoreCase && flags.indexOf("i") < 0) {
        flags += "i";
      }
      if (regex.multiline && flags.indexOf("m") < 0) {
        flags += "m";
      }

      regex = regex.source;
    }

    return new RegExp(regex.replace(/#\{(\w+)\}/g, function(match, name) {
      var newRegex = twttr.txt.regexen[name] || "";
      if (typeof newRegex !== "string") {
        newRegex = newRegex.source;
      }
      return newRegex;
    }), flags);
  }

  twttr.txt.regexSupplant = regexSupplant;

  // simple string interpolation
  function stringSupplant(str, values) {
    return str.replace(/#\{(\w+)\}/g, function(match, name) {
      return values[name] || "";
    });
  }

  twttr.txt.stringSupplant = stringSupplant;

  function addCharsToCharClass(charClass, start, end) {
    var s = String.fromCharCode(start);
    if (end !== start) {
      s += "-" + String.fromCharCode(end);
    }
    charClass.push(s);
    return charClass;
  }

  twttr.txt.addCharsToCharClass = addCharsToCharClass;

  // Space is more than %20, U+3000 for example is the full-width space used with Kanji. Provide a short-hand
  // to access both the list of characters and a pattern suitible for use with String#split
  // Taken from: ActiveSupport::Multibyte::Handlers::UTF8Handler::UNICODE_WHITESPACE
  var fromCode = String.fromCharCode;
  var UNICODE_SPACES = [
    fromCode(0x0020), // White_Space # Zs       SPACE
    fromCode(0x0085), // White_Space # Cc       <control-0085>
    fromCode(0x00A0), // White_Space # Zs       NO-BREAK SPACE
    fromCode(0x1680), // White_Space # Zs       OGHAM SPACE MARK
    fromCode(0x180E), // White_Space # Zs       MONGOLIAN VOWEL SEPARATOR
    fromCode(0x2028), // White_Space # Zl       LINE SEPARATOR
    fromCode(0x2029), // White_Space # Zp       PARAGRAPH SEPARATOR
    fromCode(0x202F), // White_Space # Zs       NARROW NO-BREAK SPACE
    fromCode(0x205F), // White_Space # Zs       MEDIUM MATHEMATICAL SPACE
    fromCode(0x3000)  // White_Space # Zs       IDEOGRAPHIC SPACE
  ];
  addCharsToCharClass(UNICODE_SPACES, 0x009, 0x00D); // White_Space # Cc   [5] <control-0009>..<control-000D>
  addCharsToCharClass(UNICODE_SPACES, 0x2000, 0x200A); // White_Space # Zs  [11] EN QUAD..HAIR SPACE

  var INVALID_CHARS = [
    fromCode(0xFFFE),
    fromCode(0xFEFF), // BOM
    fromCode(0xFFFF) // Special
  ];
  addCharsToCharClass(INVALID_CHARS, 0x202A, 0x202E); // Directional change

  twttr.txt.regexen.spaces_group = regexSupplant(UNICODE_SPACES.join(""));
  twttr.txt.regexen.spaces = regexSupplant("[" + UNICODE_SPACES.join("") + "]");
  twttr.txt.regexen.invalid_chars_group = regexSupplant(INVALID_CHARS.join(""));
  twttr.txt.regexen.punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
  twttr.txt.regexen.rtl_chars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/mg;
  twttr.txt.regexen.non_bmp_code_pairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/mg;

  var nonLatinHashtagChars = [];
  // Cyrillic
  addCharsToCharClass(nonLatinHashtagChars, 0x0400, 0x04ff); // Cyrillic
  addCharsToCharClass(nonLatinHashtagChars, 0x0500, 0x0527); // Cyrillic Supplement
  addCharsToCharClass(nonLatinHashtagChars, 0x2de0, 0x2dff); // Cyrillic Extended A
  addCharsToCharClass(nonLatinHashtagChars, 0xa640, 0xa69f); // Cyrillic Extended B
  // Hebrew
  addCharsToCharClass(nonLatinHashtagChars, 0x0591, 0x05bf); // Hebrew
  addCharsToCharClass(nonLatinHashtagChars, 0x05c1, 0x05c2);
  addCharsToCharClass(nonLatinHashtagChars, 0x05c4, 0x05c5);
  addCharsToCharClass(nonLatinHashtagChars, 0x05c7, 0x05c7);
  addCharsToCharClass(nonLatinHashtagChars, 0x05d0, 0x05ea);
  addCharsToCharClass(nonLatinHashtagChars, 0x05f0, 0x05f4);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb12, 0xfb28); // Hebrew Presentation Forms
  addCharsToCharClass(nonLatinHashtagChars, 0xfb2a, 0xfb36);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb38, 0xfb3c);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb3e, 0xfb3e);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb40, 0xfb41);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb43, 0xfb44);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb46, 0xfb4f);
  // Arabic
  addCharsToCharClass(nonLatinHashtagChars, 0x0610, 0x061a); // Arabic
  addCharsToCharClass(nonLatinHashtagChars, 0x0620, 0x065f);
  addCharsToCharClass(nonLatinHashtagChars, 0x066e, 0x06d3);
  addCharsToCharClass(nonLatinHashtagChars, 0x06d5, 0x06dc);
  addCharsToCharClass(nonLatinHashtagChars, 0x06de, 0x06e8);
  addCharsToCharClass(nonLatinHashtagChars, 0x06ea, 0x06ef);
  addCharsToCharClass(nonLatinHashtagChars, 0x06fa, 0x06fc);
  addCharsToCharClass(nonLatinHashtagChars, 0x06ff, 0x06ff);
  addCharsToCharClass(nonLatinHashtagChars, 0x0750, 0x077f); // Arabic Supplement
  addCharsToCharClass(nonLatinHashtagChars, 0x08a0, 0x08a0); // Arabic Extended A
  addCharsToCharClass(nonLatinHashtagChars, 0x08a2, 0x08ac);
  addCharsToCharClass(nonLatinHashtagChars, 0x08e4, 0x08fe);
  addCharsToCharClass(nonLatinHashtagChars, 0xfb50, 0xfbb1); // Arabic Pres. Forms A
  addCharsToCharClass(nonLatinHashtagChars, 0xfbd3, 0xfd3d);
  addCharsToCharClass(nonLatinHashtagChars, 0xfd50, 0xfd8f);
  addCharsToCharClass(nonLatinHashtagChars, 0xfd92, 0xfdc7);
  addCharsToCharClass(nonLatinHashtagChars, 0xfdf0, 0xfdfb);
  addCharsToCharClass(nonLatinHashtagChars, 0xfe70, 0xfe74); // Arabic Pres. Forms B
  addCharsToCharClass(nonLatinHashtagChars, 0xfe76, 0xfefc);
  addCharsToCharClass(nonLatinHashtagChars, 0x200c, 0x200c); // Zero-Width Non-Joiner
  // Thai
  addCharsToCharClass(nonLatinHashtagChars, 0x0e01, 0x0e3a);
  addCharsToCharClass(nonLatinHashtagChars, 0x0e40, 0x0e4e);
  // Hangul (Korean)
  addCharsToCharClass(nonLatinHashtagChars, 0x1100, 0x11ff); // Hangul Jamo
  addCharsToCharClass(nonLatinHashtagChars, 0x3130, 0x3185); // Hangul Compatibility Jamo
  addCharsToCharClass(nonLatinHashtagChars, 0xA960, 0xA97F); // Hangul Jamo Extended-A
  addCharsToCharClass(nonLatinHashtagChars, 0xAC00, 0xD7AF); // Hangul Syllables
  addCharsToCharClass(nonLatinHashtagChars, 0xD7B0, 0xD7FF); // Hangul Jamo Extended-B
  addCharsToCharClass(nonLatinHashtagChars, 0xFFA1, 0xFFDC); // half-width Hangul
  // Japanese and Chinese
  addCharsToCharClass(nonLatinHashtagChars, 0x30A1, 0x30FA); // Katakana (full-width)
  addCharsToCharClass(nonLatinHashtagChars, 0x30FC, 0x30FE); // Katakana Chouon and iteration marks (full-width)
  addCharsToCharClass(nonLatinHashtagChars, 0xFF66, 0xFF9F); // Katakana (half-width)
  addCharsToCharClass(nonLatinHashtagChars, 0xFF70, 0xFF70); // Katakana Chouon (half-width)
  addCharsToCharClass(nonLatinHashtagChars, 0xFF10, 0xFF19); // \
  addCharsToCharClass(nonLatinHashtagChars, 0xFF21, 0xFF3A); //  - Latin (full-width)
  addCharsToCharClass(nonLatinHashtagChars, 0xFF41, 0xFF5A); // /
  addCharsToCharClass(nonLatinHashtagChars, 0x3041, 0x3096); // Hiragana
  addCharsToCharClass(nonLatinHashtagChars, 0x3099, 0x309E); // Hiragana voicing and iteration mark
  addCharsToCharClass(nonLatinHashtagChars, 0x3400, 0x4DBF); // Kanji (CJK Extension A)
  addCharsToCharClass(nonLatinHashtagChars, 0x4E00, 0x9FFF); // Kanji (Unified)
  // -- Disabled as it breaks the Regex.
  //addCharsToCharClass(nonLatinHashtagChars, 0x20000, 0x2A6DF); // Kanji (CJK Extension B)
  addCharsToCharClass(nonLatinHashtagChars, 0x2A700, 0x2B73F); // Kanji (CJK Extension C)
  addCharsToCharClass(nonLatinHashtagChars, 0x2B740, 0x2B81F); // Kanji (CJK Extension D)
  addCharsToCharClass(nonLatinHashtagChars, 0x2F800, 0x2FA1F); // Kanji (CJK supplement)
  addCharsToCharClass(nonLatinHashtagChars, 0x3003, 0x3003); // Kanji iteration mark
  addCharsToCharClass(nonLatinHashtagChars, 0x3005, 0x3005); // Kanji iteration mark
  addCharsToCharClass(nonLatinHashtagChars, 0x303B, 0x303B); // Han iteration mark

  twttr.txt.regexen.nonLatinHashtagChars = regexSupplant(nonLatinHashtagChars.join(""));

  var latinAccentChars = [];
  // Latin accented characters (subtracted 0xD7 from the range, it's a confusable multiplication sign. Looks like "x")
  addCharsToCharClass(latinAccentChars, 0x00c0, 0x00d6);
  addCharsToCharClass(latinAccentChars, 0x00d8, 0x00f6);
  addCharsToCharClass(latinAccentChars, 0x00f8, 0x00ff);
  // Latin Extended A and B
  addCharsToCharClass(latinAccentChars, 0x0100, 0x024f);
  // assorted IPA Extensions
  addCharsToCharClass(latinAccentChars, 0x0253, 0x0254);
  addCharsToCharClass(latinAccentChars, 0x0256, 0x0257);
  addCharsToCharClass(latinAccentChars, 0x0259, 0x0259);
  addCharsToCharClass(latinAccentChars, 0x025b, 0x025b);
  addCharsToCharClass(latinAccentChars, 0x0263, 0x0263);
  addCharsToCharClass(latinAccentChars, 0x0268, 0x0268);
  addCharsToCharClass(latinAccentChars, 0x026f, 0x026f);
  addCharsToCharClass(latinAccentChars, 0x0272, 0x0272);
  addCharsToCharClass(latinAccentChars, 0x0289, 0x0289);
  addCharsToCharClass(latinAccentChars, 0x028b, 0x028b);
  // Okina for Hawaiian (it *is* a letter character)
  addCharsToCharClass(latinAccentChars, 0x02bb, 0x02bb);
  // Combining diacritics
  addCharsToCharClass(latinAccentChars, 0x0300, 0x036f);
  // Latin Extended Additional
  addCharsToCharClass(latinAccentChars, 0x1e00, 0x1eff);
  twttr.txt.regexen.latinAccentChars = regexSupplant(latinAccentChars.join(""));

  // A hashtag must contain characters, numbers and underscores, but not all numbers.
  twttr.txt.regexen.hashSigns = /[#＃]/;
  twttr.txt.regexen.hashtagAlpha = regexSupplant(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i);
  twttr.txt.regexen.hashtagAlphaNumeric = regexSupplant(/[a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}]/i);
  twttr.txt.regexen.endHashtagMatch = regexSupplant(/^(?:#{hashSigns}|:\/\/)/);
  twttr.txt.regexen.hashtagBoundary = regexSupplant(/(?:^|$|[^&a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}])/);
  twttr.txt.regexen.validHashtag = regexSupplant(/(#{hashtagBoundary})(#{hashSigns})(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi);

  // Mention related regex collection
  twttr.txt.regexen.validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:rt|RT|rT|Rt):?)/;
  twttr.txt.regexen.atSigns = /[@＠]/;
  twttr.txt.regexen.validMentionOrList = regexSupplant(
    '(#{validMentionPrecedingChars})' +  // $1: Preceding character
    '(#{atSigns})' +                     // $2: At mark
    '([a-zA-Z0-9_]{1,20})' +             // $3: Screen name
    '(\/[a-zA-Z][a-zA-Z0-9_\-]{0,24})?'  // $4: List (optional)
  , 'g');
  twttr.txt.regexen.validReply = regexSupplant(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/);
  twttr.txt.regexen.endMentionMatch = regexSupplant(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/);

  // URL related regex collection
  twttr.txt.regexen.validUrlPrecedingChars = regexSupplant(/(?:[^A-Za-z0-9@＠$#＃#{invalid_chars_group}]|^)/);
  twttr.txt.regexen.invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/;
  twttr.txt.regexen.invalidDomainChars = stringSupplant("#{punct}#{spaces_group}#{invalid_chars_group}", twttr.txt.regexen);
  twttr.txt.regexen.validDomainChars = regexSupplant(/[^#{invalidDomainChars}]/);
  twttr.txt.regexen.validSubdomain = regexSupplant(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/);
  twttr.txt.regexen.validDomainName = regexSupplant(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/);
  twttr.txt.regexen.validGTLD = regexSupplant(RegExp(
    '(?:(?:academy|actor|aero|agency|arpa|asia|bar|bargains|berlin|best|bid|bike|biz|blue|boutique|build|builders|' +
    'buzz|cab|camera|camp|cards|careers|cat|catering|center|ceo|cheap|christmas|cleaning|clothing|club|codes|' +
    'coffee|com|community|company|computer|construction|contractors|cool|coop|cruises|dance|dating|democrat|' +
    'diamonds|directory|domains|edu|education|email|enterprises|equipment|estate|events|expert|exposed|farm|fish|' +
    'flights|florist|foundation|futbol|gallery|gift|glass|gov|graphics|guitars|guru|holdings|holiday|house|' +
    'immobilien|industries|info|institute|int|international|jobs|kaufen|kim|kitchen|kiwi|koeln|kred|land|lighting|' +
    'limo|link|luxury|management|mango|marketing|menu|mil|mobi|moda|monash|museum|nagoya|name|net|neustar|ninja|' +
    'okinawa|onl|org|partners|parts|photo|photography|photos|pics|pink|plumbing|post|pro|productions|properties|' +
    'pub|qpon|recipes|red|rentals|repair|report|reviews|rich|ruhr|sexy|shiksha|shoes|singles|social|solar|' +
    'solutions|supplies|supply|support|systems|tattoo|technology|tel|tienda|tips|today|tokyo|tools|training|' +
    'travel|uno|vacations|ventures|viajes|villas|vision|vote|voting|voto|voyage|wang|watch|wed|wien|wiki|works|' +
    'xxx|xyz|zone|дети|онлайн|орг|сайт|بازار|شبكة|みんな|中信|中文网|公司|公益|在线|我爱你|政务|游戏|移动|网络|集团|삼성)' +
    '(?=[^0-9a-zA-Z@]|$))'));
  twttr.txt.regexen.validCCTLD = regexSupplant(RegExp(
    '(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|' +
    'bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|' +
    'et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|' +
    'im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|' +
    'me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|' +
    'pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|' +
    'sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|' +
    'ye|yt|za|zm|zw|мон|рф|срб|укр|қаз|الاردن|الجزائر|السعودية|المغرب|امارات|ایران|بھارت|تونس|سودان|سورية|عمان|فلسطين|قطر|مصر|مليسيا|پاکستان|' +
    'भारत|বাংলা|ভারত|ਭਾਰਤ|ભારત|இந்தியா|இலங்கை|சிங்கப்பூர்|భారత్|ලංකා|ไทย|გე|中国|中國|台湾|台灣|新加坡|' +
    '香港|한국)(?=[^0-9a-zA-Z@]|$))'));
  twttr.txt.regexen.validPunycode = regexSupplant(/(?:xn--[0-9a-z]+)/);
  twttr.txt.regexen.validDomain = regexSupplant(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/);
  twttr.txt.regexen.validAsciiDomain = regexSupplant(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi);
  twttr.txt.regexen.invalidShortDomain = regexSupplant(/^#{validDomainName}#{validCCTLD}$/);

  twttr.txt.regexen.validPortNumber = regexSupplant(/[0-9]+/);

  twttr.txt.regexen.validGeneralUrlPathChars = regexSupplant(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~@|&#{latinAccentChars}]/i);
  // Allow URL paths to contain up to two nested levels of balanced parens
  //  1. Used in Wikipedia URLs like /Primer_(film)
  //  2. Used in IIS sessions like /S(dfd346)/
  //  3. Used in Rdio URLs like /track/We_Up_(Album_Version_(Edited))/
  twttr.txt.regexen.validUrlBalancedParens = regexSupplant(
    '\\('                                   +
      '(?:'                                 +
        '#{validGeneralUrlPathChars}+'      +
        '|'                                 +
        // allow one nested level of balanced parentheses
        '(?:'                               +
          '#{validGeneralUrlPathChars}*'    +
          '\\('                             +
            '#{validGeneralUrlPathChars}+'  +
          '\\)'                             +
          '#{validGeneralUrlPathChars}*'    +
        ')'                                 +
      ')'                                   +
    '\\)'
  , 'i');
  // Valid end-of-path chracters (so /foo. does not gobble the period).
  // 1. Allow =&# for empty URL parameters and other URL-join artifacts
  twttr.txt.regexen.validUrlPathEndingChars = regexSupplant(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i);
  // Allow @ in a url, but only in the middle. Catch things like http://example.com/@user/
  twttr.txt.regexen.validUrlPath = regexSupplant('(?:' +
    '(?:' +
      '#{validGeneralUrlPathChars}*' +
        '(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*' +
        '#{validUrlPathEndingChars}'+
      ')|(?:@#{validGeneralUrlPathChars}+\/)'+
    ')', 'i');

  twttr.txt.regexen.validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
  twttr.txt.regexen.validUrlQueryEndingChars = /[a-z0-9_&=#\/]/i;
  twttr.txt.regexen.extractUrl = regexSupplant(
    '('                                                            + // $1 total match
      '(#{validUrlPrecedingChars})'                                + // $2 Preceeding chracter
      '('                                                          + // $3 URL
        '(https?:\\/\\/)?'                                         + // $4 Protocol (optional)
        '(#{validDomain})'                                         + // $5 Domain(s)
        '(?::(#{validPortNumber}))?'                               + // $6 Port number (optional)
        '(\\/#{validUrlPath}*)?'                                   + // $7 URL Path
        '(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?'  + // $8 Query String
      ')'                                                          +
    ')'
  , 'gi');

  twttr.txt.regexen.validTcoUrl = /^https?:\/\/t\.co\/[a-z0-9]+/i;
  twttr.txt.regexen.urlHasProtocol = /^https?:\/\//i;
  twttr.txt.regexen.urlHasHttps = /^https:\/\//i;

  // cashtag related regex
  twttr.txt.regexen.cashtag = /[a-z]{1,6}(?:[._][a-z]{1,2})?/i;
  twttr.txt.regexen.validCashtag = regexSupplant('(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])', 'gi');

  // These URL validation pattern strings are based on the ABNF from RFC 3986
  twttr.txt.regexen.validateUrlUnreserved = /[a-z0-9\-._~]/i;
  twttr.txt.regexen.validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
  twttr.txt.regexen.validateUrlSubDelims = /[!$&'()*+,;=]/i;
  twttr.txt.regexen.validateUrlPchar = regexSupplant('(?:' +
    '#{validateUrlUnreserved}|' +
    '#{validateUrlPctEncoded}|' +
    '#{validateUrlSubDelims}|' +
    '[:|@]' +
  ')', 'i');

  twttr.txt.regexen.validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
  twttr.txt.regexen.validateUrlUserinfo = regexSupplant('(?:' +
    '#{validateUrlUnreserved}|' +
    '#{validateUrlPctEncoded}|' +
    '#{validateUrlSubDelims}|' +
    ':' +
  ')*', 'i');

  twttr.txt.regexen.validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
  twttr.txt.regexen.validateUrlIpv4 = regexSupplant(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i);

  // Punting on real IPv6 validation for now
  twttr.txt.regexen.validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;

  // Also punting on IPvFuture for now
  twttr.txt.regexen.validateUrlIp = regexSupplant('(?:' +
    '#{validateUrlIpv4}|' +
    '#{validateUrlIpv6}' +
  ')', 'i');

  // This is more strict than the rfc specifies
  twttr.txt.regexen.validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
  twttr.txt.regexen.validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
  twttr.txt.regexen.validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
  twttr.txt.regexen.validateUrlDomain = regexSupplant(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i);

  twttr.txt.regexen.validateUrlHost = regexSupplant('(?:' +
    '#{validateUrlIp}|' +
    '#{validateUrlDomain}' +
  ')', 'i');

  // Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
  twttr.txt.regexen.validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
  twttr.txt.regexen.validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
  twttr.txt.regexen.validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
  twttr.txt.regexen.validateUrlUnicodeDomain = regexSupplant(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i);

  twttr.txt.regexen.validateUrlUnicodeHost = regexSupplant('(?:' +
    '#{validateUrlIp}|' +
    '#{validateUrlUnicodeDomain}' +
  ')', 'i');

  twttr.txt.regexen.validateUrlPort = /[0-9]{1,5}/;

  twttr.txt.regexen.validateUrlUnicodeAuthority = regexSupplant(
    '(?:(#{validateUrlUserinfo})@)?'  + // $1 userinfo
    '(#{validateUrlUnicodeHost})'     + // $2 host
    '(?::(#{validateUrlPort}))?'        //$3 port
  , "i");

  twttr.txt.regexen.validateUrlAuthority = regexSupplant(
    '(?:(#{validateUrlUserinfo})@)?' + // $1 userinfo
    '(#{validateUrlHost})'           + // $2 host
    '(?::(#{validateUrlPort}))?'       // $3 port
  , "i");

  twttr.txt.regexen.validateUrlPath = regexSupplant(/(\/#{validateUrlPchar}*)*/i);
  twttr.txt.regexen.validateUrlQuery = regexSupplant(/(#{validateUrlPchar}|\/|\?)*/i);
  twttr.txt.regexen.validateUrlFragment = regexSupplant(/(#{validateUrlPchar}|\/|\?)*/i);

  // Modified version of RFC 3986 Appendix B
  twttr.txt.regexen.validateUrlUnencoded = regexSupplant(
    '^'                               + // Full URL
    '(?:'                             +
      '([^:/?#]+):\\/\\/'             + // $1 Scheme
    ')?'                              +
    '([^/?#]*)'                       + // $2 Authority
    '([^?#]*)'                        + // $3 Path
    '(?:'                             +
      '\\?([^#]*)'                    + // $4 Query
    ')?'                              +
    '(?:'                             +
      '#(.*)'                         + // $5 Fragment
    ')?$'
  , "i");


  // Default CSS class for auto-linked lists (along with the url class)
  var DEFAULT_LIST_CLASS = "tweet-url list-slug";
  // Default CSS class for auto-linked usernames (along with the url class)
  var DEFAULT_USERNAME_CLASS = "tweet-url username";
  // Default CSS class for auto-linked hashtags (along with the url class)
  var DEFAULT_HASHTAG_CLASS = "tweet-url hashtag";
  // Default CSS class for auto-linked cashtags (along with the url class)
  var DEFAULT_CASHTAG_CLASS = "tweet-url cashtag";
  // Options which should not be passed as HTML attributes
  var OPTIONS_NOT_ATTRIBUTES = {'urlClass':true, 'listClass':true, 'usernameClass':true, 'hashtagClass':true, 'cashtagClass':true,
                            'usernameUrlBase':true, 'listUrlBase':true, 'hashtagUrlBase':true, 'cashtagUrlBase':true,
                            'usernameUrlBlock':true, 'listUrlBlock':true, 'hashtagUrlBlock':true, 'linkUrlBlock':true,
                            'usernameIncludeSymbol':true, 'suppressLists':true, 'suppressNoFollow':true, 'targetBlank':true,
                            'suppressDataScreenName':true, 'urlEntities':true, 'symbolTag':true, 'textWithSymbolTag':true, 'urlTarget':true,
                            'invisibleTagAttrs':true, 'linkAttributeBlock':true, 'linkTextBlock': true, 'htmlEscapeNonEntities': true
                            };

  var BOOLEAN_ATTRIBUTES = {'disabled':true, 'readonly':true, 'multiple':true, 'checked':true};

  // Simple object cloning function for simple objects
  function clone(o) {
    var r = {};
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        r[k] = o[k];
      }
    }

    return r;
  }

  twttr.txt.tagAttrs = function(attributes) {
    var htmlAttrs = "";
    for (var k in attributes) {
      var v = attributes[k];
      if (BOOLEAN_ATTRIBUTES[k]) {
        v = v ? k : null;
      }
      if (v == null) continue;
      htmlAttrs += " " + twttr.txt.htmlEscape(k) + "=\"" + twttr.txt.htmlEscape(v.toString()) + "\"";
    }
    return htmlAttrs;
  };

  twttr.txt.linkToText = function(entity, text, attributes, options) {
    if (!options.suppressNoFollow) {
      attributes.rel = "nofollow";
    }
    // if linkAttributeBlock is specified, call it to modify the attributes
    if (options.linkAttributeBlock) {
      options.linkAttributeBlock(entity, attributes);
    }
    // if linkTextBlock is specified, call it to get a new/modified link text
    if (options.linkTextBlock) {
      text = options.linkTextBlock(entity, text);
    }
    var d = {
      text: text,
      attr: twttr.txt.tagAttrs(attributes)
    };
    return stringSupplant("<a#{attr}>#{text}</a>", d);
  };

  twttr.txt.linkToTextWithSymbol = function(entity, symbol, text, attributes, options) {
    var taggedSymbol = options.symbolTag ? "<" + options.symbolTag + ">" + symbol + "</"+ options.symbolTag + ">" : symbol;
    text = twttr.txt.htmlEscape(text);
    var taggedText = options.textWithSymbolTag ? "<" + options.textWithSymbolTag + ">" + text + "</"+ options.textWithSymbolTag + ">" : text;

    if (options.usernameIncludeSymbol || !symbol.match(twttr.txt.regexen.atSigns)) {
      return twttr.txt.linkToText(entity, taggedSymbol + taggedText, attributes, options);
    } else {
      return taggedSymbol + twttr.txt.linkToText(entity, taggedText, attributes, options);
    }
  };

  twttr.txt.linkToHashtag = function(entity, text, options) {
    var hash = text.substring(entity.indices[0], entity.indices[0] + 1);
    var hashtag = twttr.txt.htmlEscape(entity.hashtag);
    var attrs = clone(options.htmlAttrs || {});
    attrs.href = options.hashtagUrlBase + hashtag;
    attrs.title = "#" + hashtag;
    attrs["class"] = options.hashtagClass;
    if (hashtag.charAt(0).match(twttr.txt.regexen.rtl_chars)){
      attrs["class"] += " rtl";
    }
    if (options.targetBlank) {
      attrs.target = '_blank';
    }

    return twttr.txt.linkToTextWithSymbol(entity, hash, hashtag, attrs, options);
  };

  twttr.txt.linkToCashtag = function(entity, text, options) {
    var cashtag = twttr.txt.htmlEscape(entity.cashtag);
    var attrs = clone(options.htmlAttrs || {});
    attrs.href = options.cashtagUrlBase + cashtag;
    attrs.title = "$" + cashtag;
    attrs["class"] =  options.cashtagClass;
    if (options.targetBlank) {
      attrs.target = '_blank';
    }

    return twttr.txt.linkToTextWithSymbol(entity, "$", cashtag, attrs, options);
  };

  twttr.txt.linkToMentionAndList = function(entity, text, options) {
    var at = text.substring(entity.indices[0], entity.indices[0] + 1);
    var user = twttr.txt.htmlEscape(entity.screenName);
    var slashListname = twttr.txt.htmlEscape(entity.listSlug);
    var isList = entity.listSlug && !options.suppressLists;
    var attrs = clone(options.htmlAttrs || {});
    attrs["class"] = (isList ? options.listClass : options.usernameClass);
    attrs.href = isList ? options.listUrlBase + user + slashListname : options.usernameUrlBase + user;
    if (!isList && !options.suppressDataScreenName) {
      attrs['data-screen-name'] = user;
    }
    if (options.targetBlank) {
      attrs.target = '_blank';
    }

    return twttr.txt.linkToTextWithSymbol(entity, at, isList ? user + slashListname : user, attrs, options);
  };

  twttr.txt.linkToUrl = function(entity, text, options) {
    var url = entity.url;
    var displayUrl = url;
    var linkText = twttr.txt.htmlEscape(displayUrl);

    // If the caller passed a urlEntities object (provided by a Twitter API
    // response with include_entities=true), we use that to render the display_url
    // for each URL instead of it's underlying t.co URL.
    var urlEntity = (options.urlEntities && options.urlEntities[url]) || entity;
    if (urlEntity.display_url) {
      linkText = twttr.txt.linkTextWithEntity(urlEntity, options);
    }

    var attrs = clone(options.htmlAttrs || {});

    if (!url.match(twttr.txt.regexen.urlHasProtocol)) {
      url = "http://" + url;
    }
    attrs.href = url;

    if (options.targetBlank) {
      attrs.target = '_blank';
    }

    // set class only if urlClass is specified.
    if (options.urlClass) {
      attrs["class"] = options.urlClass;
    }

    // set target only if urlTarget is specified.
    if (options.urlTarget) {
      attrs.target = options.urlTarget;
    }

    if (!options.title && urlEntity.display_url) {
      attrs.title = urlEntity.expanded_url;
    }

    return twttr.txt.linkToText(entity, linkText, attrs, options);
  };

  twttr.txt.linkTextWithEntity = function (entity, options) {
    var displayUrl = entity.display_url;
    var expandedUrl = entity.expanded_url;

    // Goal: If a user copies and pastes a tweet containing t.co'ed link, the resulting paste
    // should contain the full original URL (expanded_url), not the display URL.
    //
    // Method: Whenever possible, we actually emit HTML that contains expanded_url, and use
    // font-size:0 to hide those parts that should not be displayed (because they are not part of display_url).
    // Elements with font-size:0 get copied even though they are not visible.
    // Note that display:none doesn't work here. Elements with display:none don't get copied.
    //
    // Additionally, we want to *display* ellipses, but we don't want them copied.  To make this happen we
    // wrap the ellipses in a tco-ellipsis class and provide an onCopy handler that sets display:none on
    // everything with the tco-ellipsis class.
    //
    // Exception: pic.twitter.com images, for which expandedUrl = "https://twitter.com/#!/username/status/1234/photo/1
    // For those URLs, display_url is not a substring of expanded_url, so we don't do anything special to render the elided parts.
    // For a pic.twitter.com URL, the only elided part will be the "https://", so this is fine.

    var displayUrlSansEllipses = displayUrl.replace(/…/g, ""); // We have to disregard ellipses for matching
    // Note: we currently only support eliding parts of the URL at the beginning or the end.
    // Eventually we may want to elide parts of the URL in the *middle*.  If so, this code will
    // become more complicated.  We will probably want to create a regexp out of display URL,
    // replacing every ellipsis with a ".*".
    if (expandedUrl.indexOf(displayUrlSansEllipses) != -1) {
      var displayUrlIndex = expandedUrl.indexOf(displayUrlSansEllipses);
      var v = {
        displayUrlSansEllipses: displayUrlSansEllipses,
        // Portion of expandedUrl that precedes the displayUrl substring
        beforeDisplayUrl: expandedUrl.substr(0, displayUrlIndex),
        // Portion of expandedUrl that comes after displayUrl
        afterDisplayUrl: expandedUrl.substr(displayUrlIndex + displayUrlSansEllipses.length),
        precedingEllipsis: displayUrl.match(/^…/) ? "…" : "",
        followingEllipsis: displayUrl.match(/…$/) ? "…" : ""
      };
      for (var k in v) {
        if (v.hasOwnProperty(k)) {
          v[k] = twttr.txt.htmlEscape(v[k]);
        }
      }
      // As an example: The user tweets "hi http://longdomainname.com/foo"
      // This gets shortened to "hi http://t.co/xyzabc", with display_url = "…nname.com/foo"
      // This will get rendered as:
      // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
      //   …
      //   <!-- There's a chance the onCopy event handler might not fire. In case that happens,
      //        we include an &nbsp; here so that the … doesn't bump up against the URL and ruin it.
      //        The &nbsp; is inside the tco-ellipsis span so that when the onCopy handler *does*
      //        fire, it doesn't get copied.  Otherwise the copied text would have two spaces in a row,
      //        e.g. "hi  http://longdomainname.com/foo".
      //   <span style='font-size:0'>&nbsp;</span>
      // </span>
      // <span style='font-size:0'>  <!-- This stuff should get copied but not displayed -->
      //   http://longdomai
      // </span>
      // <span class='js-display-url'> <!-- This stuff should get displayed *and* copied -->
      //   nname.com/foo
      // </span>
      // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
      //   <span style='font-size:0'>&nbsp;</span>
      //   …
      // </span>
      v['invisible'] = options.invisibleTagAttrs;
      return stringSupplant("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", v);
    }
    return displayUrl;
  };

  twttr.txt.autoLinkEntities = function(text, entities, options) {
    options = clone(options || {});

    options.hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS;
    options.hashtagUrlBase = options.hashtagUrlBase || "https://twitter.com/#!/search?q=%23";
    options.cashtagClass = options.cashtagClass || DEFAULT_CASHTAG_CLASS;
    options.cashtagUrlBase = options.cashtagUrlBase || "https://twitter.com/#!/search?q=%24";
    options.listClass = options.listClass || DEFAULT_LIST_CLASS;
    options.usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS;
    options.usernameUrlBase = options.usernameUrlBase || "https://twitter.com/";
    options.listUrlBase = options.listUrlBase || "https://twitter.com/";
    options.htmlAttrs = twttr.txt.extractHtmlAttrsFromOptions(options);
    options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";

    // remap url entities to hash
    var urlEntities, i, len;
    if(options.urlEntities) {
      urlEntities = {};
      for(i = 0, len = options.urlEntities.length; i < len; i++) {
        urlEntities[options.urlEntities[i].url] = options.urlEntities[i];
      }
      options.urlEntities = urlEntities;
    }

    var result = "";
    var beginIndex = 0;

    // sort entities by start index
    entities.sort(function(a,b){ return a.indices[0] - b.indices[0]; });

    var nonEntity = options.htmlEscapeNonEntities ? twttr.txt.htmlEscape : function(text) {
      return text;
    };

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      result += nonEntity(text.substring(beginIndex, entity.indices[0]));

      if (entity.url) {
        result += twttr.txt.linkToUrl(entity, text, options);
      } else if (entity.hashtag) {
        result += twttr.txt.linkToHashtag(entity, text, options);
      } else if (entity.screenName) {
        result += twttr.txt.linkToMentionAndList(entity, text, options);
      } else if (entity.cashtag) {
        result += twttr.txt.linkToCashtag(entity, text, options);
      }
      beginIndex = entity.indices[1];
    }
    result += nonEntity(text.substring(beginIndex, text.length));
    return result;
  };

  twttr.txt.autoLinkWithJSON = function(text, json, options) {
    // map JSON entity to twitter-text entity
    if (json.user_mentions) {
      for (var i = 0; i < json.user_mentions.length; i++) {
        // this is a @mention
        json.user_mentions[i].screenName = json.user_mentions[i].screen_name;
      }
    }
    
    if (json.hashtags) {
      for (var i = 0; i < json.hashtags.length; i++) {
        // this is a #hashtag
        json.hashtags[i].hashtag = json.hashtags[i].text;
      }
    }
    
    if (json.symbols) {
      for (var i = 0; i < json.symbols.length; i++) {
        // this is a $CASH tag
        json.symbols[i].cashtag = json.symbols[i].text;
      }
    }
    
    // concatenate all entities
    var entities = [];
    for (var key in json) {
      entities = entities.concat(json[key]);
    }

    // modify indices to UTF-16
    twttr.txt.modifyIndicesFromUnicodeToUTF16(text, entities);

    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.extractHtmlAttrsFromOptions = function(options) {
    var htmlAttrs = {};
    for (var k in options) {
      var v = options[k];
      if (OPTIONS_NOT_ATTRIBUTES[k]) continue;
      if (BOOLEAN_ATTRIBUTES[k]) {
        v = v ? k : null;
      }
      if (v == null) continue;
      htmlAttrs[k] = v;
    }
    return htmlAttrs;
  };

  twttr.txt.autoLink = function(text, options) {
    var entities = twttr.txt.extractEntitiesWithIndices(text, {extractUrlsWithoutProtocol: false});
    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.autoLinkUsernamesOrLists = function(text, options) {
    var entities = twttr.txt.extractMentionsOrListsWithIndices(text);
    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.autoLinkHashtags = function(text, options) {
    var entities = twttr.txt.extractHashtagsWithIndices(text);
    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.autoLinkCashtags = function(text, options) {
    var entities = twttr.txt.extractCashtagsWithIndices(text);
    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.autoLinkUrlsCustom = function(text, options) {
    var entities = twttr.txt.extractUrlsWithIndices(text, {extractUrlsWithoutProtocol: false});
    return twttr.txt.autoLinkEntities(text, entities, options);
  };

  twttr.txt.removeOverlappingEntities = function(entities) {
    entities.sort(function(a,b){ return a.indices[0] - b.indices[0]; });

    var prev = entities[0];
    for (var i = 1; i < entities.length; i++) {
      if (prev.indices[1] > entities[i].indices[0]) {
        entities.splice(i, 1);
        i--;
      } else {
        prev = entities[i];
      }
    }
  };

  twttr.txt.extractEntitiesWithIndices = function(text, options) {
    var entities = twttr.txt.extractUrlsWithIndices(text, options)
                    .concat(twttr.txt.extractMentionsOrListsWithIndices(text))
                    .concat(twttr.txt.extractHashtagsWithIndices(text, {checkUrlOverlap: false}))
                    .concat(twttr.txt.extractCashtagsWithIndices(text));

    if (entities.length == 0) {
      return [];
    }

    twttr.txt.removeOverlappingEntities(entities);
    return entities;
  };

  twttr.txt.extractMentions = function(text) {
    var screenNamesOnly = [],
        screenNamesWithIndices = twttr.txt.extractMentionsWithIndices(text);

    for (var i = 0; i < screenNamesWithIndices.length; i++) {
      var screenName = screenNamesWithIndices[i].screenName;
      screenNamesOnly.push(screenName);
    }

    return screenNamesOnly;
  };

  twttr.txt.extractMentionsWithIndices = function(text) {
    var mentions = [],
        mentionOrList,
        mentionsOrLists = twttr.txt.extractMentionsOrListsWithIndices(text);

    for (var i = 0 ; i < mentionsOrLists.length; i++) {
      mentionOrList = mentionsOrLists[i];
      if (mentionOrList.listSlug == '') {
        mentions.push({
          screenName: mentionOrList.screenName,
          indices: mentionOrList.indices
        });
      }
    }

    return mentions;
  };

  /**
   * Extract list or user mentions.
   * (Presence of listSlug indicates a list)
   */
  twttr.txt.extractMentionsOrListsWithIndices = function(text) {
    if (!text || !text.match(twttr.txt.regexen.atSigns)) {
      return [];
    }

    var possibleNames = [],
        slashListname;

    text.replace(twttr.txt.regexen.validMentionOrList, function(match, before, atSign, screenName, slashListname, offset, chunk) {
      var after = chunk.slice(offset + match.length);
      if (!after.match(twttr.txt.regexen.endMentionMatch)) {
        slashListname = slashListname || '';
        var startPosition = offset + before.length;
        var endPosition = startPosition + screenName.length + slashListname.length + 1;
        possibleNames.push({
          screenName: screenName,
          listSlug: slashListname,
          indices: [startPosition, endPosition]
        });
      }
    });

    return possibleNames;
  };


  twttr.txt.extractReplies = function(text) {
    if (!text) {
      return null;
    }

    var possibleScreenName = text.match(twttr.txt.regexen.validReply);
    if (!possibleScreenName ||
        RegExp.rightContext.match(twttr.txt.regexen.endMentionMatch)) {
      return null;
    }

    return possibleScreenName[1];
  };

  twttr.txt.extractUrls = function(text, options) {
    var urlsOnly = [],
        urlsWithIndices = twttr.txt.extractUrlsWithIndices(text, options);

    for (var i = 0; i < urlsWithIndices.length; i++) {
      urlsOnly.push(urlsWithIndices[i].url);
    }

    return urlsOnly;
  };

  twttr.txt.extractUrlsWithIndices = function(text, options) {
    if (!options) {
      options = {extractUrlsWithoutProtocol: true};
    }

    if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
      return [];
    }

    var urls = [];

    while (twttr.txt.regexen.extractUrl.exec(text)) {
      var before = RegExp.$2, url = RegExp.$3, protocol = RegExp.$4, domain = RegExp.$5, path = RegExp.$7;
      var endPosition = twttr.txt.regexen.extractUrl.lastIndex,
          startPosition = endPosition - url.length;

      // if protocol is missing and domain contains non-ASCII characters,
      // extract ASCII-only domains.
      if (!protocol) {
        if (!options.extractUrlsWithoutProtocol
            || before.match(twttr.txt.regexen.invalidUrlWithoutProtocolPrecedingChars)) {
          continue;
        }
        var lastUrl = null,
            lastUrlInvalidMatch = false,
            asciiEndPosition = 0;
        domain.replace(twttr.txt.regexen.validAsciiDomain, function(asciiDomain) {
          var asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition);
          asciiEndPosition = asciiStartPosition + asciiDomain.length;
          lastUrl = {
            url: asciiDomain,
            indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
          };
          lastUrlInvalidMatch = asciiDomain.match(twttr.txt.regexen.invalidShortDomain);
          if (!lastUrlInvalidMatch) {
            urls.push(lastUrl);
          }
        });

        // no ASCII-only domain found. Skip the entire URL.
        if (lastUrl == null) {
          continue;
        }

        // lastUrl only contains domain. Need to add path and query if they exist.
        if (path) {
          if (lastUrlInvalidMatch) {
            urls.push(lastUrl);
          }
          lastUrl.url = url.replace(domain, lastUrl.url);
          lastUrl.indices[1] = endPosition;
        }
      } else {
        // In the case of t.co URLs, don't allow additional path characters.
        if (url.match(twttr.txt.regexen.validTcoUrl)) {
          url = RegExp.lastMatch;
          endPosition = startPosition + url.length;
        }
        urls.push({
          url: url,
          indices: [startPosition, endPosition]
        });
      }
    }

    return urls;
  };

  twttr.txt.extractHashtags = function(text) {
    var hashtagsOnly = [],
        hashtagsWithIndices = twttr.txt.extractHashtagsWithIndices(text);

    for (var i = 0; i < hashtagsWithIndices.length; i++) {
      hashtagsOnly.push(hashtagsWithIndices[i].hashtag);
    }

    return hashtagsOnly;
  };

  twttr.txt.extractHashtagsWithIndices = function(text, options) {
    if (!options) {
      options = {checkUrlOverlap: true};
    }

    if (!text || !text.match(twttr.txt.regexen.hashSigns)) {
      return [];
    }

    var tags = [];

    text.replace(twttr.txt.regexen.validHashtag, function(match, before, hash, hashText, offset, chunk) {
      var after = chunk.slice(offset + match.length);
      if (after.match(twttr.txt.regexen.endHashtagMatch))
        return;
      var startPosition = offset + before.length;
      var endPosition = startPosition + hashText.length + 1;
      tags.push({
        hashtag: hashText,
        indices: [startPosition, endPosition]
      });
    });

    if (options.checkUrlOverlap) {
      // also extract URL entities
      var urls = twttr.txt.extractUrlsWithIndices(text);
      if (urls.length > 0) {
        var entities = tags.concat(urls);
        // remove overlap
        twttr.txt.removeOverlappingEntities(entities);
        // only push back hashtags
        tags = [];
        for (var i = 0; i < entities.length; i++) {
          if (entities[i].hashtag) {
            tags.push(entities[i]);
          }
        }
      }
    }

    return tags;
  };

  twttr.txt.extractCashtags = function(text) {
    var cashtagsOnly = [],
        cashtagsWithIndices = twttr.txt.extractCashtagsWithIndices(text);

    for (var i = 0; i < cashtagsWithIndices.length; i++) {
      cashtagsOnly.push(cashtagsWithIndices[i].cashtag);
    }

    return cashtagsOnly;
  };

  twttr.txt.extractCashtagsWithIndices = function(text) {
    if (!text || text.indexOf("$") == -1) {
      return [];
    }

    var tags = [];

    text.replace(twttr.txt.regexen.validCashtag, function(match, before, dollar, cashtag, offset, chunk) {
      var startPosition = offset + before.length;
      var endPosition = startPosition + cashtag.length + 1;
      tags.push({
        cashtag: cashtag,
        indices: [startPosition, endPosition]
      });
    });

    return tags;
  };

  twttr.txt.modifyIndicesFromUnicodeToUTF16 = function(text, entities) {
    twttr.txt.convertUnicodeIndices(text, entities, false);
  };

  twttr.txt.modifyIndicesFromUTF16ToUnicode = function(text, entities) {
    twttr.txt.convertUnicodeIndices(text, entities, true);
  };

  twttr.txt.getUnicodeTextLength = function(text) {
    return text.replace(twttr.txt.regexen.non_bmp_code_pairs, ' ').length;
  };

  twttr.txt.convertUnicodeIndices = function(text, entities, indicesInUTF16) {
    if (entities.length == 0) {
      return;
    }

    var charIndex = 0;
    var codePointIndex = 0;

    // sort entities by start index
    entities.sort(function(a,b){ return a.indices[0] - b.indices[0]; });
    var entityIndex = 0;
    var entity = entities[0];

    while (charIndex < text.length) {
      if (entity.indices[0] == (indicesInUTF16 ? charIndex : codePointIndex)) {
        var len = entity.indices[1] - entity.indices[0];
        entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
        entity.indices[1] = entity.indices[0] + len;

        entityIndex++;
        if (entityIndex == entities.length) {
          // no more entity
          break;
        }
        entity = entities[entityIndex];
      }

      var c = text.charCodeAt(charIndex);
      if (0xD800 <= c && c <= 0xDBFF && charIndex < text.length - 1) {
        // Found high surrogate char
        c = text.charCodeAt(charIndex + 1);
        if (0xDC00 <= c && c <= 0xDFFF) {
          // Found surrogate pair
          charIndex++;
        }
      }
      codePointIndex++;
      charIndex++;
    }
  };

  // this essentially does text.split(/<|>/)
  // except that won't work in IE, where empty strings are ommitted
  // so "<>".split(/<|>/) => [] in IE, but is ["", "", ""] in all others
  // but "<<".split("<") => ["", "", ""]
  twttr.txt.splitTags = function(text) {
    var firstSplits = text.split("<"),
        secondSplits,
        allSplits = [],
        split;

    for (var i = 0; i < firstSplits.length; i += 1) {
      split = firstSplits[i];
      if (!split) {
        allSplits.push("");
      } else {
        secondSplits = split.split(">");
        for (var j = 0; j < secondSplits.length; j += 1) {
          allSplits.push(secondSplits[j]);
        }
      }
    }

    return allSplits;
  };

  twttr.txt.hitHighlight = function(text, hits, options) {
    var defaultHighlightTag = "em";

    hits = hits || [];
    options = options || {};

    if (hits.length === 0) {
      return text;
    }

    var tagName = options.tag || defaultHighlightTag,
        tags = ["<" + tagName + ">", "</" + tagName + ">"],
        chunks = twttr.txt.splitTags(text),
        i,
        j,
        result = "",
        chunkIndex = 0,
        chunk = chunks[0],
        prevChunksLen = 0,
        chunkCursor = 0,
        startInChunk = false,
        chunkChars = chunk,
        flatHits = [],
        index,
        hit,
        tag,
        placed,
        hitSpot;

    for (i = 0; i < hits.length; i += 1) {
      for (j = 0; j < hits[i].length; j += 1) {
        flatHits.push(hits[i][j]);
      }
    }

    for (index = 0; index < flatHits.length; index += 1) {
      hit = flatHits[index];
      tag = tags[index % 2];
      placed = false;

      while (chunk != null && hit >= prevChunksLen + chunk.length) {
        result += chunkChars.slice(chunkCursor);
        if (startInChunk && hit === prevChunksLen + chunkChars.length) {
          result += tag;
          placed = true;
        }

        if (chunks[chunkIndex + 1]) {
          result += "<" + chunks[chunkIndex + 1] + ">";
        }

        prevChunksLen += chunkChars.length;
        chunkCursor = 0;
        chunkIndex += 2;
        chunk = chunks[chunkIndex];
        chunkChars = chunk;
        startInChunk = false;
      }

      if (!placed && chunk != null) {
        hitSpot = hit - prevChunksLen;
        result += chunkChars.slice(chunkCursor, hitSpot) + tag;
        chunkCursor = hitSpot;
        if (index % 2 === 0) {
          startInChunk = true;
        } else {
          startInChunk = false;
        }
      } else if(!placed) {
        placed = true;
        result += tag;
      }
    }

    if (chunk != null) {
      if (chunkCursor < chunkChars.length) {
        result += chunkChars.slice(chunkCursor);
      }
      for (index = chunkIndex + 1; index < chunks.length; index += 1) {
        result += (index % 2 === 0 ? chunks[index] : "<" + chunks[index] + ">");
      }
    }

    return result;
  };

  var MAX_LENGTH = 140;

  // Characters not allowed in Tweets
  var INVALID_CHARACTERS = [
    // BOM
    fromCode(0xFFFE),
    fromCode(0xFEFF),

    // Special
    fromCode(0xFFFF),

    // Directional Change
    fromCode(0x202A),
    fromCode(0x202B),
    fromCode(0x202C),
    fromCode(0x202D),
    fromCode(0x202E)
  ];

  // Returns the length of Tweet text with consideration to t.co URL replacement
  // and chars outside the basic multilingual plane that use 2 UTF16 code points
  twttr.txt.getTweetLength = function(text, options) {
    if (!options) {
      options = {
          // These come from https://api.twitter.com/1/help/configuration.json
          // described by https://dev.twitter.com/docs/api/1/get/help/configuration
          short_url_length: 22,
          short_url_length_https: 23
      };
    }
    var textLength = twttr.txt.getUnicodeTextLength(text),
        urlsWithIndices = twttr.txt.extractUrlsWithIndices(text);
    twttr.txt.modifyIndicesFromUTF16ToUnicode(text, urlsWithIndices);

    for (var i = 0; i < urlsWithIndices.length; i++) {
    	// Subtract the length of the original URL
      textLength += urlsWithIndices[i].indices[0] - urlsWithIndices[i].indices[1];

      // Add 23 characters for URL starting with https://
      // Otherwise add 22 characters
      if (urlsWithIndices[i].url.toLowerCase().match(twttr.txt.regexen.urlHasHttps)) {
         textLength += options.short_url_length_https;
      } else {
        textLength += options.short_url_length;
      }
    }

    return textLength;
  };

  // Check the text for any reason that it may not be valid as a Tweet. This is meant as a pre-validation
  // before posting to api.twitter.com. There are several server-side reasons for Tweets to fail but this pre-validation
  // will allow quicker feedback.
  //
  // Returns false if this text is valid. Otherwise one of the following strings will be returned:
  //
  //   "too_long": if the text is too long
  //   "empty": if the text is nil or empty
  //   "invalid_characters": if the text contains non-Unicode or any of the disallowed Unicode characters
  twttr.txt.isInvalidTweet = function(text) {
    if (!text) {
      return "empty";
    }

    // Determine max length independent of URL length
    if (twttr.txt.getTweetLength(text) > MAX_LENGTH) {
      return "too_long";
    }

    for (var i = 0; i < INVALID_CHARACTERS.length; i++) {
      if (text.indexOf(INVALID_CHARACTERS[i]) >= 0) {
        return "invalid_characters";
      }
    }

    return false;
  };

  twttr.txt.isValidTweetText = function(text) {
    return !twttr.txt.isInvalidTweet(text);
  };

  twttr.txt.isValidUsername = function(username) {
    if (!username) {
      return false;
    }

    var extracted = twttr.txt.extractMentions(username);

    // Should extract the username minus the @ sign, hence the .slice(1)
    return extracted.length === 1 && extracted[0] === username.slice(1);
  };

  var VALID_LIST_RE = regexSupplant(/^#{validMentionOrList}$/);

  twttr.txt.isValidList = function(usernameList) {
    var match = usernameList.match(VALID_LIST_RE);

    // Must have matched and had nothing before or after
    return !!(match && match[1] == "" && match[4]);
  };

  twttr.txt.isValidHashtag = function(hashtag) {
    if (!hashtag) {
      return false;
    }

    var extracted = twttr.txt.extractHashtags(hashtag);

    // Should extract the hashtag minus the # sign, hence the .slice(1)
    return extracted.length === 1 && extracted[0] === hashtag.slice(1);
  };

  twttr.txt.isValidUrl = function(url, unicodeDomains, requireProtocol) {
    if (unicodeDomains == null) {
      unicodeDomains = true;
    }

    if (requireProtocol == null) {
      requireProtocol = true;
    }

    if (!url) {
      return false;
    }

    var urlParts = url.match(twttr.txt.regexen.validateUrlUnencoded);

    if (!urlParts || urlParts[0] !== url) {
      return false;
    }

    var scheme = urlParts[1],
        authority = urlParts[2],
        path = urlParts[3],
        query = urlParts[4],
        fragment = urlParts[5];

    if (!(
      (!requireProtocol || (isValidMatch(scheme, twttr.txt.regexen.validateUrlScheme) && scheme.match(/^https?$/i))) &&
      isValidMatch(path, twttr.txt.regexen.validateUrlPath) &&
      isValidMatch(query, twttr.txt.regexen.validateUrlQuery, true) &&
      isValidMatch(fragment, twttr.txt.regexen.validateUrlFragment, true)
    )) {
      return false;
    }

    return (unicodeDomains && isValidMatch(authority, twttr.txt.regexen.validateUrlUnicodeAuthority)) ||
           (!unicodeDomains && isValidMatch(authority, twttr.txt.regexen.validateUrlAuthority));
  };

  function isValidMatch(string, regex, optional) {
    if (!optional) {
      // RegExp["$&"] is the text of the last match
      // blank strings are ok, but are falsy, so we check stringiness instead of truthiness
      return ((typeof string === "string") && string.match(regex) && RegExp["$&"] === string);
    }

    // RegExp["$&"] is the text of the last match
    return (!string || (string.match(regex) && RegExp["$&"] === string));
  }

  if (typeof module != 'undefined' && module.exports) {
    module.exports = twttr.txt;
  }

  if (typeof window != 'undefined') {
    if (window.twttr) {
      for (var prop in twttr) {
        window.twttr[prop] = twttr[prop];
      }
    } else {
      window.twttr = twttr;
    }
  }
})();

},{}],57:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}]},{},[1])
;