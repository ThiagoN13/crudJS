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

  app.post('/usuarios/novoUsuario', controllerUser.novoUsuario);
  app.get('/usuarios/obterUsuario', controllerUser.obterUsuario)


}
