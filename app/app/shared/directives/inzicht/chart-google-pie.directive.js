angular.module('StoringenApp')
    .directive('chartGooglePieDirective', function ($compile) {
    'use strict';
    return {
        controller: function ($scope, jsonToArray, buildChart, NULL_REPLACER, stripData) {
            function cleanDataForGoogleAndVision(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][0] === null || data[i][0] === '')
                        data[i][0] = NULL_REPLACER;
                }
                for (var i = 0; data.length > i; i++) {
                    data[i][0] = String(data[i][0]);
                }
                return data;
            }
            function newCalculator() {
                var selectParams = $scope.config.SelectParams;
                var headers = $scope.config.dataset.headers;
                var total = $scope.config.dataset.total;
                if (selectParams[1].CalcType === 'COUNT') {
                    var viewDataTotal = $scope.config.dataset.viewDataTotal;
                    var restDataTotal = $scope.config.dataset.restDataTotal;
                    var viewRestDataTotal = [viewDataTotal, restDataTotal];
                    var canBeSeenData = $scope.aggregateData(viewRestDataTotal, selectParams, "Zichtbaar");
                }
                else {
                    var viewData = $scope.config.dataset.viewData;
                    var restData = $scope.config.dataset.restData;
                    var viewRestData = viewData.concat(restData);
                    var canBeSeenData = $scope.aggregateData(viewRestData, selectParams, "Zichtbaar");
                }
                var cannotBeSeenData = ["Niet zichtbaar"];
                for (var i = 1; i < total.length; i++) {
                    var column = total[i] - canBeSeenData[i];
                    cannotBeSeenData.push(column);
                }
                var combiData = [canBeSeenData, cannotBeSeenData];
                combiData.unshift(headers);
                return combiData;
            }
            function drawChart() {
                var combiData = newCalculator();
                console.log(combiData);
                $scope.altChartData = buildChart(combiData, 'PieChart', $scope.columns, $scope.options);
            }
            $scope.$on('chart: rendered', function () {
                drawChart();
            });
        },
        template: "\n    <div\n      class=\"google-chart\" id=\"google-chart\"\n      style=\"height: 100px; width: 250px;\"\n      google-chart chart=\"altChartData\"\n      agc-on-select=\"incrementAmountResults(-10)\"\n    >\n    </div>\n    "
    };
});
