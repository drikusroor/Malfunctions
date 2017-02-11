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
            $scope.selectGebouw = function (gebouw) {
                console.log("selecting gebouw: ", gebouw);
                $scope.selectedGebouw = gebouw;
            };
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
        template: "\n    <br>\n    <table class=\"table\">\n      <tr>\n        <th>Adres</th>\n      </tr>\n      <tr ng-repeat=\"gebouw in gebouwen | filter: gebouwenFilter | limitTo: gebouwenShowLimit\" ng-click=\"selectGebouw(gebouw)\">\n        <td>{{gebouw.BAG_adres}}</td>\n      </tr>\n    </table>\n    <button type=\"button\" ng-show=\"gebouwenShowLimit < gebouwen.length\" class=\"btn btn-info float-right\" ng-click=\"gebouwenShowLimit = gebouwenShowLimit + 20\">Laat meer resultaten zien</button>\n    <div class=\"row\" ng-show=\"selectedGebouw\">\n      <div class=\"col-xs-12\">\n      <br>\n        <a type=\"button\" class=\" btn btn-info pull-right\" ui-sref=\"portal.gebouwen.detail({id: selectedGebouw.BAG_VerblijfsobjectID})\">\n          Ga naar details {{selectedGebouw.BAG_adres}}\n          <span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"col-50\">\n        </a>\n      </div>\n    </div>\n    "
    };
});
