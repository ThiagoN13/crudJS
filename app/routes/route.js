module.exports = function(app){
  var controllerFruit = app.controllers.homeFruit;
  var controllerUser = app.controllers.homeUser;


  // Rotas de controle Fruta
  app.get('/fruteiras/list', controllerFruit.listarFruta);
  app.get('/fruteiras/list/:id', controllerFruit.obterFruta);
  app.post('/fruteiras/remove', controllerFruit.removerFruta);
  app.post('/fruteiras/inserir', controllerFruit.inserirFruta);
  app.post('/fruteiras/update', controllerFruit.editarFruta);
  app.post('/fruteiras/atualizaEstoque', controllerFruit.atualizaEstoque);

  // Rotas de controle do usuario

  app.get('/usuarios/obterUsuario', controllerUser.obterUsuario);
  app.get('/usuarios/obterAdmin', controllerUser.obterAdmin);
  app.get('/usuarios/usuarioPadrao', controllerUser.usuarioPadrao);
  app.get('/usuarios/infoUsuario', controllerUser.infoUsuario);
  app.post('/usuarios/novoUsuario', controllerUser.novoUsuario);
  app.post('/usuarios/logarUsuario', controllerUser.logarUsuario);
  app.post('/usuarios/destruirSession', controllerUser.destruirSession);
  app.post('/usuarios/editarUsuario', controllerUser.editarUsuario);
  app.post('/usuarios/editarNivel', controllerUser.editarNivel)

  // Ritas da nota fiscal
  app.get('/ntFiscal/verHistorico', controllerUser.verHistorico);
  app.post('/ntFiscal/addHistorico', controllerUser.addHistorico)


}