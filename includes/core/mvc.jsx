

    _System = function()
    {
        this.current_controller = __current_controller;
        
        this.current_method = __current_method;
        this.arguments = __arguments;
        
        this.host      = system.getenv('REMOTE_HOST');
        this.http_root = this.host + system.getenv('SCRIPT_NAME').replace('index.jsx','');
        this.get       = _GET;
        this.post      = _POST;
        this.cookie    = _COOKIE;
        this.session   = {};
    }

    Controller = function(args)
    {
        this.SYS = new _System;
    }

    Controller.prototype = 
    {
        constructor : Controller
    }
    