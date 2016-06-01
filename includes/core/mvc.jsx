        _System = function()
        {
            this.host      = system.getenv('REMOTE_HOST');
            this.root_path = this.host + system.getenv('SCRIPT_NAME').replace('index.jsx','');
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
        