//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute', 'ngResource']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/list',{
    controller:'listController',
    templateUrl:'./list.html'
  }).
	when('/list/:id',{
    controller:'controlFruit',
    templateUrl:'./form.html'
  }).
	when('/new',{
    controller:'controlFruit',
    templateUrl:'./form.html'
  }).
	otherwise({
    redirectTo:'/list'
  });
  app.run(['$rootScope', function($rootScope) {
    console.log('app.run');
  }]);
}]);


app.controller("listController", function($scope, $http, $resource){
  var Fruta = $resource('/fruteiras/list');
  var FrutaRemove = $resource('/fruteiras/remove');
  var deleteFruit = new FrutaRemove();

  Fruta.query(function(res) {
    $scope.fruits = res;
  });
  $scope.selecionarTodos = function(){
    angular.forEach($scope.fruits, function(value,key){
      value.selecionado = true;
    })
  }
  $scope.deselecionarTodos = function(){
    angular.forEach($scope.fruits, function(value, key){
      value.selecionado = false;
    })
  }
  $scope.$watch("selecionartodos", function (valor) {
    if(valor){
      $scope.selecionarTodos();
    } else {
      $scope.deselecionarTodos();
    }
  })

  $scope.deleteOne = function(fruta, index){
    deleteFruit._id = [fruta._id];
    $scope.fruits.splice(index,1);
    deleteFruit.$save().then(function(res){
      console.log("removido")
      $location.path('/')
    });
  }

  $scope.deleteSelect = function(fruits){
    idArray = [];
    angular.forEach(fruits, function(value,key){
      if(value.selecionado){
        idArray.push(value._id);
        $scope.fruits.splice(key,1);
      }
    });

    deleteFruit._id = idArray;
    deleteFruit.$save().then(function(sucess){
      console.log("remove");
      $location.path('/')
    });
  }
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
    console.log($routeParams.id);
    if(!$routeParams.id){
      if(angular.isNumber($scope.fruta.quantidade) && angular.isString($scope.fruta.nome)){
        fruta = new Fruta();
        fruta.nome = $scope.fruta.nome;
        fruta.quantidade = $scope.fruta.quantidade;
        fruta.preco = $scope.fruta.preco;
        fruta.$save();
        $scope.message2 = "Fruta cadastrada com sucesso";
      } else {
        $scope.message = "Erro ao cadastrar fruta";
      }
    }
    else{
      if(angular.isNumber($scope.fruta.quantidade) && angular.isString($scope.fruta.nome)){
        var FrutaRes = $resource('/fruteiras/update')
        var editar = new FrutaRes();
        console.log("editar");
        editar._id = $routeParams.id;
        editar.nome = $scope.fruta.nome;
        editar.quantidade = $scope.fruta.quantidade;
        editar.preco = $scope.fruta.preco;
        editar.$save();
        $scope.message2 = "Alteração feita com sucesso";
      } else {
        $scope.message = "Erro ao editar fruta";
      }
    }

  }
});

app.controller('removeFruit', function($scope, $location, $routeParams, $resource){
  var Fruta = $resource('/fruteiras/remove');
  var deleteFruit = new Fruta();
});
