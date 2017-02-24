var express = require('express');
var load = require("express-load");
var bodyParser = require("body-parser");

require('./database.js')('mongodb://localhost/fruteira');

module.exports = function(){
  var app = express();
  // setando a porta do servidor
  app.set("port", 3000);

  app.use(express.static("./public"));

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  load('models', {cwd: 'app'})
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};
