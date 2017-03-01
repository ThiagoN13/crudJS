module.exports = function(app){
  var fruteira = app.models.fruta;

  var controller = {};

  controller.inserirFruta = function(req, res){
    var fruta = req.body;
    console.log("servidor");
    console.log(fruta);
    var frut = new fruteira({"nome":fruta.nome, "quantidade":fruta.quantidade, "preco":fruta.preco})
    frut.save().then( function(result){
      console.log(result);
    })
  };

  controller.obterFruta = function(req, res){
    var _id = req.params.id;
    fruteira.findOne({"_id" : _id}).exec( function(erro, frutas) {
        if (frutas) {
          res.json(frutas)
        }
      }
    );
  };

  controller.listarFruta = function(req, res){
    fruteira.find({}).exec( function(erro, doc) {
        res.json(doc);
      });
  };

  controller.removerFruta = function(req, res){
    console.log(req.body._id);
    var _id = req.body._id;
    fruteira.remove({"_id": _id}).exec( function(erro) {
      res.end();
    });
  };

  controller.editarFruta = function(req, res){
    var _id = req.body._id;
    console.log(_id)
    var frutaReq = req.body
    fruteira.findOne({"_id" : _id}).exec( function(erro, fruta) {
        if (fruta) {
          fruta.nome = frutaReq.nome;
          fruta.quantidade = frutaReq.quantidade;
          fruta.preco = fruta.preco;
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
