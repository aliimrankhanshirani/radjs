
    get_GET_data = function()
    {
        _GET = system.getenv("QUERY_STRING");
        
        if (_GET)
        {
            let source = _GET.split(/\&/g)
            _GET = {};
            for (let x=0; x< source.length; x++)
            {
                let [name,value] = source[x].split('=');
                
                if (name.trim().length > 0)
                    _GET[decodeURL(name)] = value ? decodeURL(value) : ""
            }
        }
        return _GET;
    }
    
    get_POST_data = function()
    {
        _POST = {};
        post_length = Number(system.getenv("CONTENT_LENGTH"));
        postData = system.stdin.read(post_length);
        
        var pairs = postData.split('&');
        for (var p=0; p < pairs.length; ++p) 
        {
            var pair = pairs[p].split('=');
            if (pair[0].trim().length > 0)
                _POST[pair[0]] = pair[1];
        }
        return _POST; 
    }
    
    
    get_COOKIE_data = function()
    {
        _COOKIE = {};
        cData = system.getenv("HTTP_COOKIE")
        
        var pairs = cData.split(';');
        for (var p=0; p < pairs.length; ++p) 
        {
            var pair = pairs[p].split('=');
            if (pair[0].trim().length > 0)
                _COOKIE[pair[0]] = pair[1];
        }
        return _COOKIE; 
    }
    
    _GET = get_GET_data();
    _POST = get_POST_data();
    _COOKIE = get_COOKIE_data();
    
    
