module.exports = function(app){
  var controller = app.controllers.home;
  app.get('/', controller.index);

  var editar = app.controllers.editar;
  app.get('/edit/:id', editar.list);
}
