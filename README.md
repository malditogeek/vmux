![VMUX](http://i.imgur.com/ykMRrTV.png)

## Secure P2P text, audio and video chats in your browser using WebRTC

VMUX is a Skype/Hangouts alternative that runs in the browser. It's built on top of WebRTC so you don't need to install any plugins or use Flash. You can do one-to-one or multi-party video calls and all the communications are P2P and encrypted.

You can use it at [https://vmux.co](https://vmux.co)

Have any questions? Join the conversation at [![Gitter](https://badges.gitter.im/malditogeek/vmux.png)](https://gitter.im/malditogeek/vmux)

## Browser support

VMUX works on the lastest stable versions of Chrome, Chrome for Android, Firefox, Firefox for Android and Opera.

For more info about WebRTC browser support go to [WebRTC.org](http://webrtc.org/).

## Getting started

Prerequisite: Redis

If you already have a working Node/NPM environment, should be as easy as:

    npm install
    gulp
    npm start

( if `gulp` is not installed globally, do `npm i -g gulp` in a terminal. 
Use `sudo` in front of it if you get the EACCESS error. [See here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) for more help )

Point your browser to [localhost:5000](http://localhost:5000/)

## Deployment

If you're going to run VMUX in production, make sure you create your own Twitter app for authentication and it's [configured properly](http://i.imgur.com/jlIuRQl.png).

## Author

[Mauro Pompilio](https://twitter.com/malditogeek)

## License

VMUX is released under the BSD license.
