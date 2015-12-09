angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'index.html'
      })
    .state('aula', {
        url: '/aula',
        templateUrl: 'views/aula.html',
        controller: 'AulaController'
      })
    .state('salon', {
        url: '/salon',
        templateUrl: 'views/salon.html',
        controller: 'SalonController',
        authenticate: true
      })
    .state('tienda', {
        url: '/salon',
        templateUrl: 'views/tienda.html',
        controller: 'TiendaController'
      })
      .state('add-review', {
        url: '/add-review',
        templateUrl: 'views/review-form.html',
        controller: 'AddReviewController',
        authenticate: false
      })
      .state('all-reviews', {
        url: '/all-reviews',
        templateUrl: 'views/all-reviews.html',
        controller: 'AllReviewsController'
      })
      .state('edit-review', {
        url: '/edit-review/:id',
        templateUrl: 'views/review-form.html',
        controller: 'EditReviewController',
        authenticate: true
      })
      .state('delete-review', {
        url: '/delete-review/:id',
        controller: 'DeleteReviewController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-reviews', {
        url: '/my-reviews',
        templateUrl: 'views/my-reviews.html',
        controller: 'MyReviewsController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'AuthLoginController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('salon');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
      }
    });
  }]);
