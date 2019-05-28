const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
 require("./persistency/db.instance").DB.getInstance();
const logsRouter = require('./apis/v1/logs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use("/", logsRouter);
app.use(cors())

app.listen(3050, function() {
  console.log("listening on 3050");
});
