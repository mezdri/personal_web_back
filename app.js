const  express = require("express");
const bodyParser = require("body-parser");


const app = express();

const { API_VERSION } = require("./config")

// LOAD
// ....

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure header http

// router basic


module.exports = app;

