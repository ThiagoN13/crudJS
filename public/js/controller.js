//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute', 'ngResource']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/list',{
    controller:'listController',
    templateUrl:'./list.html'
  }).
	when('/edit/:id',{
    controller:'controlFruit',
    templateUrl:'./form.html'
  }).
	when('/new',{
    controller:'controlFruit',
    templateUrl:'./form.html'}).
  when('/list/:id',{
    controller:'removeFruit',
    templateUrl:'./list.html'}).
	otherwise({
    redirectTo:'/'
  });
  app.run(['$rootScope', function($rootScope) {
    console.log('app.run');
  }]);
}]);


app.controller("listController", function($scope, $http, $resource){
    var Fruta = $resource('/fruteiras/list');
    Fruta.query(function(res) {
      $scope.fruits = res;
    });
  });


app.controller('controlFruit', function ($scope,$location, $routeParams, $resource) {
  if($routeParams.id == undefined){
    $scope.title = "Nova Fruta";
  }
  else {
    $scope.title = "Editar Fruta";
    var Fruta = $resource('/fruteiras/list:id');
    Fruta.query(function(res) {
      angular.forEach(res, function(value){
          if(value._id == $routeParams.id){
            $scope.fruta = {nome : value.nome, quantidade:value.quantidade, preco:value.preco};
          }
      });
    });
  }

  $scope.submit = function(){
    var Fruta = $resource('/fruteiras/inserir');
    if(!$routeParams._id){
      console.log($scope.fruta.nome);
      console.log($scope.fruta.quantidade);
      console.log($scope.fruta.preco);
      fruta = new Fruta();
      fruta.nome = $scope.fruta.nome;
      fruta.quantidade = $scope.fruta.quantidade;
      fruta.preco = $scope.fruta.preco;
      fruta.$save();
    }
    else{
      var FrutaRes = $resource('/fruteiras/update')
      var editar = new FrutaRes();
      console.log("editar")
      editar._id = $routeParams.id
      editar.nome = $scope.fruta.nome;
      editar.quantidade = $scope.fruta.quantidade;
      editar.preco = $scope.fruta.preco;
      editar.$save();
    }

  }
});

app.controller('removeFruit', function($scope, $location, $routeParams, $resource){
  console.log($routeParams.id);
  var Fruta = $resource('/fruteiras/remove');
  var remover = new Fruta();
  remover._id = $routeParams.id;
  remover.$save().then(function(res){
    $location.path('/list')
  });

});
