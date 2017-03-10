//Criação ao $app que é o modulo que representa toda a aplicação
var app = angular.module('app');

app.controller("controlAcess", function($scope, $resource, $location, $routeParams){
  var obterUsuario = $resource('/usuarios/obterUsuario');
  var userPadrao = $resource('/usuarios/usuarioPadrao');
  var EditarUsuario = $resource('/usuarios/editarUsuario');
  var userAdmin = $resource('/usuarios/obterAdmin');
  var Info = $resource('/usuarios/infoUsuario');

  $scope.title = "Criar Conta";

  Info.query(function(res) {
    $scope.userLogado = res;
  });
  userPadrao.query(function(res) {
    $scope.usuarios = res;
  });
  userAdmin.query(function(res) {
    $scope.administradores = res;
  });

  if($routeParams.index == ":index2"){
    $scope.title = "Editar Usuário";
    if(Info){
      Info.query(function(res){
        $scope.userLogado = res;
        angular.forEach(res, function(value){
          $scope.usuario = {login : value.login, email: value.email, senha: value.senha, nivel:value.nivel};
        });
      });
    }
  }


  $scope.controlUser = function(){
    var Usuario = $resource('/usuarios/novoUsuario');
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
          angular.forEach(doc, function(value, key){
            if($scope.usuario.login == value.login && $scope.usuario.senha == value.senha){
              $scope.usuario.nivel = value.nivel;
              $scope.userLogado = value;
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
    $scope.userLogado.splice(0, 1)
  }

  EditarNivel = $resource('/usuarios/editarNivel');

  $scope.permissao = function(){
    var editUser = new EditarNivel();
    editUser._id = $scope.adm.permissao;
    editUser.$save();
    userPadrao.query(function(res) {
      angular.forEach(res, function(value,key){
        if(value._id == editUser._id){
          $scope.administradores.push(value)
          $scope.usuarios.splice(key,1)
        }
      })
    });
    console.log("permissao concedida")
  }

  $scope.removerAdmin = function(admin, index){
    var editUser = new EditarNivel();
    editUser._id = admin._id;
    editUser.nivel = admin.nivel;
    editUser.$save();
    $scope.usuarios.push(admin);
    $scope.administradores.splice(index,1);
   }


});


app.controller("historico", function($scope, $resource, $location, $routeParams){
});
