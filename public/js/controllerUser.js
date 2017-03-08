//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app');

app.controller("controlAcess", function($scope, $resource, $location, $routeParams){
  $scope.title = "Criar Conta";
  var obterUsuario = $resource('/usuarios/obterUsuario');
  obterUsuario.query(function(res) {
    $scope.usuarios = res;
  });

  $scope.infoUser = function(){
    if($routeParams.index == ":index2"){
      $scope.title = "Editar Usuário";
      var Info = $resource('/usuarios/infoUsuario');
      if(Info){
        Info.query(function(res){
          angular.forEach(res, function(value){
            $scope.usuario = {login : value.login, email: value.email, senha: value.senha, nivel:value.nivel};
          });
        });
      }
    }
  }


  $scope.controlUser = function(){
    var Usuario = $resource('/usuarios/novoUsuario');
    var EditarUsuario = $resource('/usuarios/editarUsuario');

    var editUser = new EditarUsuario();
    var newUser = new Usuario();

    if($routeParams.index == ":index2"){
      if($scope.usuario.login && $scope.usuario.email && $scope.usuario.senha){
        editUser.login = $scope.usuario.login;
        editUser.email = $scope.usuario.email;
        editUser.senha = $scope.usuario.senha;
        editUser.$save();
        $location.path('/home/:index')
      } else {
        console.log("Erro na alteracao dos dados")
      }

    } else {
      if($scope.usuario.login && $scope.usuario.email && $scope.usuario.senha){
        newUser.login = $scope.usuario.login;
        newUser.email = $scope.usuario.email;
        newUser.senha = $scope.usuario.senha;
        newUser.$save();
        $location.path('/home/:index')
      }
    }
  }

  $scope.logar = function(){
    var Usuario = $resource('/usuarios/logarUsuario');

    var logUser = new Usuario();
    if($scope.usuario.login && $scope.usuario.senha){
      logUser.login = $scope.usuario.login;
      logUser.senha = $scope.usuario.senha;
      logUser.$save().then(function(sucess){
        obterUsuario.query(function(doc){
          angular.forEach(doc, function(value){
            if($scope.usuario.login == value.login && $scope.usuario.senha == value.senha){
              $scope.usuario.nivel = value.nivel;
              $scope.message = "";
              console.log("Usuario logado com sucesso");
            } else {
              $scope.message = "O login e senha informado estao incorretos";
            }
          })
        })
      });
    }
  }

  $scope.deslogar = function(){
    var Deslogar = $resource('/usuarios/destruirSession');
    sair = new Deslogar();
    sair.$save();
  }


});
