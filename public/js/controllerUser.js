//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app',['ngRoute', 'ngResource']);
app.controller("controlAcess", function($scope, $resource, $location){

  $scope.cadastrar = function(){
    var Usuario = $resource('/usuarios/novoUsuario');
    var newUser = new Usuario();
    if($scope.usuario.login && $scope.usuario.email && $scope.usuario.senha){
      newUser.login = $scope.usuario.login;
      newUser.email = $scope.usuario.email;
      newUser.senha = $scope.usuario.senha;
      newUser.$save();
      console.log("Usuario cadadstrado com sucesso");
    }
  }

  $scope.logar = function(){
    var Usuario = $resource('/usuarios/obterUsuario');
    Usuario.query(function(res) {
      angular.forEach(res, function(value){
          if(value.login == $scope.usuario.login || value.email == $scope.usuario.email && $scope.usuario.senha == value.senha){
            $scope.usuario = {login : value.login, email:value.quantidade, senha:value.preco, nivel:value.nivel};
            console.log('logado');
          }
      });
    });
  }
});

  // app.controller("editUser", function($scope, $resource){
  //
  // })
