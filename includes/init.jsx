

    System = new _System;
    
    /*

    for (key in System.get)
        print(key + ' = ' + System.get[key] + '<br>');    
    */
    //print('<br>'+System.root_path);    
    
    Array.prototype.clean = function() {
      for (var i = 0; i < this.length; i++) {
        if (this[i].length == 0) {         
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    };        
    
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}    