angular.module('StoringenApp')
.directive('gebouwenTabel', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouwen': '=',
      'clickEvent': '&',
      'gebouwenFilter': '='
    },
    controller: function($scope, $timeout) {
      $scope.gebouwenShowLimit = 20;

      $scope.selectGebouw = function(gebouw) {
        console.log("selecting gebouw: ", gebouw);
        $scope.selectedGebouw = gebouw;
      }

      $scope.$watch('gebouwenFilter', function() {
        console.log($scope.gebouwenFilter)
      })

      $scope.setGebouwenFilter = function(filter) {
        $scope.gebouwenLoading = true;
        $timeout(function() {
          $scope.gebouwenFilter = filter;
          $scope.gebouwenLoading = false;
        }, 500)
      }

    },
    link: function($scope) {

    },
    template: `
    <br>
    <table class="table">
      <tr>
        <th>Adres</th>
      </tr>
      <tr ng-repeat="gebouw in gebouwen | filter: gebouwenFilter | limitTo: gebouwenShowLimit" ng-click="selectGebouw(gebouw)" class="gebouwenlist">
        <td>{{gebouw.BAG_adres}}
          <p class="btn-details">
            <a type="button" ng-show="selectedGebouw.BAG_VerblijfsobjectID == gebouw.BAG_VerblijfsobjectID" ui-sref="portal.gebouwen.detail({id: selectedGebouw.BAG_VerblijfsobjectID})">
              Ga naar details
              <span class="glyphicon glyphicon-menu-right"></span><span class="col-50">
            </a>
          </p>
        </td>
      </tr>
    </table>
    <button type="button" ng-show="gebouwenShowLimit < gebouwen.length" class="btn btn-info" ng-click="gebouwenShowLimit = gebouwenShowLimit + 20">Laat meer resultaten zien</button>
    <div class="row" ng-show="selectedGebouw">
      <div class="col-xs-12">
      <br>
      </div>
    </div>
    `
  };
})
