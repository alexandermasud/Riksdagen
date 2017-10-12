var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/politicians', function(req, res) {
    


var url = "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista="

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {


            
              var politiker = body.personlista.person;

        
     res.render('politicians', {politiker});
        
  
        
    }
    
})
   
    
  
    
	
	
});



        //console.log(body.personlista.person.fodd_ar)
        //console.log(body.personlista.person.tilltalsnamn)
        //console.log(body.personlista.person.parti)
        //console.log(body.personlista.person.valkrets)
        //console.log(body.personlista.person.bild_url_192)
      


router.post('/search', function(req, res) {
	 


    
var url = "http://data.riksdagen.se/personlista/?iid=&fnamn=" + (req.body.fornamn) + "&enamn=" + (req.body.efternamn) + "&f_ar=&kn=&parti=" + (req.body.parti) + "&valkrets=&rdlstatus=&org=&utformat=json&termlista="

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {


            
              var politiker = body.personlista.person;

        
     res.render('politicians', {politiker});
        
  
        
    }
    
})
});


router.get('/politicians/:id',  function(req, res) {
	
   
  var url = "http://data.riksdagen.se/personlista/?iid=" + (req.params.id) + "&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista=" 

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {


            
    var politiker = body.personlista.person;

        
    res.render('politicians', {politiker});
       
    }
    
})
    
});


module.exports = router;




   
    
  