angular.module('StoringenApp')
.directive('gebouwenTabel', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouwen': '=',
      'clickEvent': '&'
    },
    controller: function($scope, $timeout) {
      $scope.gebouwenShowLimit = 20;

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
    <form class="form-inline">
      <label class="sr-only" for="inlineFormInput">Zoeken:</label>
      <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Vul een zoekterm in" ng-model="delayedFilter" ng-change="setGebouwenFilter(delayedFilter)"/>
      <loading ng-show="gebouwenLoading"></loading>
    </form>
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
    <button type="button" class="btn btn-primary" ng-click="gebouwenShowLimit = gebouwenShowLimit + 20">Laat meer resultaten zien</button>
    `
  };
})
