'use strict'

const router = require('express').Router();

router.get('/', (req, res) => {

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.render('./index.ejs');

});

module.exports = router;
