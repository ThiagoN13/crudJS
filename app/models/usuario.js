var mongoose = require("mongoose");

module.exports = function(){
  var usuarioDb = mongoose.Schema({
    login:{
      type: String,
      required: true,
      index:{
        unique: true
      }
    },
    email:{
      type: String,
      required: true
    },
    senha:{
      type: String,
      required: true
    },
    nivel:{
      type: Number
    },
    ativo:{
      type: Boolean
    }
  }, {collection:"usuario"});

  return mongoose.model('usuario', usuarioDb);
}
