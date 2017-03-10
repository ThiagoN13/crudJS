module.exports = function(app){
  var Usuario = app.models.usuario;
  var NtFiscal = app.models.ntFiscal;

  var controller = {};

  controller.verHistorico = function(req, res){
    var id = req.session.usuario.id;
    console.log(id);
    NtFiscal.findOne({"_id" : id}).exec( function(erro, sucess) {
      if (sucess) {
        res.json(sucess)
      }
    });
  }

  controller.addHistorico = function(req, res){
    carrinho.frutas = {};
    var historico = new NtFiscal({"data": new Date(), "total": carrinho.total, "carrinho": carrinho.frutas});
    historico.save().then( function(result){
      console.log(result);
    })
  }

  controller.novoUsuario = function(req, res){
    var userReq = req.body;
    console.log(userReq);
    var user = new Usuario({"login":userReq.login, "email":userReq.email, "senha":userReq.senha, "nivel":0})
    req.session.usuario = {
      login: userReq.login,
      email: userReq.email,
      nivel: 0,
      ativo: true
    }
    user.save().then( function(result){
      console.log(result);
    })
  };

  controller.logarUsuario = function(req, res){
    var userReq = req.body;
    var user = new Usuario();
    Usuario.find({'login': userReq.login}).where( 'senha', userReq.senha).exec( function(erro, user) {
        if (user) {
          user.forEach(function(value){
          req.session.usuario = {
            id: value._id,
            login: value.login,
            email: value.email,
            nivel: value.nivel,
            ativo: true
          }
          res.json({user})
        })
    }
  })
}

  controller.obterUsuario = function(req, res){
    Usuario.find({}).where().exec(function(erro, sucess){
      res.json(sucess);
    })
  }

  controller.obterAdmin = function(req, res){
    Usuario.find({}).where('nivel', 1).exec(function(erro, sucess){
      res.json(sucess);
    })
  }

  controller.usuarioPadrao = function(req, res){
    Usuario.find({}).where('nivel', 0).exec(function(erro, sucess){
      res.json(sucess);
    })
  }

  controller.editarUsuario = function(req, res){
    var userReq = req.body;
    if(userReq){
        Usuario.update({"_id" : req.session.usuario.id}, {$set: {login: userReq.login, senha: userReq.senha, enail: userReq.email}})
          .exec( function(erro, doc) {
            console.log('Alterado');
        });
      }
  }

  controller.editarNivel = function(req, res){
    var userReq = req.body;
    console.log(userReq.nivel)
    if(userReq.nivel == 1) userReq.nivel = 0
    else userReq.nivel = 1
    console.log(userReq.nivel)
    if(userReq){
        Usuario.update({"_id" : userReq._id}, {$set: {nivel: userReq.nivel}})
          .exec( function(erro, doc) {
            console.log(doc);
        });
      }
  }

  controller.infoUsuario = function(req, res){
    if(req.session.usuario != undefined){
      Usuario.findOne({"login":req.session.usuario.login}).where().exec( function(erro, user) {
        if(user){
          res.json([user]);
        }
      })
    }
  }

  controller.destruirSession = function(req, res){
    console.log("Saiu");
    req.session.destroy();
  }


  return controller;
}
