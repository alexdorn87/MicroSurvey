'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();


function webpackWrapper(watch, test, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{ test: /\.js$/, exclude: [/node_modules/, /lb-services.js/, /Chart.min.js/], loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: [/node_modules/, /lb-services.js/, /Chart.min.js/], loaders: ['ng-annotate', 'babel-loader']}]
    },
    output: { filename: 'index.module.js' }
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if (watch) {
      watch = false;
      callback();
    }
  };

  var sources = [path.join(conf.paths.src, '/app/index.module.js'), path.join(conf.paths.src, '/app/ngConstants.js')];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('config', function() {
  var config = require('../config.json');
  var envConfig;
  if (process.env.NODE_ENV === 'production') {
      envConfig = config['production'];
  } else {
    envConfig = config['development'];
  }
  return $.ngConstant(envConfig)
    .pipe(gulp.dest('client/src/app/'));
});

gulp.task('scripts', ['config'], function() {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function(callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function() {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function(callback) {
  return webpackWrapper(true, true, callback);
});
