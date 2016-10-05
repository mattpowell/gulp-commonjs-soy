var Through2 = require('through2');
var Path = require('path');
var CompileSoy = require('commonjs-soy');
var Gutil = require('gulp-util');

module.exports = function (opts) {
  opts = opts || {};
  return Through2.obj(function(file, encoding, callback) {

    CompileSoy.transpile({
      content: file.contents,
      path: file.path,
      resolver: function(filePath, modulePath, moduleId) {

        // use special paths for soy/soydata modules
        if (['soy', 'soydata'].indexOf(modulePath) > -1) {
          return 'soyutils/' + modulePath + '.js'
        }

        var fullModulePath = Path.normalize((opts.root || __dirname) + Path.sep + modulePath + '.js' );
        return '.' + Path.sep + Path.relative(Path.dirname(filePath), fullModulePath);
      }
    }, function(err, template) {

      if (err) {
        stream.emit('error', new Gutil.PluginError('gulp-commonjs-soy', err, {
          fileName: file.path
        }));
      }

      file.contents = new Buffer(template);
      file.path = file.path.replace(/\.soy$/, '.js');

      callback(err, file);
      
    });

  });
}