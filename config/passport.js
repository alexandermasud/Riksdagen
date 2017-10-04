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
      callbackURL:googleKeys.callbackURL,
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

    passport.use(new FacebookStrategy({
    clientID: facebookKeys.clientID,
    clientSecret: facebookKeys.clientSecret,
    callbackURL: facebookKeys.callbackURL,
    profileFields: ['id', 'emails', 'first_name', 'last_name', 'picture']
    
  
  },                        
  function(accessToken, refreshToken, profile, done) {
        
        // console.log(accessToken);
      // console.log(profile);

    
      
      const newUser = {
        username: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
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
           
      
  }
)); 
        
    

    
    passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
    
    
    
}

