var app = angular.module('app');

app.controller("listController", function($routeParams, $scope, $resource, $location){
  var Fruta = $resource('/fruteiras/list');
  var FrutaRemove = $resource('/fruteiras/remove');
  var deleteFruit = new FrutaRemove();

  $scope.users = [];
      $scope.totalFruits = 0;
      getResultsPage(1);

      $scope.pagination = {
          current: 1
      };

      $scope.pageChanged = function(newPage) {
          getResultsPage(newPage);
      };
    function getResultsPage(pageNumber) {
      Fruta.query(function(res) {
        $scope.fruits = res;
        $scope.totalFruits = $scope.fruits.length
      });
    }

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
      $cookieStore.put('carrinho', $scope.carrinho);
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
    var AttQuantidade = $resource('/fruteiras/atualizaEstoque');
    var AddHistorico = $resource('/ntFiscal/addHistorico');
    var ntFiscal = new AddHistorico();
    ntFiscal.total = $scope.carrinho.total;
    ntFiscal.carrinho = [];
    var attFruit = new AttQuantidade();
    verificaCompra();
    if(vCompra){
      angular.forEach(qtdEstoque, function(value,key){
        angular.forEach($scope.fruits, function(fruta){
          if(value.nome == fruta.nome){
            fruta.quantidade = value.quantidade - fruta.quantidade;
            var quantidade = value.quantidade - fruta.quantidade;
            ntFiscal.carrinho.push({nome: value.nome, quantidade:quantidade, preco: fruta.preco})
            attFruit._id = fruta._id;
            attFruit.quantidade = fruta.quantidade;
            attFruit.$save().then(function(sucess){
              console.log("atualizado");
            });
            $scope.carrinho.splice(key,1);
            calcTot();
          }
        });
      });
      ntFiscal.$save().then(function(sucess){
        console.log("enviado");
      })
    };
  }


});


app.controller('controlFruit', function ($scope, $location, $routeParams, $resource) {
  if($routeParams.index == ":index2"){
    $scope.title = "Nova Fruta";
    console.log($routeParams.index);
  }
  else {
    $scope.title = "Editar Fruta";
    var Fruta = $resource('/fruteiras/list/:id');
    Fruta.query(function(res) {
      angular.forEach(res, function(value){
          if(value._id == $routeParams.index){
            $scope.fruta = {nome : value.nome, quantidade:value.quantidade, preco:value.preco};
          }
      });
    });
  }

  $scope.submit = function(){
    var Fruta = $resource('/fruteiras/inserir');
    if($routeParams.index == ":index2"){
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
    else{
      if(angular.isNumber($scope.fruta.quantidade) && angular.isString($scope.fruta.nome)){
        var FrutaRes = $resource('/fruteiras/update')
        var editar = new FrutaRes();
        editar._id = $routeParams.index;
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
