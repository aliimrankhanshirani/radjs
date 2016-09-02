/**
 * home Controller
 *
 */ 

    {
        layout : 'default',
        obj : { 'name' : 'Ali', 'age' : 39 },

 
        /** constructor **/
        __constructor()  
        {

        },
       
       
        /** controller methods **/ 
        main : function (a, b, c)
        {
            this.render(
                'header', 
                'content', 
                this.obj
            );
        }
    }
        
