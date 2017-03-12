//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute', 'ngResource']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
  .when('/list/:index',{
    controller:'listController',
    templateUrl:'./html/list.html'
  })
  .when('/home/:index',{
    controller:'listController',
    templateUrl:'./html/home.html'
  })
	.when('/historico/:id',{
    controller:'historico',
    templateUrl:'./html/historico.html'
  })
  .otherwise({
    redirectTo:'/home/:index'
  });
  app.run(['$rootScope', function($rootScope) {
    console.log('app.run');
  }]);
}]);
