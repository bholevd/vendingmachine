const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const i18n = require("i18n");
const app = express();

global.__basedir = __dirname;

app.use(cors());
app.options('*', cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Localization configuration
i18n.configure({
  locales:['en', 'sd', 'fi'],
  directory: __dirname + '/locales'
});
// app.use(cookieParser());
app.use(i18n.init);

app.use('/api/v1', require('./app/routes')(express));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vending Machine application." });
});

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
