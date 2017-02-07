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
    controller: function($scope) {

    },
    link: function($scope) {

    },
    template: `
      <table>
        <tr>
          <th>GebouwID</th>
          <th>Adres</th>
        </tr>
          <tr ng-repeat="gebouw in gebouwen" ng-click="clickEvent({id: gebouw.gebouwId})">
          <td>{{gebouw.gebouwId}}</td>
          <td>{{gebouw.adres}}</td>
        </tr>
      </table>
    `
  };
})
