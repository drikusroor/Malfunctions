angular.module('StoringenApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('portal', {
      url: '/',
      controller: 'StoringenCtrl',
      controllerAs: 'storingen',
      views: {
        'header@': {
          templateUrl: 'app/shared/header/header.html'
        },
        'content@': {
          templateUrl: 'app/components/front/front.html',
        }
      },
      resolve: {

      }
    })
    .state('portal.meldingen', {
        url: 'meldingen',
        views: {
          'content@': {
            templateUrl: 'app/components/meldingen/meldingen.html',
            // controller: 'LoginCtrl',
            // controllerAs: 'loginctrl'
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
            // controller: 'LoginCtrl',
            // controllerAs: 'loginctrl'
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
