var mongoose = require("mongoose");

module.exports = function(){
  var fruteiraDb = mongoose.Schema({
    nome:{
      type: String,
      required: true,
      index:{
        unique: true
      }
    },
    quantidade:{
      type: Number,
      required: true
    },
    preco:{
      type: Number,
      required: true
    },
    ativo:{
      type: Boolean,
      default: true
    }
  }, {collection:"fruteira"});

  return mongoose.model('fruteira', fruteiraDb);
}
