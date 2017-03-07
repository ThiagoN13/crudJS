//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app');

app.controller("controlAcess", function($scope, $resource, $location, $routeParams){

  $scope.cadastrar = function(){
    var Usuario = $resource('/usuarios/novoUsuario');
    var newUser = new Usuario();
    if($scope.usuario.login && $scope.usuario.email && $scope.usuario.senha){
      newUser.login = $scope.usuario.login;
      newUser.email = $scope.usuario.email;
      newUser.senha = $scope.usuario.senha;
      newUser.$save();
      console.log(newUser)
      $scope.messageCadastro = "Usuario cadadstrado com sucesso";
      $location.path('/home')
    }
  }

  $scope.logar = function(){
    var Usuario = $resource('/usuarios/logarUsuario');
    var obterUsuario = $resource('/usuarios/obterUsuario');
    var logUser = new Usuario();
    if($scope.usuario.login || $scope.usuario.email && $scope.usuario.senha){
      logUser.login = $scope.usuario.login;
      logUser.email = $scope.usuario.email;
      logUser.senha = $scope.usuario.senha;
      logUser.$save();
      obterUsuario.query(function(doc){
        angular.forEach(doc, function(value){
          if($scope.usuario.login == value.login || $scope.usuario.email == value.email && $scope.usuario.senha == value.senha){
            $scope.usuario.nivel = value.nivel;
            $scope.usuario.ativo = value.ativo;
            $scope.message = "";
            console.log("Usuario logado com sucesso");
            //$location.path('/home')
          } else {
            $scope.message = "O login e senha informado estao incorretos";
          }
        })

      })

    }
  }

  $scope.deslogar = function(){
    var Deslogar = $resource('/usuarios/destruirSession');
    sair = new Deslogar();
    sair.$save();
  }

  $scope.editarUsuario = function(){
    console.log($routeParams.index )
    if($routeParams.index == "123"){
      $scope.title = "Editar informacoes";
      console.log("editar")
    }
  }

});
