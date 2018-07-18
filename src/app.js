const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

//Rotas
const index = require('./routes/index');
const gsmRoute = require('./routes/gsmRoute');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', index);
app.use('/sms', gsmRoute);
module.exports = app;