
    require('node-import');

    require( './tools.js')();
    require(__dirname + '/inc2.js')();
    require(__dirname + '/home.js');


    var h = new home;
    h.main();
    
    CONTROLLER_OBJ = h;

    //console.log(show_var1()+1);
    
    show_var1();