var express = require('express');
var load = require("express-load");

module.exports = function(){
  var app = express();
  // setando a porta do servidor
  app.set("port", 4000);

  app.use(express.static("./"));

  load('models', {cwd: 'app'})
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};
