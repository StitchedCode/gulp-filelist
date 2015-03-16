var through = require('through');
var File = require('vinyl');

module.exports = function(out, options) {

  options = options || {};

  var manifest = {};

  var onFile = function(file) {
    var path;
    if (options.absolute) {
      path = file.path;
    } else {
      options.prefix = options.prefix || '';
      path = file.path.replace(file.base, options.prefix);
      //path = file.path.replace(new RegExp('^' + __dirname + '/'), '');
    }
    manifest[file.path.replace(file.base+'/', '')] = path;
  };

  var onEnd = function() {

    var file = new File({
      path: out,
      contents: new Buffer(JSON.stringify(manifest, null, '  '))
    });

    this.emit('data', file);
    this.emit('end');

  };

  return through(onFile, onEnd);

};
