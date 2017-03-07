module.exports = function(app){
  var Usuario = app.models.usuario;

  var controller = {};

  controller.novoUsuario = function(req, res){
    var userReq = req.body;
    console.log(userReq);
    var user = new Usuario({"login":userReq.login, "email":userReq.email, "senha":userReq.senha, "nivel":0, "ativo:":true})
    req.session.usuario = {
      login: userReq.login,
      email: userReq.email,
      ativo: 1
    }
    user.save().then( function(result){
      console.log(result);
    })
  };

  controller.logarUsuario = function(req, res){
    var userReq = req.body;
    var user = new Usuario();
    Usuario.findOne({}).where('login', userReq.login || 'email', userReq.email && 'senha', userReq.senha).exec( function(erro, user) {
        if (user) {
          Usuario.update({'_id': user._id}, {$set: {ativo: true}})
          .exec( function(erro, doc) {
            console.log(doc);
          });
          req.session.usuario = {
            login: user.login,
            email: user.email,
            nivel: user.nivel,
            ativo: user.ativo
          }
          res.json(user)
        }
      }
    );
  }

  controller.obterUsuario = function(req,res){
    Usuario.find({}).where().exec(function(erro, sucess){
      res.json(sucess);
    })
  }

  controller.destruirSession = function(req, res){
    req.session.destroy();
  }

  controller.rotaRaiz = function(req,res){
    res.render("../login.html")
  }


  return controller;
}
