var gulp        = require('gulp');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var bundlerClass = require('./bundler');
var bundler = new bundlerClass(argv.bundleMode, process.env.NODE_ENV, argv.coffeeScriptCompiler, argv.debug);

// Gulp tasks can be made asynchronous if its fn does one of the following:
// - Accept a callback
// - Return a stream
// - Return a promise
// More info here : https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
// The bundler always returns a promise

gulp.task('clean', function() {
  return bundler.cleanupGeneratedFiles();
});

gulp.task('vmux.js', function() {
  return bundler.packApp();
});

gulp.task('site.js', function() {
  return bundler.packSite();
});

gulp.task('css', function () {
  return bundler.packCss();
});

gulp.task('templates', function () {
  return bundler.packTemplates();
});

// Continuous build
gulp.task('watch', function() {
  gulp.watch([bundler.paths.js],        ['vmux.js']);
  gulp.watch([bundler.paths.styles],    ['css']);
  gulp.watch([bundler.paths.templates], ['templates']);
});

// This will run in this order:
// * clean
// * Templates
// * css, vmux.js and site.js in parallel
// * watch
// * Finally call the callback function
gulp.task('default', function(callback) {
  runSequence('clean', 'templates', ['css', 'vmux.js', 'site.js'], 'watch', callback);
});
