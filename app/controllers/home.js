module.exports = function(app){
  var fruteira = app.models.fruta;

  var controller = {};

  controller.inserirFruta = function(req, res){
    var fruta = req.body;
    console.log(fruta);
    var frut = new fruteira({"nome":fruta.nome, "quantidade":fruta.quantidade, "preco":fruta.preco, "atualizacao":new Date()})
    frut.save().then( function(result){
      console.log(result);
    })
  };

  controller.obterFruta = function(req, res){
    var _id = req.params._id;
    fruteira.findOne({"_id" : _id}).exec( function(erro, frutas) {
        if (frutas) {
          res.json(frutas)
        }
      }
    );
  };

  controller.listarFruta = function(req, res){
    fruteira.find({}).where('ativo', true).exec( function(erro, doc) {
        res.json(doc);
      });
  };

  controller.removerFruta = function(req, res){
    var ids = req.body._id;
    console.log(ids)
    if(ids){
      ids.forEach(function(valorId) {
        console.log(valorId);
        fruteira.update({"_id" : valorId}, {$set: {ativo: false}}).exec( function(erro, doc) {
          console.log("removido");
          console.log(doc);
        });
      });
    }
  };

  controller.editarFruta = function(req, res){
    var _id = req.body._id;
    var frutaReq = req.body
    fruteira.findOne({"_id" : _id}).where('ativo', true).exec( function(erro, fruta) {
        if (fruta) {
          fruta.nome = frutaReq.nome;
          fruta.quantidade = frutaReq.quantidade;
          fruta.preco = frutaReq.preco;
          fruta.atualizacao = new Date();
          fruta.save(function(erro){
            if (erro) {
              return new Error(erro)
            }
            res.json(fruta)
          });
        }
      }
    );
  }



  return controller;
}
