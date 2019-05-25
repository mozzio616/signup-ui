'use strict'

const router = require('express').Router();
const rp = require('request-promise');

// Sign Up API Config
const host = 'https://signup-api.mozzio616.now.sh/token/';

// Supported Media
const supported_media = [ 'email', 'slack' ];


router.get('/:media', (req, res) => {

    const media = req.params.media;

    // Check Media
    if (supported_media.indexOf(media) == -1) {

      res.status(301);
      res.redirect('/');

    // Go to Sign Up
    } else {

      res.status(200);
      res.set('Content-Type', 'text/html');
      res.render('./' + media + '.ejs');

    }

});


router.post('/:media', (req, res) => {

    const media = req.params.media;
    const email = req.body.email;
    const channel = req.body.channel;

    // Set Parameters
    let data = {};
    if (media === 'slack') {
      data.channel = channel;
    }

    // Send Request to One-Time Token API
    const options = {
      method: 'POST',
      url: host + email,
      json: data
    };

    rp(options)

      // Go to Verify
      .then(function(body) {

        res.status(200);
        res.set('Content-Type', 'text/html');
        res.render('./verify.ejs', { email: email, alert: '' });

      })
      // Reload Sign Up
      .catch(function(err) {

        console.log(err.statusCode);
        res.status(200);
        res.set('Content-Type', 'text/html');
        res.render('./' + media + '.ejs');

      })

});

module.exports = router;
