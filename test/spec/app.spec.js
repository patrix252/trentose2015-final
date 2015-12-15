/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function() {

  it("dovrebbe ritornare la richiesta corrente", function() {  
    
    var requests =   [{
        question : "Carlo wants a TOY. Shall I pack a banana?",
        options : ["yes", "no"],
        answer : "no"
    }];
    var current = 0;   
    var point = 0;
    
    SantaModel.load(requests, current, point);
    
    var currentRequest = SantaModel.getCurrentRequest();
    expect(currentRequest).toBe(requests[0]);
    
  });    
 
});
