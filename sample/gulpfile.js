var gulp = require('gulp');
var uglify = require('gulp-uglify');
var soy = require('../');

gulp.task('default', function() {
  return gulp.src('./sample.soy')
    .pipe(soy({
      root: __dirname
    }))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest('./'));
});
