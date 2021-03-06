// Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app', ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination'])

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/list/:index', {
      controller: 'listController',
      templateUrl: './html/list.html'
    })
    .when('/', {
      controller: 'listController',
      templateUrl: './html/home.html'
    })
    .when('/historico/:id', {
      controller: 'historico',
      templateUrl: './html/historico.html'
    })
    .when('/comentario/:id', {
      controller: 'comentario',
      templateUrl: './html/comentario.html'
    })
    .when('/vercomentario/:coments', {
      controller: 'comentario',
      templateUrl: './html/verComentarios.html'
    })
    .otherwise({
      redirectTo: '/'
    })
  app.run(['$rootScope', function ($rootScope) {
    console.log('app.run')
  }])
}])
