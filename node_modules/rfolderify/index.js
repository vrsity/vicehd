var path = require('path');
var fs = require('fs');

var through = require('through');
var falafel = require('falafel');

var defaults = {require:"require",}

module.exports = function (file, options) {
    if (/\.json$/.test(file)) return through();

    var data = '';
    var rfileNames = {};
    var dirname = path.dirname(file);
    var varNames = ['__filename', '__dirname', 'path', 'join'];
    var vars = [file, dirname, path, path.join];
    var pending = 0;

    var tr = through(write, end);
    return tr;
    
    function write (buf) { data += buf }
    function end () {
        try {
            var output = parse();
        } catch (err) {
            this.emit('error', new Error(
                err.toString().replace('Error: ', '') + ' (' + file + ')')
            );
        }
        if(pending == 0) finish(output);
    }
    function finish(output) {
        tr.queue(String(output));
        tr.queue(null);
    }
    function parse() {
        var output = falafel(data, function (node) {
            if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'rfolder') {
                ++pending;
                var args = node.arguments;
                for (var i = 0; i < args.length; i++) {
                    var t = 'return ' + (args[i]).source();
                    args[i] = Function(varNames, t).apply(null, vars);
                }
                args[1] = args[1] || {};
                args[1].require = args[1].require || "require";
                args[1].checkExt = args[1].checkExt != null ? args[1].checkExt : true;

                listRequireables(args[0],args[1].checkExt,function(err,files) {
                    if(err) return tr.emit('error',err);
                    var obj = '{';
                    for(var p in files) if(({}).hasOwnProperty.call(files,p)) {
                        obj += JSON.stringify(p)+': '+args[1].require+'('+JSON.stringify(files[p])+'),';
                    }
                    obj = obj.substr(0,obj.length-1); //remove trailing comma
                    obj += '}';
                    node.update(obj);
                    if(--pending == 0) finish(output);
                });
            }
        });
        return output;
    }
};

function listRequireables(dir,check,cb) {
    fs.readdir(dir,function(err,files) {
        if(err) return cb(err);
        var results = {}, file, base, full, ext;
        for(var i = 0, l = files.length; i < l; ++i) {
            file = files[i];
            ext = path.extname(file);
            if(!check || ext in require.extensions) { // yup, this works with (coffee|live)ify
                base = path.basename(file,ext);
                full = path.resolve(dir,file);
                results[base] = full;
            }
        }
        cb(null,results);
    });
}
