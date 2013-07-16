![VMUX](http://i.imgur.com/ykMRrTV.png)

## Plugin-free video calls in your browser using WebRTC

There's a public instance of the app running at http://vmux.co. Hosting courtesy of [Nodejitsu Open Source initiative.](http://opensource.jit.su/)

## Browser support

VMUX supports the lastest stable versions of Chrome and Firefox.

For more info about WebRTC browser support go to [WebRTC.org](http://webrtc.org/).

## Stack

  * [Node.js](http://nodejs.org/)
  * [SocketStream](https://github.com/socketstream/socketstream)
  * [Backbone.js](http://backbonejs.org/)

## Getting started

If you already have a working Node/NPM environment, should be as easy as:

    npm install
    npm start

Point your browser to [localhost:5000](http://localhost:5000/)

## Deployment

If you're going to run VMUX in production, make sure you create your own Twitter app for authentication and it's [configured properly](http://i.imgur.com/jlIuRQl.png). You'll also need to adjust the redirectHost in app.coffee.

## Author

[Mauro Pompilio](https://twitter.com/malditogeek)

## License

VMUX is release under the BSD license.
