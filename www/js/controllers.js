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

  };
  $scope.alertPeriodo = function() {
    $ionicPopup.alert({
      title: 'Ops!',
      content: 'Informamos que a quantidade máxima para realizar um financiamento é até 450 meses.'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }

  $scope.alertCampos = function() {
    $ionicPopup.alert({
      title: 'Ops!',
      content: 'Por favor, preencha todos os campos!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }
  $scope.alertTabela = function(){
    $ionicPopup.alert({
      title: 'Tabela gerada',
      content: 'Deslize  para baixo e veja!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }
  $scope.alertTabelaPrice = function(){
    $ionicPopup.alert({
      title: 'ATENÇÃO',
      content: 'Só é possível efetuar os calculos com taxa de juros diferente de 0 para a Tabela PRICE!'
    }).then(function (res) {
      console.log('Test Alert Box');
    });
}
$scope.submit= function() {
var verificatab1 = false;
var verificatab2 = false;

var financiamento = new Financiamento($scope.model);

            if(($scope.model.valorFinanciado == "") || ( $scope.model.periodo == undefined) ){
                      $scope.alertCampos();
            }else{
                    if($scope.model.tabela == "none"){
                        $scope.alertCampos();
                    }else{
                        if($scope.model.tabela == "sac") {
                            if($scope.model.periodo >450){
                                $scope.alertPeriodo();
                            }else{
                              verificatab1 = true;
                              $scope.grid = financiamento.sac();
                            }
                        }
                        if ($scope.model.tabela == "price") {
                          if($scope.model.periodo >450){
                              $scope.alertPeriodo();
                          }else{
                               if($scope.model.juros == 0){
                                    $scope.alertTabelaPrice();
                               }else{
                                  verificatab2 = true;
                                 $scope.grid = financiamento.price();
                                }
                              }
                        }
                        if (verificatab1 || verificatab2 ==  true) {
                          $scope.alertTabela();}
                        }
              }
      }
})

.controller('AmortizacaoCtrl', function($scope,$ionicPopup){

  $scope.mascara = function() {
    $('#currency').maskMoney();

  };
  $scope.mascara1 = function() {
    $('#currency1').maskMoney();

  };
  $scope.mod = {
    saldoDevedor: '',
    juros: '',
    periodo: '',
    tabela: '',
    diminuirPrazo: '',
    faltam: '',
    inactive1: false,
    inactive2: false,
    n: '',
    somaJuros: 0,
    somaPrestacoes: 0

  };

  $scope.switchRadio = (valor) => {
    if (valor === 1) {
      $scope.mod.inactive1 = true;
      $scope.mod.inactive2 = false;
    }
    if (valor === 2) {
      $scope.mod.inactive1 = false;
      $scope.mod.inactive2 = true;
    }
  }

  // };

  $scope.submit_div = function () {

    var divida = new Divida($scope.mod);
    //console.log("inactive1"+$scope.mod.inactive1);
    //console.log("inactive2"+$scope.mod.inactive2);
    //se alguma opcao diminuir estiver verdadeira
    if ($scope.mod.inactive1 == true || $scope.mod.inactive2 == true) {
      //verifica se preencheu a tabela
      //console.log("aqui0");
      if ($scope.mod.tabela == "none") {

        $ionicPopup.alert({
          title: 'ATENÇÃO',
          content: 'Preencha os campos obrigatórios!'
        }).then(function (res) {
          console.log('Test Alert Box');
        });
      }

      if ($scope.mod.tabela == "sac") {
        var tab1 = 1;
        $scope.grid = divida.sac();

      }
      if ($scope.mod.tabela == "price") {
        var tab2 = 1;
        $scope.grid = divida.price();
      }
      if (tab1 || tab2 == 1) {
        $ionicPopup.alert({
          title: 'Tabela gerada',
          content: 'Deslize para baixo e veja!'
        }).then(function (res) {
          console.log('Test Alert Box');
        });


      };
    }
    else {
      // se nenhuma das opçãos e a tabela estiver none
      if ($scope.mod.tabela == "none") {
        // console.log("aqui1");
        $ionicPopup.alert({
          title: 'ATENÇÃO',
          content: 'Preencha os campos obrigatórios!'
        }).then(function (res) {
          console.log('Test Alert Box');
        });
        //se a tabela estiver diferente de none,mas nenhuma opcao foi selecionada
      } else {
        console.log("aqui2");
        $ionicPopup.alert({
          title: 'ATENÇÃO',
          content: 'Preencha os campos obrigatórios!'
        }).then(function (res) {
          console.log('Test Alert Box');
        });
      }

    }

  }

})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
