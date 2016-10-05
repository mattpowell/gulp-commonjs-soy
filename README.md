# gulp-commonjs-soy
> Compile Closure/Soy Templates and convert to CommonJs via Gulp.

Example
-------
```js
var gulp = require('gulp');
var soy = require('gulp-commonjs-soy');

gulp.task('compile-soy', function() {
  return gulp.src('public/templates/**/*.soy')
    .pipe(soy({
      root: __dirname + '/public/templates'
    })
    .pipe(gulp.dest('build/public/js/templates'));
});
```

The above example will compile Soy templates (in `public/templates`), convert to commonjs via [commonjs-soy](https://github.com/mattpowell/commonjs-soy), and output to `build/public/js/templates` as a commonjs module (with a `.js` extension). You can then pass them through [browserify](http://browserify.org/) or some other packager for use in the browser.

Options
-------
* Setting `root` defines the path for `{call...}`s that need to be converted to `require`s (defaults to `__dirname`).

License
-------
MIT