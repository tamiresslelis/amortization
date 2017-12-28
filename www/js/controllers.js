angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope) {})

.controller('FinanciamentoCtrl', function($scope, Chats) {


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
