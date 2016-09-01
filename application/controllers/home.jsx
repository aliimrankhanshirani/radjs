/**
 * home Controller
 *
 */ 


    {
        layout : 'default',
        /** data items **/
        w : 'string',                               //string
        b : false,                                  //boolean
        i : 10,                                     //int
        f : 11.,                                    //float
        a : [1,2,3],                                //array
        o : { 'name' : 'Ali', 'age' : 50 },         //object
        
    
    
        /** constructor **/
        __constructor()  
        {
            //print ("constructor called "+this.layout+"\n\n");
        },
       
       
        /** controller methods **/ 
        main : function (a, b, c)
        {
            //print ('<hr/>home::main callled with args : '+ a + "," + b+ "," + c);
            //print ('current layout : ' + this.layout);
            
            this.render(
                'header', 
                'content', 
                {
                    name : "Ali",
                     age : 39
                }
            );
            
            
        },
        
        main2 : function()
        {
            //print ("home::main2");
            return 0;
        }
    }
        