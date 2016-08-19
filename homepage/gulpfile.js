'use strict';

var path = require('path');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var homePath = '/homepage';

gulp.task('home:css', function () {
  return gulp.src([
      path.join(homePath, 'css/**/*.css'),
      '!' + path.join(homePath, 'css/*.min.css')
    ])
    .pipe($.minifyCss())
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe($.concat('styles.min.css'))
    .pipe(gulp.dest(homePath + '/css/'));
});


gulp.task('home:js', function () {
  console.log(path.join(homePath, 'js/libs/jquery-1.11.3.min.js'));
  return gulp.src([
      path.join(homePath, 'js/libs/jquery-1.11.3.min.js'),
      path.join(homePath, 'js/libs/jquery.bxslider.min.js'),
      path.join(homePath, 'js/main.js')
      //'!' + path.join(homePath, 'js/*.min.js')
    ])
    .pipe($.concat('scripts.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(homePath + '/js/'))
});

gulp.task('home', ['home:css', 'home:js']);
