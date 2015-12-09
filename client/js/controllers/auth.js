angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state','$rootScope','Registros',
      function($scope, AuthService, $state,$rootScope,Registros) {
    $scope.user = {
      email: '',
      password: ''
    };

    console.log("llamo al archivo con controladores")
    console.log($rootScope.currentUser)
    $scope.login = function() {
      console.log("llamo a login")
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {
          Registros
        .create({
          nick_name: $rootScope.currentUser.email,
          score: 0,
          state: 1
        })
        .$promise
        .then(function() {
          //$state.go('all-reviews');
          console.log("insertado");
          $state.go('salon');
        });
        });

    
    };
    $scope.register = function() {
       console.log("llamo a registro")
      AuthService.register($scope.user.email, $scope.user.password)
        .then(function() {
          $state.transitionTo('login');
        });
    };
  }])

  
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('login');
      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {
      email: 'baz@qux.com',
      password: 'bazqux'
    };

    
  }]);
