

    home = function()
    {
        this.variable1 = 10;
        this.variable2 = 11;
    }
    
    home.prototype = {
        constructor : home,
        main : function()
        {
            console.log(use_sum(this.variable1, this.variable2));
        }
    }

