module.exports = function(app){
  var controller = app.controllers.home;

  app.get('/fruteiras/list', controller.listarFruta);
  app.get('/fruteiras/list:id', controller.obterFruta);
  app.post('/fruteiras/inserir', controller.inserirFruta);
}
