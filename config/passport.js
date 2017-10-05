const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');

// Load user model
const User = mongoose.model('users');

const googleKeys = require('./googleKeys');
const facebookKeys = require('./facebookKeys');
const twitterKeys = require('./twitterKeys');

module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: googleKeys.clientID,
      clientSecret:googleKeys.clientSecret,
      callbackURL:googleKeys.callbackURL,
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
    

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
    
    
    passport.use(new TwitterStrategy({
    consumerKey: twitterKeys.consumerKey,
    consumerSecret: twitterKeys.consumerSecret,
    callbackURL: twitterKeys.callbackURL,
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {
        
        
        
       const newUser = {
        username: profile.id,
        firstname: profile.displayName,
        lastname: profile.username,
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

