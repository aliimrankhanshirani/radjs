    file_get_contents = function (file)
    {
        return fs.readFileSync(file).toString();
    }  

    System = new _System;
    global._OUTPUT = '';
    global._TPLDIR = __dirname + '/../application/views';
   