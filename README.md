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

1. [Install Node.js](http://bevry.me/node/install)
2. Clone this repo via `git clone https://github.com/malditogeek/vmux.git`
3. Install modules via `cd vmux; npm install`
4. Create a new Twitter Application via https://dev.twitter.com
	1. Set Callback URL to `http://127.0.0.1:5000/auth/twitter/callback`
	2. Enable `Allow this application to be used to Sign in with Twitter`
	3. Add your app's `Consumer key` to your environment variables as `TW_KEY`
	4. Add your app's `Consumer secret` to your environment variables as `TW_SECRET`
5. Run the app via `npm start
6. Open [localhost:5000](http://localhost:5000/) in your web browser


## Deployment

If you're going to run VMUX in production, make sure you create your own Twitter app for authentication and it's [configured properly](http://i.imgur.com/jlIuRQl.png). You'll also need to adjust the redirectHost in app.coffee.

## Contact

Twitter: [@vmuxapp](https://twitter.com/vmuxapp)
IRC: [#vmux](http://webchat.freenode.net/?channels=vmux) on Freenode

## Author

[Mauro Pompilio](https://twitter.com/malditogeek)


## License

VMUX is release under the BSD license.
