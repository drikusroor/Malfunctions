angular.module('StoringenApp')
.directive('loading', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'center': '=center'
    },
    controller: function($scope) {
      if($scope.center) {
        $scope.marginStyle = {'margin': 'auto'};
      } else {
        $scope.marginStyle = {};
      }
    },
    link: function($scope) {

    },
    template: `      
      <div ng-style="marginStyle" style="width: 25px; margin-top: 10px; margin-bottom: 10px;">
        <img ng-src="assets/images/loading.svg" style="width: 100%" />
      </div>
    `
  };
})
