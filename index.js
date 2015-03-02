var through = require('through');
var File = require('vinyl');

module.exports = function(out, options) {

  options = options || {};

  var files = [];
  var filePaths = [];

  var onFile = function(file) {
    files.push(file);
    var path;
    if (options.absolute) {
      path = file.path;
    } else {
      path = file.path.replace(file.base, '');
      //path = file.path.replace(new RegExp('^' + __dirname + '/'), '');
    }
    console.log(path);
    filePaths.push(path);
  };

  var onEnd = function() {

    var file = new File({
      path: out,
      contents: new Buffer(JSON.stringify(filePaths, null, '  '))
    });

    this.emit('data', file);
    this.emit('end');

  };

  return through(onFile, onEnd);

};
