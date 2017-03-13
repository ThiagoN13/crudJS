var mongoose = require("mongoose");

module.exports = function(){
  var comentarioDb = mongoose.Schema({
    usuario:{
      type: String,
      required: true,
      ref: 'usuario'
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
    ativo:{
      type: String,
      default: true
    },
    respostas:{
      type: String
    }
    }, {collection:"comentario"});

  return mongoose.model('comentario', comentarioDb);
}
