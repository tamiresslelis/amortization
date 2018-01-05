angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope,){

})

.controller('FinanciamentoCtrl', function ($scope, $ionicPopup){
  $scope.model = {
    valorFinanciado: '',
    juros: '',
    periodo: '',
    tabela: '',
    somaJuros: 0,
    somaPrestacoes: 0

  };
  $scope.mascara = function() {
    $('#currency').maskMoney();
    //formato();
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

  $scope.alertTabela = function(){
    $ionicPopup.alert({
      title: 'Tabela gerada',
      content: 'Deslize para baixo e veja!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }


$scope.submit= function() {
var verificatab1 =0;
var verificatab2 =0;
var financiamento = new Financiamento($scope.model);
console.log("aqui1");
console.log("Valor Financiamento: " +$scope.model.valorFinanciado);
console.log("Periodo: " +$scope.model.periodo);
            if(($scope.model.valorFinanciado == "") || ( $scope.model.periodo == undefined) ){
              console.log("aqui 1 2 3");
                $scope.alertCampos();
            }else{
                    if($scope.model.tabela == "none"){
                        $scope.alertCampos();
                    }else{
                        if($scope.model.tabela == "sac") {
                              verificatab1= 1;
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
                              verificatab2 = 1;
                             $scope.grid = financiamento.price();
                            }
                          }
                        if (verificatab1 || verificatab2 == 1) {
                          $scope.alertTabela();}
                        }
              }
      }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
