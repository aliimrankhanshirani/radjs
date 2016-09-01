    file_get_contents = function (file)
    {
        return fs.readFileSync(file).toString();
    }  

    System = new _System;
    _OUTPUT = '';
    _TPLDIR = __dirname + '/../application/views';
    _CONTROLLER_OBJECT = {};
   