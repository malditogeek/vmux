var gulp        = require('gulp');
var concat      = require('gulp-concat');
var jade        = require('gulp-jade');
var stylus      = require('gulp-stylus');
var compiler    = require('gulp-hogan-compile');
var minifyCSS   = require('gulp-minify-css');
var browserify  = require('browserify');
var fs          = require('fs');

var paths = {
  app:        './client/js/app/app.coffee',
  site:       './client/js/site/site.coffee',
  styles:     ['client/css/*'],
  js:         ['client/js/**/**'],
  templates:  ['client/templates/**/*.jade']
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

var env = envs[process.env.NODE_ENV || 'development'];

gulp.task('js', function() {
  var b = browserify(paths.app)
  b.require('./client/js/app/vendor/jquery-2.1.0.js', {expose: 'jquery'})
  b.require('./client/js/app/vendor/hogan-3.0.0.js',  {expose: 'hogan'})
  b.require('./client/js/app/vendor/backbone.js',     {expose: 'backbone'})
  b.transform('coffeeify')
  if (!process.env.DEBUG) b.transform('uglifyify');
  b.bundle({}, function(err, src) {
    if (err) {
      console.log('[browserify][err]', err);
    } else {
      var output = 'window.ENV=' + JSON.stringify(env) + '\n' + src;
      fs.writeFile('./static/vmux.js', output);
      console.log('[browserify][vmux.js done]');
    }
  });
});

gulp.task('site.js', function() {
  var b = browserify(paths.site)
  b.require('./client/js/app/vendor/jquery-2.1.0.js', {expose: 'jquery'})
  b.transform('coffeeify')
  if (!process.env.DEBUG) b.transform('uglifyify');
  b.bundle({}, function(err, src) {
    if (err) {
      console.log('[browserify][err]', err);
    } else {
      fs.writeFile('./static/site.js', src);
      console.log('[browserify][site.js done]');
    }
  });
});

gulp.task('css', function () {
  gulp.src(paths.styles)
    .pipe(stylus({set:['compress']}))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(concat('vmux.css'))
    .pipe(gulp.dest('./static'));
});

gulp.task('templates', function () {
  fn = function(file) { return file.relative.replace('.html', ''); }

  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(compiler('templates.js', {
      wrapper: 'commonjs', 
      templateName: fn
    }))
    .pipe(gulp.dest('./client/js/app'))
});

// Continuous build
gulp.task('watch', function() {
  gulp.watch([paths.js],        ['js']);
  gulp.watch([paths.styles],    ['css']);
  gulp.watch([paths.templates], ['templates']);
});

gulp.task('default', ['js', 'css', 'templates', 'site.js', 'watch']);
