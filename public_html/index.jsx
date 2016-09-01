#!node

    /**
     * @bit RAD JS Boot Loader (NodeJS)
     * @author Ali
     * https://github.com/radsystem/radjs
     */
     
    var fs = require("fs");     
    include = function (f) 
    {
       eval.apply(global, [fs.readFileSync(f).toString()]);
    }     

    var __DIRNAME = __dirname;

    include(  '../includes/functions.jsx');
    include(  '../includes/error_tracker.jsx');
    include(  '../includes/http_get_post_etc.jsx');
    include(  '../includes/core/mvc.jsx');
    include(  '../includes/settings.jsx');
    include(  '../includes/_compiled_templates.jsx');
    
    __current_controller = DEFAULT_CONTROLLER;
    __current_method = DEFAULT_METHOD;
    __arguments = [];
    

    var mysql  = require(__dirname + '/../includes/node_modules/mysql');
    var mailer = require(__dirname + '/../includes/node_modules/nodemailer');
    
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
        
        /*for (item in ____o)
        {
            if (typeof ____o[item] === 'function')
            {
                __elements.push(item + ':' + ____o[item]);
                delete ____o[item];
            }
        }*/
        __code = __code + "\n\n" + 
                 _controller_name + ".prototype = {\n" + 
                __elements .join(",\n") +
                "\n}\n\n";

        for (item in ____o)
        {
            if (typeof ____o[item] === 'function')
                __code += 
                        _controller_name +'.' +item + ' = ' +  
                        _controller_name +'.prototype.' +item + '= ' +  ____o[item]  + ";\n";          
            else
                __code += 
                        _controller_name +'.' +item + ' = ' +  
                        _controller_name +'.prototype.' +item + ' = ' + JSON.stringify(____o[item] )+ ';\n' ;
        }        
        
        __code += 
                _controller_name +'.render = ' +  
                _controller_name +'.prototype.render = function(template, area, _DATA) { System.render(template, area, _DATA); }\n';
        
        return __code;
    }
    
    
    try 
    { 
        start_html_header();

        if (_GET["_url"] == undefined)
        {
            throw ({
                err   : `Invalid _url configuration`,
                stack : `Invalid _url configuration`
            });            
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
        var init_F = __DIRNAME + '/../includes/init.jsx';
        include(init_F);
        
        var __c_filepath = '../application/controllers/'+__current_controller+'.jsx';
        if (!fs.existsSync(__c_filepath))
        {
            throw ({
                err   : `Controller <b>'${__current_controller}'</b> not found`,
                stack : `Controller <b>'${__current_controller}'</b> not found`
            });
        }
        
        var __c_file = fs.readFileSync(__c_filepath).toString();

        var __evaluator_code = adjust_constructor(__current_controller, __c_file) ;
        
        //print (__evaluator_code);
        eval(__evaluator_code);
        
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
        _CONTROLLER_OBJECT = __c;
        print (_OUTPUT);
    }
    catch(err) 
    {
        dump_error(err);
    }





