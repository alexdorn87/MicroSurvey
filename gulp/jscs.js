'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var jscs = require('gulp-jscs');

var commonPath = 'common/';
var serverPath = 'server/';

//Checking against client js code.
gulp.task('jscs-client',function() {
  return gulp.src(conf.paths.src + '/app/**/*.js')
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest(conf.paths.src + '/app'));
});

//Checking against common js code.
gulp.task('jscs-common', function(){
  return gulp.src(path.join(commonPath, '**/*js'))
             .pipe(jscs({fix: true}))
             .pipe(gulp.dest(commonPath));
});

//Checking against server js code.
gulp.task('jscs-server', function(){
  return gulp.src(path.join(serverPath, '**/*.js'))
             .pipe(jscs({fix: true}))
             .pipe(gulp.dest(serverPath));
});

gulp.task('jscs', ['jscs-client', 'jscs-common', 'jscs-server']);
