module.exports = function(app){
  var usuario = app.models.usuario;

  var controller = {};

  controller.novoUsuario = function(req, res){
    var userReq = req.body;
    console.log(userReq);
    var user = new usuario({"login":userReq.login, "email":userReq.email, "senha":userReq.senha, "nivel":0})
    user.save().then( function(result){
      console.log(result);
    })
  };

  controller.obterUsuario = function(req, res){
    usuario.find({}).exec( function(erro, sucess) {
        if (sucess) {
          res.json(sucess)
        }
      });
  }
  return controller;
}
