 // app/routes.js

// grab the models

// grab helper files
var Recaptcha = require('recaptcha').Recaptcha;
var https     = require('https');
var dns       = require('dns');
// config files
var constants = require('../config/constants');

    module.exports = function(app) {

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };