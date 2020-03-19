var fs = require('fs'),
    path = require('path'),
    through = require('through2');

var compressor = require('./compressor');

module.exports = function (options) {
    options = options || [];
    return through.obj(function (file, encoding, callback) {
        if (file.isStream()) {
            return callback(createError(file, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            var code = String(file.contents);

            var temp = null;
            for (var i = 0; i < options.length; i++) {
                if (typeof(options[i].file) == "string") {
                    temp = compressor(fs.readFileSync(options[i].file, 'utf-8'));
                    if (typeof(options[i].fileRead) == "function") temp = options[i].fileRead(temp);
                    code = code.replace(options[i].rule, temp);
                } else if (typeof (options[i].text) != "undefined") {
                    code = code.replace(options[i].rule, options[i].text);
                }
            }

            file.contents = new Buffer(code);
        }

        callback(null, file);
    });
};
