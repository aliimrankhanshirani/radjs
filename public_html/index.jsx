#!C:/jsdb.exe


/**
 * @bit RAD JS Boot Loader (JSDB)
 * @author Ali
 * https://github.com/aliimrankhanshirani/radjs
 */

    load('../includes/json.jsx');
    load('../includes/functions.jsx');
    load('../includes/error_tracker.jsx');
    load('../includes/http_get_post_etc.jsx');
    load('../includes/core/mvc.jsx');
    load('../includes/settings.jsx');
    
    __current_controller = DEFAULT_CONTROLLER;
    __current_method = DEFAULT_METHOD;
    __arguments = [];
    
    try 
    { 
        start_html_header();
        
        _url = _GET._url.split('/');
        
        _url = _url.clean();
        

        
        /* identify controller */
        if (_url.length > 0) 
        {
            __current_controller = _url[0];
            _url.splice(0,1);
        }    
        
        /* identify method */
        if (_url.length > 0) 
        {
            __current_method = _url[0];
            _url.splice(0,1);
        }    
        
        _url.clean();
        
        __arguments = _url;
        
        load('../includes/init.jsx');
        
        var __c_filepath = '../application/controllers/'+__current_controller+'.jsx';
        var __c_file = new Stream('../application/controllers/'+__current_controller+'.jsx');
        __c_file = __c_file.readFile();
        
        __c_file = remove_comments(__c_file);


        __constructor = __current_controller + " = function(){ print('"+__current_controller+"::constructor called ;)' ); }";
        
        __c_file = __constructor +  "\n\n" + __current_controller + ".prototype = " + __c_file;
        
        eval(__c_file);
            
        var __c = new home();
        
        __c.main.apply(home,_url);
        
    }
    catch(err) 
    {
        dump_error(err);
    }


