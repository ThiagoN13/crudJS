var mongoose = require("mongoose");

module.exports = function(){
  var usuarioDb = mongoose.Schema({
    usuario:{
      type: String,
      required: true,
      index:{
        unique: true
      }
    },
    email:{
      type: String,
      required: true
      index:{
        unique: true
      }
    },
    senha:{
      type: String,
      required: true
    }
    nivel:{
      type: String,
      required: true
    }
  }, {collection:"usuario"});

  return mongoose.model('usuario', usuarioDb);
}
