const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const googleKeys = require('./googleKeys');
// Load user model
const User = mongoose.model('users');

var facebookKeys = require('./facebookKeys');

module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: googleKeys.googleClientID,
      clientSecret:googleKeys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      
      const newUser = {
        username: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      // Check for existing user
      User.findOne({
        username: profile.id
      }).then(user => {
        if(user){
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })

      
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
    
    
    
    
    
    passport.use(new FacebookStrategy({
    clientID: facebookKeys.clientID,
    clientSecret: facebookKeys.clientSecret,
    callbackURL: facebookKeys.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
        process.NexTick, (function(){
            User.findOne({'facebook.id':profile.id}, function (err,user){
              
                if (err){
                    
                    return done(err);
                }
                if (user){
                    
                    return done(null, user);
                }
                
                else{
                    
                    var newUser = new User ();
                    NewUser.facebook.id = profile.id;
                    NewUser.facebook.token = profile.accessToken;
                    NewUser.facebook.firstname = profile.name.givenName;
                    NewUser.facebook.lastname = profile.name.familyName;
                    NewUser.facebook.email = profile.emails[0].value;
                    
                    newUser.save(function(){
                        
                        if (err)
                            throw err;
                            return done( null, newUser);

                    })
                    
                    
                }
            });
            
        
    });
  }
)); 
    
    
    
    
    
}

