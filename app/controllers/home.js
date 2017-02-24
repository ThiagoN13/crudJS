module.exports = function(app){
  var Fruteira = app.models.fruta;

  var controller = {};

  controller.editarFruta = function(req, res){
    var fruta = req.body;
    if(_id) {
      Fruteira.update({"_id": fruta.id},{$set: {"nome" : fruta.nome, "quantidade":fruta.quantidade, "preco":fruta.preco}}).exec()
      .then(
      function(fruteira) {
        res.json(fruteira);
      },
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
        }
    );
    } else {
      Fruteira.create(req.body)
      .then(
        function(contato) {
            res.status(201).json(fruteira);
        },
        function(erro) {
          console.log(erro);
        }
      );
    };
  };

  controller.inserirFruta = function(req, res){
    var fruta = req.body;
    if(_id) {
      Fruteira.insert({"nome":fruta.nome, "quantidade":fruta.quantidade, "preco":fruta.preco}).exec()
      .then(
      function(fruteira) {
        res.json(fruteira);
      },
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
        }
    );
    } else {
      Fruteira.create(req.body)
      .then(
        function(contato) {
            res.status(201).json(fruteira);
        },
        function(erro) {
          console.log(erro);
        }
      );
    };
  };

  controller.obterFruta = function(req, res){
    var _id = req.params.id;
    Fruteira.findById(_id).exec().then(
      function(fruteira) {
        if (fruteira) {
          res.json(fruteira)
        }
      },
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );
  };

  controller.listarFruta = function(req, res){
    Fruteira.find().exec()
    .then( function(fruteiras) {
      console.log(fruteiras);
        res.json(fruteiras);
      },
      function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
    );

  };

  controller.removerFruta = function(req, res){
    var _id = req.params.id;
    Fruteira.remove({"_id": _id}).exec()
    .then(function(fruteira){
      res.end();
    }, function (erro) {
        return console.error(error);
    });

  };

  return controller;
}
