module.exports = function(app){
  var Fruteira = app.models.fruta;

  var controller = {};


  controller.inserirFruta = function(req, res){
    var fruta = req.body;
    console.log(fruta);
    var frut = new Fruteira({"nome":fruta.nome, "quantidade":fruta.quantidade, "preco":fruta.preco, "atualizacao":new Date()})
    frut.save().then( function(result){
      console.log(result);
    })
  };

  controller.obterFruta = function(req, res){
    var _id = req.params._id;
    Fruteira.findOne({"_id" : _id}).exec( function(erro, frutas) {
      if (frutas) {
        res.json(frutas)
      }
    });
  };

  controller.listarFruta = function(req, res){
    Fruteira.find({}).where('ativo', true).exec( function(erro, doc) {
        res.json(doc);
      });
  };

  //Remoção lógica
  controller.removerFruta = function(req, res){
    var ids = req.body._id;
    if(ids){
      console.log(ids)
      ids.forEach(function(valorId) {
        console.log(valorId);
        Fruteira.update({"_id" : valorId}, {$set: {ativo: false}}).exec( function(erro, doc) {
          console.log("removido");
          console.log(doc);
        });
      });
    }
  };

  controller.atualizaEstoque = function(req, res){
    var id = req.body._id;
    var quantidade = req.body.quantidade;
    Fruteira.update({"_id" : id}, {$set: {quantidade: quantidade}}).exec( function(erro, doc) {
      console.log("Quantidade alterada");
      console.log(doc);
    });
  };

  controller.editarFruta = function(req, res){
    var _id = req.body._id;
    var frutaReq = req.body
    Fruteira.update({"_id" : _id}, {$set: {nome:frutaReq.nome, quantidade: frutaReq.quantidade, preco:frutaReq.preco, ativo:true, atualizacao: new Date()}})
    .exec( function(erro, doc) {
      console.log("Fruta alterada");
      console.log(doc);
      });
  }

  return controller;
}
