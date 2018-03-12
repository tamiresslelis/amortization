angular.module('starter.controllers', [])

.controller('inicioCtrl', function($scope, $state){

$scope.paraFinanciamento = function(){
    $state.go('tab.finanamento');
}
$scope.paraAmortizacao = function(){
    $state.go('tab.amortizacao');
}

})

.controller('financiamentoCtrl', function ($scope, $ionicPopup){
  $scope.model = {
    valorFinanciado: '',
    juros: '',
    periodo: '',
    tabela: '',
    somaJuros: 0,
    somaPrestacoes: 0

  };
  $scope.mascaraFian = function() {
    $('#currency_finan').maskMoney();

  };
  $scope.alert = function(textTitle,textMensage) {
    $ionicPopup.alert({
      title: textTitle,
      content: textMensage,
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }
$scope.reset = function() {
    if(!$scope.model.tabela){
      $scope.model = {};

    }
}

$scope.submit= function() {
var verificatab1 = false;
var verificatab2 = false;

var financiamento = new Financiamento($scope.model);

            if(($scope.model.valorFinanciado == "") || ( $scope.model.periodo == undefined) ){
                      $scope.alert('Ops!','Por favor, preencha todos os campos!');
            }else{
                    if($scope.model.tabela == "none"){
                        $scope.alert('Ops!','Por favor, preencha todos os campos!');
                    }else{
                        if($scope.model.tabela == "sac") {
                            if($scope.model.periodo >450){
                                $scope.alert('Ops!','Informamos que a quantidade máxima para realizar um financiamento é até 450 meses.');
                            }else{
                              verificatab1 = true;
                              $scope.grid = financiamento.sac();
                            }
                        }
                        if ($scope.model.tabela == "price") {
                          if($scope.model.periodo >450){
                              $scope.alert('Ops!','Informamos que a quantidade máxima para realizar um financiamento é até 450 meses.');
                          }else{
                               if($scope.model.juros == 0){
                                    $scope.alert('ATENÇÃO','Só é possível efetuar os calculos com taxa de juros diferente de 0 para a Tabela PRICE!');
                               }else{
                                  verificatab2 = true;
                                 $scope.grid = financiamento.price();
                                }
                              }
                        }
                        if (verificatab1 || verificatab2 ==  true) {
                            $scope.alert('Tabela gerada!','Deslize  para baixo e veja!');
                          }
                        }
              }
      }
})

.controller('amortizacaoCtrl', function($scope,$ionicPopup){
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
  $scope.reset = function() {
      if(!$scope.mod.tabela){
        $scope.mod = {};

      }
  }
  $scope.mascaraAmort = function() {
    $('#currency').maskMoney();

  };
  $scope.mascara1 = function() {
    $('#currency1').maskMoney();

  };
  $scope.alert = function(textTitle,textMensage) {
    $ionicPopup.alert({
      title: textTitle,
      content: textMensage,
    }).then(function (res) {
      console.log('Test Alert Box');
    });
  }

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

  $scope.submit_div = function () {
    var verificatab1 = false;
    var verificatab2 = false;

    var divida = new Divida($scope.mod);
    console.log("O peridodo"+$scope.mod.faltam);
    if(($scope.mod.saldoDevedor == "") || ( $scope.mod.faltam == undefined) ){
              $scope.alert('Ops!','Por favor, preencha todos os campos!');
    }else{
              //se alguma opcao diminuir estiver verdadeira
              if ($scope.mod.inactive1 == true || $scope.mod.inactive2 == true) {
                //verifica se preencheu a tabela

                      if ($scope.mod.tabela == "none") {
                            $scope.alert('Ops!','Por favor, preencha todos os campos!');
                      }
                      if ($scope.mod.tabela == "sac") {
                            if($scope.mod.faltam >450){
                                $scope.alert('Ops!','Informamos que a quantidade máxima para realizar um financiamento é até 450 meses.');
                            }else{
                              if( $scope.mod.faltam <3){

                                $scope.alert('Ops!','Informamos que só é possível diminuir o prazo se faltar 3 ou mais de 3 meses.');
                              }else{
                              verificatab1 = true;
                              $scope.grid = divida.sac();
                              }
                            }
                      }
                      if ($scope.mod.tabela == "price") {
                        if($scope.mod.faltam >450){
                            $scope.alert('Ops!','Informamos que a quantidade máxima para realizar um financiamento é até 450 meses.');
                        }else{
                              if( $scope.mod.faltam <3){
                                $scope.alert('Ops!','Informamos que só é possível diminuir o prazo se faltar 3 ou mais de 3 meses.');
                              }else{
                                   if($scope.mod.juros == 0){
                                        $scope.alert('ATENÇÃO','Só é possível efetuar os calculos com taxa de juros diferente de 0 para a Tabela PRICE!');
                                   }else{
                                      verificatab2 = true;
                                          $scope.grid = divida.price();
                                    }
                                  }
                              }
                      }
                      if (verificatab1 || verificatab2 ==  true) {
                            $scope.alert('Tabela gerada!','Deslize  para baixo e veja!');
                        }


              }
              else {
                // se nenhuma das opçãos e a tabela estiver none
                if ($scope.mod.tabela == "none") {
                  // console.log("aqui1");
                  $scope.alert('Ops!','Por favor, preencha todos os campos!');
                  //se a tabela estiver diferente de none,mas nenhuma opcao foi selecionada
                } else {
                  $scope.alert('Ops!','Por favor, preencha todos os campos!');
                }

              }

            }
        }

})
.controller('ajudaCtrl', function($scope,$state) {


})

.controller('tabelasCtrl', function($scope,$stateParams,$ionicHistory) {
  console.log($stateParams.movieid);
  $scope.goBack = function(){
    window.history.back();

  }

});
