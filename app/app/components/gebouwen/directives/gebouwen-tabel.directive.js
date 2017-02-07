angular.module('StoringenApp')
    .directive('gebouwenTabel', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebouwen': '=gebouwen',
            'clickEvent': '=clickEvent'
        },
        controller: function ($scope) {
        },
        link: function ($scope) {
        },
        template: "\n      <table>\n        <tr>\n          <th>GebouwID</th>\n          <th>Adres</th>\n        </tr>\n        <tr ng-repeat=\"gebouw in gebouwen\" ng-click=\"clickEvent(gebouw.gebouwId)\">\n          <td>{{gebouw.gebouwId}}</td>\n          <td>{{gebouw.adres}}</td>\n        </tr>\n      </table>\n    "
    };
});
