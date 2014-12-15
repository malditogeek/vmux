var gulp = require('gulp');
var fs = require('fs');
var webpack = require('webpack');
var browserify = require('browserify');
var Q = require('q');

var coffeeScriptCompilers = {
  coffeeScript : 'coffeeScript',
  coffeeScriptRedux : 'coffeeScriptRedux'
};

var bundleModes = {
  webpack : 'webpack',
  browserify : 'browserify'
};

var envs = {
  development: {
    name: 'development',
    host: 'http://localhost:5000'
  },
  production:{
    name: 'production',
    host: 'https://vmux.co'
  }
};

function Bundler(bundleMode, env, coffeeScriptCompiler, debug) {
  this.bundleMode = bundleMode || bundleModes.browserify;
  console.log('Bundle mode : ' + this.bundleMode);

  this.env = envs[env || 'development'];
  console.log('Env : ' + JSON.stringify(this.env));

  this.coffeeScriptCompiler = coffeeScriptCompiler === coffeeScriptCompilers.coffeeScript ||
                              coffeeScriptCompiler === coffeeScriptCompilers.coffeeScriptRedux ?
                              coffeeScriptCompiler : 'coffeeScript';
  console.log('CoffeeScript compiler : ' + this.coffeeScriptCompiler);

  this.debug = debug || false;
  console.log('Debug : ' + this.debug);

  this.paths = {
    styles:     ['client/css/*'],
    templates:  ['client/templates/**/*.jade'],
    js:         ['client/js/**/**'],
    app:        './client/js/app/app.coffee',
    site:       './client/js/site/site.coffee'
  };
}
module.exports = Bundler;

function deleteFileSync(filename) {
  var deferred = Q.defer();

  fs.unlink(filename, function () {
    if (this.debug)
    {
        console.log(filename + ' deleted');
    }

    deferred.resolve();
  });

  return deferred.promise;
};

Bundler.prototype.cleanupGeneratedFiles = function() {
  var deferred = Q.defer();

  Q.all([
    deleteFileSync.call(this, './static/vmux.js'),
    deleteFileSync.call(this, './static/vmux.js.map'),
    deleteFileSync.call(this, './static/site.js'),
    deleteFileSync.call(this, './static/site.js.map'),
    deleteFileSync.call(this, './static/vmux.css'),
    deleteFileSync.call(this, './client/js/app/templates.js')
    ]).then(function () {
      deferred.resolve();
    });

  return deferred.promise;
};

Bundler.prototype.packCss = function() {
  var deferred = Q.defer();

  var stylus = require('gulp-stylus');
  var minifyCSS = require('gulp-minify-css');
  var concat = require('gulp-concat');

  gulp.src(this.paths.styles)
    .pipe(stylus({set:['compress']}))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(concat('vmux.css'))
    .pipe(gulp.dest('./static'))
    // when stream ends, call callback
    .on('end', function () {
         deferred.resolve();
    });

    return deferred.promise;
};

Bundler.prototype.packTemplates = function() {
  var deferred = Q.defer();
  var jade = require('gulp-jade');
  var compiler    = require('gulp-hogan-compile');

  fn = function(file) { return file.relative.replace('.html', ''); }

  return gulp.src(this.paths.templates)
    .pipe(jade())
    .pipe(compiler('templates.js', {
      wrapper: 'commonjs',
      templateName: fn
    }))
    .pipe(gulp.dest('./client/js/app'))
    // when stream ends, call callback
    .on('end', function () {
        deferred.resolve();
    });

    return deferred.promise;
};

Bundler.prototype.packWithWebpack = function(webpackConfig, moduleName, deferred) {
  if (this.coffeeScriptCompiler === coffeeScriptCompilers.coffeeScriptRedux)
  {
      webpackConfig.module.loaders.push({ test: /\.coffee$/, loader: 'coffee-redux-loader' });
  }
  else
  {
    webpackConfig.module.loaders.push({ test: /\.coffee$/, loader: 'coffee-loader' });
  }

  if (this.debug)
  {
    webpackConfig.debug = this.debug;
    webpackConfig.devtool = 'source-map'; //'inline-source-map';
  }

  if (!this.debug)
  {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  // run webpack
  webpack(webpackConfig, function(err, stats) {
      if(err) {
        console.log('[webpack][err]', err);
      } else {
        console.log('[webpack][' + moduleName + ' done]');
        //console.log(stats.toJson().errors);
      }

      deferred.resolve();
  });
}

Bundler.prototype.packApp = function() {
  var deferred = Q.defer();

  if (this.bundleMode === bundleModes.webpack)
  {
    var webpackConfig = {
        entry: ['./client/js/app/app.coffee'],
        output: {
            filename: 'vmux.js',
            path: __dirname + '/static',
            publicPath : '/static',
            pathInfo : true
        },
        module: {
            loaders: [
                { test: /bigint\.js$/, loader: "imports?define=>undefined" }
            ]
        },
        resolve: {
            alias: {
              jquery : __dirname + '/client/js/app/vendor/jquery-2.1.0.js',
              hogan : __dirname + '/client/js/app/vendor/hogan-3.0.0.js',
              backbone : __dirname + '/client/js/app/vendor/backbone.js'
            },
            extensions: ['', '.web.coffee', '.web.js', '.coffee', '.js'],
            modulesDirectories: ['node_modules']
        },
        plugins: [
        new webpack.DefinePlugin({
              ENV: 'window.ENV=' + JSON.stringify(this.env) + '\n'
            })
        ],
        bail: true
    };

    this.packWithWebpack(webpackConfig, 'vmux.js', deferred);
  }
  else if (this.bundleMode === bundleModes.browserify)
  {
    var b = browserify(this.paths.app);
    b.require('./client/js/app/vendor/jquery-2.1.0.js', {expose: 'jquery'});
    b.require('./client/js/app/vendor/hogan-3.0.0.js',  {expose: 'hogan'});
    b.require('./client/js/app/vendor/backbone.js',     {expose: 'backbone'});

    if (this.coffeeScriptCompiler === coffeeScriptCompilers.coffeeScriptRedux)
    {
      b.transform('coffeeify-redux');
    }
    else
    {
      b.transform('coffeeify');
    }

    if (!this.debug)
    {
      b.transform('uglifyify');
    }

    var thisObj = this;

    b.bundle({ debug: this.debug}, function(err, src) {
      if (err) {
        console.log('[browserify][err]', err);
      } else {
        var output = 'window.ENV=' + JSON.stringify(thisObj.env) + '\n' + src;
        fs.writeFile('./static/vmux.js', output);
        console.log('[browserify][vmux.js done]');
      }

      deferred.resolve();
    });
  }

  return deferred.promise;
};

Bundler.prototype.packSite = function() {
  var deferred = Q.defer();

  if (this.bundleMode === bundleModes.webpack)
  {
    var webpackConfig = {
          entry: ['./client/js/site/site.coffee'],
          output: {
              filename: 'site.js',
              path: __dirname + '/static',
              publicPath : '/static',
              pathInfo : true
          },
          module: {
              loaders: []
          },
          resolve: {
              alias: {
                jquery : __dirname + '/client/js/app/vendor/jquery-2.1.0.js',
              },
              extensions: ['', '.web.coffee', '.web.js', '.coffee', '.js'],
              modulesDirectories: ['node_modules']
          },
          plugins: [],
          bail: true
    };

    this.packWithWebpack(webpackConfig, 'site.js', deferred);
  }
  else if (this.bundleMode === bundleModes.browserify)
  {
    var b = browserify(this.paths.site)
    b.require('./client/js/app/vendor/jquery-2.1.0.js', {expose: 'jquery'});

    if (this.coffeeScriptCompiler === coffeeScriptCompilers.coffeeScriptRedux)
    {
      b.transform('coffeeify-redux');
    }
    else
    {
      b.transform('coffeeify');
    }

    if (!this.debug)
    {
      b.transform('uglifyify');
    }

    b.bundle({ debug: this.debug}, function(err, src) {
      if (err) {
        console.log('[browserify][err]', err);
      } else {
        fs.writeFile('./static/site.js', src);
        console.log('[browserify][site.js done]');
      }

      deferred.resolve();
    });
  }

  return deferred.promise;
};
