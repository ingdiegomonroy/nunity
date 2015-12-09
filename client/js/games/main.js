var score = 100;

$(function(){
angular
  .module('app')
  .controller('SalonController', ['$scope', '$state','$rootScope','Registros',
      function($scope, $state,$rootScope,Registros) {

      $scope.usuario = $rootScope.currentUser.email;
     // $scope.usuario = $scope.usuario.slice(5);

      $scope.oneAtATime = false;
      $scope.state_two = 0;

/*-------FUNCION PARA CARGAR LA INFORMACIÓN DEL PERFIL-----------------*/
     Registros
      .find({
        filter:{
          where:{
            nick_name : $rootScope.currentUser.email
          }
        }
      })
      .$promise
      .then(function(registro) {
        $scope.registro = registro;
        $rootScope.registro = {
          nick_name : registro[0].nick_name,
          score : registro[0].score,
          state : registro[0].state
        }
       $scope.state_one = $rootScope.registro.state;
       console.log($scope.registro[0].nick_name);
       console.log($rootScope);
      });
/*-----------------------CONFIGURACIONES DEL SALON----------------------------------------*/

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];





   $scope.random = function() {
    var value = Math.floor((Math.random() * 100) + 1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    $scope.showWarning = (type === 'danger' || type === 'warning');

    $scope.dynamic = value;
    $scope.type = type;
  };
  $scope.random();

  $scope.randomStacked = function() {
    $scope.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
        var index = Math.floor((Math.random() * 4));
        $scope.stacked.push({
          value: Math.floor((Math.random() * 30) + 1),
          type: types[index]
        });
    }
  };
  $scope.randomStacked();

      }
  ])//cierra controller 





  .controller('TiendaController', ['$scope', 'AuthService', '$state','$rootScope',
      function($scope, AuthService, $state,$rootScope) {
        console.log($rootScope.registro);
        $scope.score = $rootScope.registro.score;
        $scope.p_unity = false;
        $scope.p_penelope = false;

        if($rootScope.registro.score > 1000){
          $scope.p_unity = true;
        }
        if($rootScope.registro.score > 2000){
          $scope.p_penelope = true;
        }
      }
  ])//cierra controller 
  .controller('AulaController', ['$scope', 'AuthService', '$state','$rootScope',
      function($scope, AuthService, $state,$rootScope) {
        console.log($rootScope.registro)

  }]);

});//cierra jquery