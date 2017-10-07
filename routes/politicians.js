var express = require('express');
var router = express.Router();
var request = require('request');


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




   
    
  