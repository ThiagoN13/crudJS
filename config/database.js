var mongoose = require("mongoose");

module.exports = function(uri){
  mongoose.connect(uri);

  mongoose.connection.on("connected", function(){
    console.log("Database conectada em " + uri );
  });

  mongoose.connection.on("disconnected", function(){
    console.log("Database nao conectada em " + uri);
  });

  mongoose.connection.on('error', function(){
    console.log("Erro ao conectar-se a database " + error);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Desconectado, ao terminio da aplicacao');
      process.exit(0);
    });
  });
}
