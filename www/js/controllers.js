angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope) {})

.controller('FinanciamentoCtrl', function ($scope, $ionicPopup){

  function mascara() {
      $('#currency').maskMoney();
    }


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
