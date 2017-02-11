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
        <th>VHENR</th>
        <th>Adres</th>
      </tr>
      <tr ng-repeat="gebouw in gebouwen | filter: gebouwenFilter | limitTo: gebouwenShowLimit" ng-click="clickEvent({id: gebouw.gebouwId})">
        <td>{{gebouw.VHE_nr}}</td>
        <td>{{gebouw.BAG_adres}} {{gebouw.BAG_huisnummer}}, {{gebouw.BAG_postcode}}, {{gebouw.BAG_plaats}}</td>
      </tr>
    </table>
    <button type="button" class="btn btn-info float-right" ng-click="gebouwenShowLimit = gebouwenShowLimit + 20">Laat meer resultaten zien</button>
    `
  };
})
