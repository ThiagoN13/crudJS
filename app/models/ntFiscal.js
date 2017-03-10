var mongoose = require("mongoose");

module.exports = function(){
  var fruteiraDb = mongoose.Schema({
    data: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true
    },
    carrinho: {
      frutas:[{
        nome: String,
        quantidade: Number,
        preco : Number
      }]
    },
    comprador:{
      type: Number,
      ref: 'usuario'
    }
  }, {collection:"ntFiscal"});

  return mongoose.model('ntFiscal', fruteiraDb);
}
