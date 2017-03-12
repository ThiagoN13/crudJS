var mongoose = require("mongoose");

module.exports = function(){
  var comentarioDb = mongoose.Schema({
    usuario:{
      type: String,
      required: true,
    },
    assunto:{
      type: String,
      required: true,
    },
    sugestao:{
      type: String,
      required: true
    },
    data:{
      type: Date,
      required: true,
    },
    respostas:[{
      resposta: {type: String}
    }]
  }, {collection:"comentario"});

  return mongoose.model('comentario', comentarioDb);
}
