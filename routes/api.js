var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');


 
// http://data.riksdagen.se/personlista/?iid=0643844865712&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista=

router.get('/api', function(req, res) {
    
 var request = require("request")

var url = "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista="

request({
    url: url,
    json: true
}, function (error, response, body, result) {

    if (!error && response.statusCode === 200) {

     
            
                var politicians = {};
      
            for (i = 0; i < body.personlista.person.length; i++) {
                
            
              var politicians = body.personlista.person[i];
           
            
               
                
            
        }
        
        console.log(politicians)
        
     res.render('index', {politicians});
        
  
        
    }
    
})
   
    
  
    
	
	
});






module.exports = router;  


        // console.log(body.personlista.person.fodd_ar)
        //console.log(body.personlista.person.tilltalsnamn)
        //console.log(body.personlista.person.parti)
        //console.log(body.personlista.person.valkrets)
        //console.log(body.personlista.person.bild_url_192)
      