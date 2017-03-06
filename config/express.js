var express = require('express');
var load = require("express-load");
var bodyParser = require("body-parser");

require('./database.js')('mongodb://localhost/fruteira');

module.exports = function(){
  var app = express();

  // Iniciando sessao em construcao

  // var sessao = {
  // secret: '1234',
  // cookie: {}
  // }
  //
  // if (app.get('enviar') === 'producao') {
  //   app.set('proxy', 1);
  //   sessao.cookie.secure = true;
  // }
  //
  // app.use(session(sessao))

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
