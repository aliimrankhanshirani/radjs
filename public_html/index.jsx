#!C:/jsdb.exe

/**
 * @bit RAD JS Boot Loader (JSDB)
 * @author Ali
 */

    load('../includes/functions.jsx');
    load('../includes/error_tracker.jsx');
    load('../includes/http_get_post_etc.jsx');
    load('../includes/core/mvc.jsx');
    load('../includes/settings.jsx');
    
    function foo(a,b,c)
    {
        print (a + "," + b+ "," + c);
    }

    try 
    { 
        start_html_header();
        
        _url = _GET._url.split('/');
        
        _url = _url.clean();
        
        __current_controller = DEFAULT_CONTROLLER;
        __current_method = DEFAULT_METHOD;
        //__arguments = [];
        
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

        print ('arguments :');
        print (System.toSource());

        foo.apply(this, _url);

    }
    catch(err) 
    {
        dump_error(err);
    }


