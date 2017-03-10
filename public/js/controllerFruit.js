var app = angular.module('app');

app.controller("listController", function($routeParams, $scope, $resource, $location){
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
    console.log("Deletando uma fruta");
    deleteFruit._id = [fruta._id];
    $scope.fruits.splice(index,1);
    deleteFruit.$save().then(function(res){
      console.log("removido")
    });
  }

  $scope.deleteSelect = function(fruits){
    console.log("Deletando frutas selecionadas");
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
    });
  }

  $scope.carrinho = [];
  $scope.carrinho.total = 0;
  var vCompra, qtdEstoque = [];

  function verificaCompra(){
      angular.forEach($scope.fruits, function(frutaEstoque){
        if($scope.carrinho[$scope.carrinho.length-1].nome == frutaEstoque.nome){
          if($scope.carrinho.qtdCarrinho > frutaEstoque.quantidade){
            console.log("Indisponivel");
            vCompra = false;
          }
          else {
            console.log("disponivel");
            vCompra = true;
          }
        }
      });
  }

  $scope.SelectFruit = function(fruta){
    fruta.disponivel = false;
    qtdEstoque.push({"id":fruta._id ,"nome":fruta.nome, "quantidade": fruta.quantidade});
    $scope.carrinho.push(fruta);
    $scope.carrinho.qtdCarrinho = 1;
    $scope.$watch("carrinho.qtdCarrinho", function (valor) {
      if(valor){
        if(valor > fruta.quantidade){
          $scope.message = "Quantidade indisponivel no estoque";
        } else{
          $scope.message = "";
        }
      }
    });
  }

  function calcTot(){
    $scope.carrinho.total = 0;
    if($scope.carrinho){
      angular.forEach($scope.carrinho, function(value){
        $scope.carrinho.total += value.quantidade * value.preco;
        return $scope.carrinho.total;
      });
    }
  }

  $scope.addCarrinho = function(){
    verificaCompra();
    if(vCompra){
      if(!$scope.carrinho.qtdCarrinho) $scope.carrinho.qtdCarrinho = 1;
      $scope.carrinho[$scope.carrinho.length-1].quantidade = $scope.carrinho.qtdCarrinho;
      $scope.carrinho[$scope.carrinho.length-1].disponivel = true;
      $scope.carrinho.qtdCarrinho = "";
      var total = calcTot();
    } else {
      console.log("nao tem");
    }
  }

  $scope.removeCarrinho = function(fruta, index){
    $scope.carrinho.splice(index,1);
    calcTot();
  }

  $scope.attEstoque = function(){
    var attQuantidade = $resource('/fruteiras/atualizaEstoque');
    var attFruit = new attQuantidade();
    verificaCompra();
    if(vCompra){
      angular.forEach(qtdEstoque, function(value){
        angular.forEach($scope.fruits, function(fruta){
          if(value.nome == fruta.nome){
            fruta.quantidade = value.quantidade - fruta.quantidade;
            attFruit._id = fruta._id;
            attFruit.quantidade = fruta.quantidade;
            console.log(value)
            attFruit.$save().then(function(sucess){
              console.log("atualizado");
            });
          }
        });
      });
    };
  }


});


app.controller('controlFruit', function ($scope, $location, $routeParams, $resource) {
  if($routeParams.index == ":index2"){
    $scope.title = "Nova Fruta";
  }
  else {
    console.log($routeParams.index);
    $scope.title = "Editar Fruta";
    var Fruta = $resource('/fruteiras/list/:id');
    Fruta.query(function(res) {
      console.log()
      angular.forEach(res, function(value){
          if(value._id == $routeParams.index){
            $scope.fruta = {nome : value.nome, quantidade:value.quantidade, preco:value.preco};
          }
      });
    });
  }

  $scope.submit = function(){
    var Fruta = $resource('/fruteiras/inserir');
    console.log($routeParams.id);
    if($routeParams.id == ":index"){
      if(angular.isNumber($scope.fruta.quantidade) && angular.isString($scope.fruta.nome)){
        $scope.fruits.push($scope.fruta);
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
    if($routeParams.id != ":index"){
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
		$location.path('/list/:index')
  }
});
