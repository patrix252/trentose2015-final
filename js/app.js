/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */
    
var SantaModel = {
  
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
      this._request = list;
      this._current = 0;
      this._point = 0;
       
   },
   load : function(request, current, point){
      this._request = request;
      this._current = current;
      this._point = point;
   }
  
   /* It moves "current" to the next request */
   next : function (){
       this._current++;
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function () {
       if(this._current > this._request.length) return null;
       return this._request[this._current];
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       var currentRequest = this._request[this._current];
       if(item == currentRequest['answer']) return 1;
       else return 0;
   },
   addPoint : function() {
     this._point++;
   }
    
  
};

var SantaView = {
  init : function(request){
      
    
    this.display();
      

    $(".question-items > li").click(function(){
      var results = SantaController.response($(this).text());
    });
    
  },  
  display : function(){
    var request = SantaController.getCurrentRequest();
      
    this.displayQuestion(request['question']);
    this.displayOptions(request['options']);
  },
    
  displayQuestion : function(question){
    $(".question").text(question);
  },
    
  displayOptions : function(options){
    $(".question-items").empty();
    for (var i=0; i< options.length; i++){
      $(".question-items").append("<li>"+ options[i] + "</li>");  
    }     
  }
}

var SantaController = {
  init : function(list){
    SantaModel.init(list);
    SantaView.init();
  },
    
  next : function(){
      SantaModel.next();
      SantaView.display();
  },

  getCurrentRequest : function(){
    return SantaModel.getCurrentRequest();
  },
  
  response : function(answer) {
      if(SantaModel.pack(answer)) {
          SantaModel.addPoint();
          SantaController.next();
      }
  }
    
  
};



$(document).ready(function(){
  SantaController.init(requests);
    
});