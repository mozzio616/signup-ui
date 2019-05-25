const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('.ejs', require('ejs').__express);

app.use("/", require(__dirname + '/routes/index.js'));
app.use("/signup", require(__dirname + '/routes/signup.js'));
app.use("/verify", require(__dirname + '/routes/verify.js'));

module.exports = app;
