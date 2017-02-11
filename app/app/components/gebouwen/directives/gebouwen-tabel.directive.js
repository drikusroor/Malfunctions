angular.module('StoringenApp')
    .directive('gebouwenTabel', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebouwen': '=',
            'clickEvent': '&',
            'gebouwenFilter': '='
        },
        controller: function ($scope, $timeout) {
            $scope.gebouwenShowLimit = 20;
            $scope.$watch('gebouwenFilter', function () {
                console.log($scope.gebouwenFilter);
            });
            $scope.setGebouwenFilter = function (filter) {
                $scope.gebouwenLoading = true;
                $timeout(function () {
                    $scope.gebouwenFilter = filter;
                    $scope.gebouwenLoading = false;
                }, 500);
            };
        },
        link: function ($scope) {
        },
        template: "\n    <br>\n    <table class=\"table\">\n      <tr>\n        <th>Adres</th>\n      </tr>\n      <tr ng-repeat=\"gebouw in gebouwen | filter: gebouwenFilter | limitTo: gebouwenShowLimit\" ng-click=\"clickEvent({id: gebouw.gebouwId})\" class=\"table-row\">\n        <td>{{gebouw.BAG_adres}}</td>\n      </tr>\n    </table>\n    <button type=\"button\" class=\"btn btn-info\" ng-click=\"gebouwenShowLimit = gebouwenShowLimit + 20\">Laat meer resultaten zien</button>\n    "
    };
});
