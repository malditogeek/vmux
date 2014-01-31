![VMUX](http://i.imgur.com/ykMRrTV.png)

## Plugin-free video calls in your browser using WebRTC

VMUX is a Skype™ alternative that runs in the browser. It's built on top of WebRTC so you don't need to install any plugins or use Flash. You can do one-to-one or multi-party video calls and all the communications are P2P and encrypted.

You can try it at [https://vmux.co](https://vmux.co)

Have any questions? Join the conversation at [![Gitter](https://badges.gitter.im/malditogeek/vmux.png)](https://gitter.im/malditogeek/vmux)

## Browser support

VMUX supports the lastest stable versions of Chrome, ~~Firefox~~ and Opera.

For more info about WebRTC browser support go to [WebRTC.org](http://webrtc.org/).

## Stack

  * [Node.js](http://nodejs.org/)
  * [SocketStream](https://github.com/socketstream/socketstream)
  * [Backbone.js](http://backbonejs.org/)

## Getting started

Prerequisites: Redis

If you already have a working Node/NPM environment, should be as easy as:

    npm install
    npm start

Point your browser to [localhost:5000](http://localhost:5000/)

## Deployment

If you're going to run VMUX in production, make sure you create your own Twitter app for authentication and it's [configured properly](http://i.imgur.com/jlIuRQl.png).

## Author

[Mauro Pompilio](https://twitter.com/malditogeek)

## License

VMUX is release under the BSD license.
