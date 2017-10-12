var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');




router.get('/', function(req, res) {
    


     res.render('index');
        

});



        //console.log(body.personlista.person.fodd_ar)
        //console.log(body.personlista.person.tilltalsnamn)
        //console.log(body.personlista.person.parti)
        //console.log(body.personlista.person.valkrets)
        //console.log(body.personlista.person.bild_url_192)
      



module.exports = router;