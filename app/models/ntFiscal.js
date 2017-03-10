var mongoose = require("mongoose");

module.exports = function(){
  var fruteiraDb = mongoose.Schema({
    data: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true
    },
    comprador:{
      type: String,
      ref: 'usuario'
    },
    carrinho: [{
      nome : { type: String},
      quantidade : { type: Number},
      preco : { type : Number},
    }]
  }, {collection:"ntFiscal"});

  return mongoose.model('ntFiscal', fruteiraDb);
}
