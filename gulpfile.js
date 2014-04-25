var gulp = require('gulp');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');

var b = browserify('./src/app.js');

gulp.task('script', function(done) {
  b.bundle({ debug: true })
    .pipe(vinylSourceStream('bundle.js'))
    .pipe(gulp.dest('./', { base: './' }))
    .on('end', done);
});

gulp.task('default', ['script'], function() {
  b.on('update', function() {
    gulp.start('script');
  });
});
