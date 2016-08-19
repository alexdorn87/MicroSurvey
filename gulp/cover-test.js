'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var serverFiles = ['server/boot/*.js', 'server/route/*.js']; //Add more for nodeJS
var testFiles = ['test/example.js']; //Where the unit test are held test file

gulp.task('pretest', function(){
  return gulp.src(serverFiles)
  .pipe(istanbul({includeUntested: true}))
  .pipe(istanbul.hookRequire());
});

gulp.task('cover-test', ['pretest'], function(done){
  gulp.src(testFiles)
  .pipe(mocha({reporter: 'spec'}))
  .pipe(istanbul.writeReports())
  .on('end', function(){
    console.log('FINISHED');
    done();
  });
});
