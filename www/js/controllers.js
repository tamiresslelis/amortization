angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope,){

})


.controller('FinanciamentoCtrl', function ($scope, $ionicPopup){
/*  $scope.mascara = function() {
    $('#currency').maskMoney();
  };*/

  $scope.model = {
    valorFinanciado: '',
    juros: '',
    periodo: '',
    tabela: '',
    somaJuros: 0,
    somaPrestacoes: 0

  };
  $scope.alertCampos = function() {
    $ionicPopup.alert({
      title: 'ATENÇÃO',
      content: 'Preencha todos os campos!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }

  $scope.alertTabela = function(){
    $ionicPopup.alert({
      title: 'Tabela gerada',
      content: 'Deslize para baixo e veja!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }

$scope.submit=function(){
var financiamento = new Financiamento($scope.model);

            if($scope.model.tabela == "none"){
              $scope.alertCampos();
            }else{
                  if($scope.model.tabela == "sac") {
                              var tabe1 = 1;
                              $scope.grid = financiamento.sac();
                  }
                  if ($scope.model.tabela == "price") {
                     if($scope.model.juros == 0){
                       $ionicPopup.alert({
                         title: 'ATENÇÃO',
                         content: 'Só é possível efetuar os calculos com taxa de juros diferente de 0 para a Tabela PRICE!'
                       }).then(function (res) {
                         console.log('Test Alert Box');
                       });
                     }else{
                       var tabe2 = 1;
                       $scope.grid = financiamento.price();}
                  }
                  if (tabe1 || tabe2 == 1) {
                    $scope.alertTabela();}
                  }
      }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
