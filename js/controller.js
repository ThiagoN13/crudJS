//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute']);

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
}]);



app.controller("listController", function($scope, $http){
    $http.get("../listFruits.json")
    .then(function(result){
      $scope.fruits = result.data.fruits;
    }, function(error){
      console.log(error)
    });
  });


app.controller('controlFruit', function ($scope,$location, $routeParams, $http) {

    if($routeParams.id === undefined){
      $scope.title = "Nova Fruta";
      $scope.verify = function(){
        console.log($scope.fruta.nome);
        console.log($scope.fruta.quantidade);
        console.log($scope.fruta.preco);
      }
    }

    else{
        $scope.title = "Editar Fruta";
        //$scope.editar = function(){
        $http.get("../listFruits.json")
        .then(function(result){
          angular.forEach(result.data.fruits, function(data){
            if(data.id == $routeParams.id){
                data.quantidade = parseInt(data.quantidade);
                $scope.fruta = {nome:data.name, quantidade:data.quantidade, preco:data.preco}
              }
        });
        }, function(error){
            console.log(error)
        });
    }

	$scope.save = function(){
		///
		$location.path('/');
	}
});

app.controller('removeFruit', function($scope, $location, $routeParams, $http){
  $http.get("../listFruits.json")
  .then(function(result){
    angular.forEach(result.data.fruits, function(data){
      if(data.id == $routeParams.id){
          console.log(data.name);
          console.log(data.quantidade);
          console.log(data.preco);
          console.log("apagar");
          $location.path('/list');
        }
      });
  }, function(error){
      console.log(error)
  });
});
