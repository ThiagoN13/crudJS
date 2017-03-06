module.exports = function(app){
  var Usuario = app.models.usuario;

  var controller = {};

  controller.novoUsuario = function(req, res){
    var userReq = req.body;
    console.log(userReq);
    var user = new Usuario({"login":userReq.login, "email":userReq.email, "senha":userReq.senha, "nivel":0})
    req.session.usuario = {
      login: userReq.login,
      email: userReq.email
    }
    console.log(req.session.usuario);
    user.save().then( function(result){
      console.log(result);
    })
    res.redirect("/")
  };

  controller.obterUsuario = function(req, res){
    Usuario.find({}).exec( function(erro, sucess) {
        if (sucess) {
          res.json(sucess)
        }

      });
  }

  controller.destruirSession = function(req, res){
    req.session.destroy();
  }

  controller.rotaRaiz = function(req,res){
    res.render("../login.html")
  }


  return controller;
}
