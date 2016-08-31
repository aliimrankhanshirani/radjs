/**
 * home Controller
 *
 */ 


    {
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
            print ("constructor called\n\n");
            this.x = 256;
        },
       
       
        /** controller methods **/ 
        main(a, b, c)
        {
            print ('<hr/>home::main callled with args : '+ a + "," + b+ "," + c);
            print (System.current_controller);
        },
        
        main2()
        {
            return 0;
        }
    }
        