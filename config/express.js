var express = require('express');
var load = require("express-load");
var bodyParser = require("body-parser");
var session = require('express-session');
var cookie = require('cookie-parser');


require('./database.js')('mongodb://bd99540d3b5e/fruteira');

module.exports = function(){
  var app = express();

  // Iniciando sessao em construcao
  app.use(cookie());
  app.use(session({
      name: 'fruit',
      secret: 'fruit_pass',
      resave: false,
      saveUninitialized: false
  }));

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
