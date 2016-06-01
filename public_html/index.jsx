#!C:/jsdb.exe

/**
 * @bit RAD JS Boot Loader (JSDB)
 * @author Ali
 */

    load('../includes/error_tracker.jsx');
    load('../includes/http_get_post_etc.jsx');
    load('../includes/core/mvc.jsx');
    load('../includes/settings.jsx');
    load('../includes/init.jsx');
    
    function foo(a,b,c)
    {
        print (a + "," + b+ "," + c);
    }

    try 
    { 
        start_html_header();
        
        _url = _GET._url.split('/');
        
        _url = _url.clean();
        
        current_controller = DEFAULT_CONTROLLER;
        current_method = DEFAULT_METHOD;
        
        /* identify controller */
        if (_url.length > 0) 
        {
            current_controller = _url[0];
            _url.splice(0,1);
        }    
        
        /* identify method */
        if (_url.length > 0) 
        {
            current_method = _url[0];
            _url.splice(0,1);
        }    
        
        _url.clean();

        foo.apply(this, _url);

    }
    catch(err) 
    {
        dump_error(err);
    }


