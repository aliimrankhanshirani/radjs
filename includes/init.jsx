    get_GET_data = function()
    {
        _GET = process.env["QUERY_STRING"];
        //system.getenv("QUERY_STRING");
        
        if (_GET)
        {
            var source = _GET.split(/\&/g)
            _GET = {};
            for (var x=0; x< source.length; x++)
            {
                var src = source[x].split('=');
                name = src[0];
                value = src[1];
                
                if (name.trim().length > 0)
                    _GET[decodeURI(name)] = value ? decodeURI(value) : ""
            }
        }
        return _GET;
    };
    
    get_POST_data = function()
    {
        _POST = {};
        post_length = Number(process.env["CONTENT_LENGTH"]);//system.getenv("CONTENT_LENGTH")
        postData = process.stdin.read(post_length);
        if (postData !== null && postData !== undefined)
        {
            var pairs = postData.split('&');
            for (var p=0; p < pairs.length; ++p) 
            {
                var pair = pairs[p].split('=');
                if (pair[0].trim().length > 0)
                    _POST[pair[0]] = pair[1];
            }
        }
        return _POST; 
    };
    
    
    get_COOKIE_data = function()
    {
        _COOKIE = {};
        cData = process.env["HTTP_COOKIE"];//system.getenv("HTTP_COOKIE")
        
        if (cData !== null && cData !== undefined)
        {
            var pairs = cData.split(';');
            for (var p=0; p < pairs.length; ++p) 
            {
                var pair = pairs[p].split('=');
                if (pair[0].trim().length > 0)
                    _COOKIE[pair[0]] = pair[1];
            }
        }
        return _COOKIE; 
    };  
    
    _System = function()
    {
        this.current_controller = '';
        this.current_method = '';
        this.arguments = ''
        
        
        
        this.host      = process.env["REMOTE_HOST"];
        this.http_root = this.host + process.env["SCRIPT_NAME"].replace('index.jsx','');
        this.get       = _GET;
        this.post      = _POST;
        this.cookie    = _COOKIE;
        this.session   = {};
        this.render = function (template, area, _DATA)
        {
            tpl_data = global.radJS_TE[template](_DATA);
            print (_CONTROLLER_OBJECT.layout);
            _OUTPUT += tpl_data;
        }
    }    

    module.exports = function() 
    {
        this.current_controller = DEFAULT_CONTROLLER;
        this.current_method = DEFAULT_METHOD;
        this.arguments = [];

        this. HTML_HEADER_DISPATCHED = false;
        this._OUTPUT = '';
        this._TPLDIR = __dirname + '/../application/views';
        this._CONTROLLER_OBJECT = {};
        
        this.file_get_contents = function (file)
        {
            return fs.readFileSync(file, 'utf8').toString();
        }  
        this.print = function (t)
        {
            console.log(t);
        }  
        
        this.start_html_header = function()
        {
            if (!HTML_HEADER_DISPATCHED)
                print ("Content-Type: text/html\n\n");
                
            HTML_HEADER_DISPATCHED = true;
        };        
        
        dump_error = function (err) 
        { //http://stackoverflow.com/questions/5802840/javascript-node-js-getting-line-number-in-try-catch
            start_html_header();
            
            print ('<center>');
            print('<pre style="margin-top:100px;background-color:#FFFFFF; border-radius: 50px; box-shadow: 10px 10px 5px #AAA;text-align:left;width:70%;border:1px solid #2E74D5;padding:50px;color:black;">');
            print ('<img align="left" style="margin-right:40px;" src=" data:image/png;base64,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"/>');
            print('<h1 style="margin:0px 0px 0px 0px;color:#000;font-weight:bold;font-family:Arial, Tahoma, Sans">RADJS 1.0 Error</h1>'); 

            if (typeof err === 'object') 
            {
                if (err.message) 
                    print('<h2 style="margin-top:10px;color:#2E74D5">' + err.message + '</h2>');
                    
                if (err.stack) 
                {
                    print('<b>Stacktrace:</b>');
                    print('<hr noshade="noshade" size="1" color="#ccc"/>');
                    print(err.stack);
                }
            } 
            else 
                print('Error not tracable!');
            
            print('</pre></center>');
            process.exit();
        };

        this.cleanArray = function (actual) 
        {
          var newArray = new Array();
          for (var i = 0; i < actual.length; i++) 
          {
            if (actual[i]) 
            {
              newArray.push(actual[i]);
            }
          }
          return newArray;
        }    
        
        
        
            
        this.remove_comments = function (str) {
            str = ('__' + str + '__').split('');
            var mode = {
                singleQuote: false,
                doubleQuote: false,
                regex: false,
                blockComment: false,
                lineComment: false,
                condComp: false 
            };
            for (var i = 0, l = str.length; i < l; i++) {
         
                if (mode.regex) {
                    if (str[i] === '/' && str[i-1] !== '\\') {
                        mode.regex = false;
                    }
                    continue;
                }
         
                if (mode.singleQuote) {
                    if (str[i] === "'" && str[i-1] !== '\\') {
                        mode.singleQuote = false;
                    }
                    continue;
                }
         
                if (mode.doubleQuote) {
                    if (str[i] === '"' && str[i-1] !== '\\') {
                        mode.doubleQuote = false;
                    }
                    continue;
                }
         
                if (mode.blockComment) {
                    if (str[i] === '*' && str[i+1] === '/') {
                        str[i+1] = '';
                        mode.blockComment = false;
                    }
                    str[i] = '';
                    continue;
                }
         
                if (mode.lineComment) {
                    if (str[i+1] === 'n' || str[i+1] === 'r') {
                        mode.lineComment = false;
                    }
                    str[i] = '';
                    continue;
                }
         
                if (mode.condComp) {
                    if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                        mode.condComp = false;
                    }
                    continue;
                }
         
                mode.doubleQuote = str[i] === '"';
                mode.singleQuote = str[i] === "'";
         
                if (str[i] === '/') {
         
                    if (str[i+1] === '*' && str[i+2] === '@') {
                        mode.condComp = true;
                        continue;
                    }
                    if (str[i+1] === '*') {
                        str[i] = '';
                        mode.blockComment = true;
                        continue;
                    }
                    if (str[i+1] === '/') {
                        str[i] = '';
                        mode.lineComment = true;
                        continue;
                    }
                    mode.regex = true;
         
                }
         
            }
            return str.join('').slice(2, -2);
        }        
        
        /****************************************/
        /*          INITIALIZATIONS             */
        /****************************************/
              
        
        this._GET = get_GET_data();
        this._POST = get_POST_data();
        this._COOKIE = get_COOKIE_data();
        this.System = new _System;
        
        this.System.current_controller = DEFAULT_CONTROLLER;
        this.System.current_method = DEFAULT_METHOD;
        this.System.arguments = [];

    }
    
    Array.prototype.clean = function() {
      for (var i = 0; i < this.length; i++) {
        if (this[i].length == 0) {         
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    };        


    process.on("uncaughtException", function(err){
        dump_error( err);
    });
