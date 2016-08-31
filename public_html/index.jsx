#!node

    /**
     * @bit RAD JS Boot Loader (NodeJS)
     * @author Ali
     * https://github.com/radsystem/radjs
     */

    require(__dirname + '/../includes/functions.jsx');
    require(__dirname + '/../includes/error_tracker.jsx');
    require(__dirname + '/../includes/http_get_post_etc.jsx');
    require(__dirname + '/../includes/core/mvc.jsx');
    require(__dirname + '/../includes/settings.jsx');
    
    __current_controller = DEFAULT_CONTROLLER;
    __current_method = DEFAULT_METHOD;
    __arguments = [];
    
    var fs = require("fs");
    
    adjust_constructor = function(_controller_name, objcode)
    {
        eval('var ____o = '+objcode);
       
        __code = '';
       
        if ( typeof ____o["__constructor"] === 'function')
        {
            var _con = ____o["__constructor"].toString();        
            
            __code = _controller_name +' = function ' + _con.replace('__constructor', '');
            delete ____o["__constructor"];
        }
        else 
            __code = _controller_name +' = function (){ /** DUMMY CONSTRUCTOR */ };';
            
        
        __elements = [];
        
        for (item in ____o)
        {
            if (typeof ____o[item] === 'function')
            {
                __elements.push(____o[item]);
                delete ____o[item];
            }
        }
        __code = __code + "\n\n" + 
                 _controller_name + ".prototype = {\n" + 
                __elements .join(",\n") +
                "\n}\n\n";

        for (item in ____o)
        {
            __code += _controller_name +'.prototype.' +item + '= ' + JSON.stringify(____o[item] )+ ';\n';
        }        
        
        return __code;
    }
    
    
    try 
    { 
        start_html_header();

        if (_GET["_url"] == undefined)
        {
            process.exit();
        }
        _url = _GET._url.split('/');
        
        _url = _url.clean();
        
        if (_url.length > 0) 
        {
            __current_controller = _url[0];
            _url.splice(0,1);
        }    

        if (_url.length > 0) 
        {
            __current_method = _url[0];
            _url.splice(0,1);
        }    
        
        _url.clean();
        
        __arguments = _url;
        
        require(__dirname + '/../includes/init.jsx');
        
        var __c_filepath = '../application/controllers/'+__current_controller+'.jsx';
        if (!fs.existsSync(__c_filepath))
        {
            throw ({
                err   : `Controller <b>'${__current_controller}'</b> not found`,
                stack : `Controller <b>'${__current_controller}'</b> not found`
            });
        }
        
        var __c_file = fs.readFileSync(__c_filepath).toString();

        var __evaluateor_code = adjust_constructor(__current_controller, __c_file) ;
        eval(__evaluateor_code);
        
        __c = 'var __c = new '+__current_controller+'();';
        eval(__c);
        
        if (typeof eval("__c."+__current_method) !== 'function')
        {
            throw ({
                err   : `Method <b>'${__current_method}'</b> not found in controller <b>'${__current_controller}'</b>`,
                stack : `Method <b>'${__current_method}'</b> not found in controller <b>'${__current_controller}'</b>`
            });
        }
        
        __ce = `__c.${__current_method}.apply(${__current_controller},_url)`;
        
        eval(__ce);
        
    }
    catch(err) 
    {
        dump_error(err);
    }





