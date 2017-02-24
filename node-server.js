var app = require("./config/express.js")();

app.listen(app.get('port'), function(){
  console.log('Servidor executando na porta ' + app.get('port'));
});
