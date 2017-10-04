var express = require('express');
var router = express.Router();



router.post('/account', function(req, res) {

    res.render('account');
});
module.exports = router;