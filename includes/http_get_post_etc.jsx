
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
    
    _GET = get_GET_data();
    _POST = get_POST_data();
    _COOKIE = get_COOKIE_data();
    
    
