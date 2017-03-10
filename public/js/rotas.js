//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute', 'ngResource']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
  .when('/list/:index',{
    controller:'listController',
    templateUrl:'./list.html'
  })
  .when('/home/:index',{
    controller:'listController',
    templateUrl:'./home.html'
  })
	.when('/historico',{
    controller:'historico',
    templateUrl:'./historico.html'
  })
  .otherwise({
    redirectTo:'/home/:index'
  });
  app.run(['$rootScope', function($rootScope) {
    console.log('app.run');
  }]);
}]);
