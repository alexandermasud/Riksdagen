module.exports = {
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Inte tillåtet');
        res.redirect('/login');
    }
    
}

// var {ensureAuthenticated} = require('../helpers/blockNoneAuth');

// Blockerar användare från att ansluta till sidor om de ej är inloggade