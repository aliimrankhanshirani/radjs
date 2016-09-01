#!node


console.log('content-type:text/html\n\n');

require(__dirname +"/../includes/error_tracker.jsx");

var fs = require('fs');
var TPLDIR = '../application/views';

    to_function_name = function (path)
    {
        if (path.charAt(0) == '/')
            path = path.substring(1,path.length);
        return path.replace('.html','').replace(/\//g, '_');
    }

get_files_rec = function(path, ret)
{
    if (typeof ret == 'undefined')
        ret = [];
        
    var files = fs.readdirSync(path);
    for (var i in files) 
    {
        var file = path + '/' + files[i];
        if (fs.lstatSync(file).isDirectory())
            get_files_rec(file, ret);
        else
            ret.push(file.replace(TPLDIR,''));
    }

    return ret;
};
/*********************************/


var files = [];

var _compiled_data = [];

var files = get_files_rec(TPLDIR, files);
for (i in files)
{
    var file = TPLDIR + files[i];
    
    var func_name = to_function_name(files[i]);
    console.log('compiling template - '+ file);
    var data = fs.readFileSync(file).toString();
    
    _compiled_data.push(
        func_name + ': function(_DATA) {\n'+
        '_GET=global._GET, _POST=global._POST, _COOKIE=global._COOKIE;//, _SYS=global.System;\n\n'+
        'return `'+data+'`;\n'+
        '}'
    );
}


_compiled_data = 'global.radJS_TE = {\n' + 
                _compiled_data.join(',\n\n') +
                '};\n\n';

fs.writeFileSync('../includes/_compiled_templates.jsx', _compiled_data);
console.log(_compiled_data);

