var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res) {
    
	res.render('index');
	
});



router.post('/search', function(req, res) {
	 


    
var url = "http://data.riksdagen.se/personlista/?iid=&fnamn=" + (req.body.fornamn) + "&enamn=" + (req.body.efternamn) + "&f_ar=&kn=&parti=" + (req.body.parti) + "&valkrets=&rdlstatus=&org=&utformat=json&termlista="

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {


            
              var politiker = body.personlista.person;

        
     res.render('index', {politiker});
        
  
        
    }
    
})
});


module.exports = router;