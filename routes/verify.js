'use strict'

const router = require('express').Router();
const rp = require('request-promise');

// Sign Up API Config
const host = 'https://signup-api.mozzio616.now.sh/token/';


router.get("/", (req, res) => {

    res.status(301);
    res.redirect('/');

});


router.post('/', (req, res) => {

    const email = req.body.email;
    const token = req.body.token;

    // Request to Sign Up API
    const options = {
      method: 'GET',
      url: host + email,
      qs: { token: token }
    };

    rp(options)

      // Verified
      .then(function(body) {

        res.status(200);
        res.set('Content-Type', 'text/html');
        res.render('./success.ejs', { email: email });

      })

      // Not Verified
      .catch(function(err) {

        console.log(err.statusCode);
        if (err.statusCode == 400) {

          res.status(400);
          res.set('Content-Type', 'text/html');
          res.render('./verify.ejs', { email: email, alert: 'Invalid Token' });

        // Redirect to Home when Retry Limit Over
        } else {

          res.status(301);
          res.redirect('/');
        }

      })

});

module.exports = router;
