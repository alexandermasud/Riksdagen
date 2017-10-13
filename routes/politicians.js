var express = require('express');
var router = express.Router();
var request = require('request');
let User = require('../models/user');


var Twitter = require('twitter');

const twitterKeys = require('../config/twitterKeys');

   

var twitterClient = new Twitter({
  consumer_key: twitterKeys.consumerKey,
  consumer_secret: twitterKeys.consumerSecret,
  access_token_key: twitterKeys.token,
  access_token_secret: twitterKeys.tokenSecret
});

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
        
    
        
     var tilltalsnamn = body.personlista.person.tilltalsnamn
     var efternamn = body.personlista.person.efternamn
     
   
            
    var politiker = body.personlista.person;

        
           twitterClient.get('search/tweets', {q: ((tilltalsnamn) + ' ' + (efternamn))}, function(error, tweets, response) {
           var tweets = (tweets.statuses);
            console.log(tweets)
               
               
               
               
            res.render('politician', {politiker, tweets});
               
        });

    }
    
})
    
});


router.get('/tweeta',  function(req, res) {

twitterClient.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
      
      res.render('index');
  }
});

});

module.exports = router;




   
    
  