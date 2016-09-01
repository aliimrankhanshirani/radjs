global.radJS_TE = {
header: function(_DATA) {
_GET=global._GET, _POST=global._POST, _COOKIE=global._COOKIE;//, _SYS=global.System;

return `<h1>Header goes here</h1>
<span>
    My name is ${_DATA['name']} and 
    My age is ${_DATA['age']}
</span>`;
},

layouts_default: function(_DATA) {
_GET=global._GET, _POST=global._POST, _COOKIE=global._COOKIE;//, _SYS=global.System;

return `<html>
    <head>
        <title>RADJS 1.0 for [NodeJS MVC + ORM]</title>
        <meta charset="utf8" />
    </head>
    <body>
        <render:header/>
        
            <aread:content/>
        
        <render:footer/>
    </body>
</html>`;
}};

