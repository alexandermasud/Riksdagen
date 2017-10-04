const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
    req.flash('success_msg', 'Inloggad!');
    res.redirect('/');
  });


router.get('/facebook', passport.authenticate('facebook', {scope:['email']}));


router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/fail' }));



router.get('/verify', (req, res) => {
  if(req.user){
    console.log(req.user);
    req.flash('success_msg', 'Verifierad!');
    res.redirect('/');
  } else {
    console.log('Not Auth');
    req.flash('fail_msg', 'Inte verifierad');
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
 req.logout();
 req.flash('success_msg', 'Utloggad!');
 res.redirect('/');
});

module.exports = router;