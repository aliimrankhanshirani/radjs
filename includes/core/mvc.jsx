
    


    _System = function()
    {
        this.current_controller = __current_controller;
        
        this.current_method = __current_method;
        this.arguments = __arguments;
        
        this.host      = process.env["REMOTE_HOST"];
        this.http_root = this.host + process.env["SCRIPT_NAME"].replace('index.jsx','');
        this.get       = _GET;
        this.post      = _POST;
        this.cookie    = _COOKIE;
        this.session   = {};
        this.render = function (template, area, _DATA)
        {
            tpl_data = global.radJS_TE[template](_DATA);
            global._OUTPUT += tpl_data;
        }
    }

    Controller = function(args)
    {
        this.SYS = new _System;
    }

    Controller.prototype = 
    {
        constructor : Controller
             
    }
    