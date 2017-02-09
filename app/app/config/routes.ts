angular.module('StoringenApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/gebouwen');

  $stateProvider
    .state('portal', {
      url: '/',
      controller: 'StoringenCtrl',
      controllerAs: 'storingenctrl',
      views: {
        'header@': {
          templateUrl: 'app/shared/header/header.html'
        },
        'content@': {
          templateUrl: 'app/components/gebouwen/gebouwen.html',
          controller: 'GebouwenCtrl',
          controllerAs: 'gebouwenctrl'
        }
      },
      resolve: {

      }
    })
    .state('portal.gebouwen', {
        url: 'gebouwen',
        views: {
          'content@': {
            templateUrl: 'app/components/gebouwen/gebouwen.html',
            controller: 'GebouwenCtrl',
            controllerAs: 'gebouwenctrl'
          }
        },
        resolve: {

        }
    })
    .state('portal.gebouwen.detail', {
        url: '/:id',
        views: {
          'content@': {
            templateUrl: 'app/components/gebouwen-detail/gebouwen-detail.html',
            controller: 'GebouwenDetailCtrl',
            controllerAs: 'gebouwendetailctrl'
          }
        },
        resolve: {

        }
    })
    .state('portal.gebouwen.detail.status', {
      url: '/status',
      views: {
        'content@': {
          templateUrl: 'app/components/status/status.html',
          controller: 'StatusCtrl',
          controllerAs: 'statusctrl'
        }
      },
      resolve: {

      }
    })

    .state('portal.gebouwen.detail.status.meldingen', {
      url: '/meldingen/:meldingId',
      views: {
        'content@': {
          templateUrl: 'app/components/meldingen/meldingen.html',
          controller: 'MeldingenCtrl',
          controllerAs: 'meldingenctrl'
        }
      },
      resolve: {

      }
    })

    .state('portal.admin.datasourceManagement.detail', {
      url:'/:id',
      views: {
        'content@': {
          templateUrl: 'app/components/datasource-management/detail/datasource-detail.html',
          // controller: 'DatasourceDetailManagementCtrl',
          // controllerAs: 'datasourcedetailctrl'
        }
      }
    })
}])
