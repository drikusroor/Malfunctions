angular.module('StoringenApp')
    .directive('inzicht', function ($compile, $injector) {
    return {
        transclude: false,
        scope: {
            config: '=',
        },
        controller: function ($scope, $element, FilterService, GenericProvider, chartTypes) {
            $scope.title = $scope.config.title;
            $scope.filterKey = $scope.config.FilterKey;
            $scope.filterKeyActive = FilterService.isPropertyKeyActive($scope.filterKey);
            $scope.FilterService = FilterService;
            $scope.chartType = $scope.config.ChartType;
            $scope.defaultChartType = $scope.config.ChartType;
            $scope.options = $scope.config.options;
            $scope.libraryType = $scope.config.libraryType;
            $scope.config.transparent = true;
            $scope.columns = $scope.config.columns;
            if ($scope.chartType === undefined || $scope.chartType === null) {
                $scope.chartType = "Table";
            }
            $scope.loading = true;
            $scope.setLoading = function (loading) {
                $scope.loading = loading;
            };
            $scope.chartTypes = [
                {
                    chartType: "Table",
                    icon: "Tabel.png",
                    name: "Tabel"
                }
            ];
            $scope.chartTypes = chartTypes.getByCalcType($scope.config.SelectParams[1].CalcType);
            $scope.isChartJs = function (chartType) {
                switch (chartType) {
                    case 'pie':
                        return true;
                    case 'polarArea':
                        return true;
                    case 'line':
                        return true;
                    case 'bubble':
                        return true;
                    case 'radar':
                        return true;
                    case 'bar':
                        return true;
                    default:
                        return false;
                }
            };
            $scope.isGoogleChart = function (chartType) {
                switch (chartType) {
                    case 'SuperPie':
                        return true;
                    case 'PieChart':
                        return true;
                    case 'BarChart':
                        return true;
                    case 'Table':
                        return true;
                    default:
                        return false;
                }
            };
            $scope.getData = function (callback) {
                var filter = FilterService.getFilter();
                GenericProvider(filter, $scope.config, function (response) {
                    $scope.data = response;
                    callback(response);
                });
            };
            $scope.getAmountResults = function () {
                var amountResults = $scope.config.AmountResults;
                if (amountResults === undefined || amountResults === null) {
                    amountResults = 5;
                }
                return amountResults;
            };
            $scope.incrementAmountResults = function (amount) {
                if ($scope.config.AmountResults === null || $scope.config.AmountResults === undefined) {
                    $scope.config.AmountResults = 10;
                }
                if (amount === undefined || amount === null || amount === 0)
                    amount = 10;
                $scope.config.AmountResults += amount;
                $scope.$broadcast('filter: updated');
            };
            function aggregateCells(cells, calcType) {
                var sum = 0, result;
                if (calcType === 'COUNT') {
                    for (var i = 0; i < cells.length; i++) {
                        sum = sum + cells[i];
                        result = sum;
                    }
                }
                else if (calcType === 'AVG') {
                    for (var i = 0; i < cells.length; i++) {
                        sum = sum + cells[i];
                        result = sum;
                    }
                    result = sum / cells.length;
                    result = Math.round(result * 10) / 10;
                }
                else {
                    result = cells.length;
                }
                return result;
            }
            function aggregateData(data, selectParams, header) {
                if (header === void 0) { header = "Rest"; }
                if (data === undefined || data === null || data.length < 1) {
                    var result = ["Rest"];
                    for (var i = 1; i < selectParams.length; i++) {
                        result.push(0);
                    }
                    return result;
                }
                var aggregateDataResult = [header];
                for (var c = 1; c < data[0].length; c++) {
                    var columnArray = [];
                    for (var i = 0; i < data.length; i++) {
                        columnArray.push(data[i][c]);
                    }
                    var aggregate = aggregateCells(columnArray, selectParams[c].CalcType);
                    aggregateDataResult.push(aggregate);
                }
                if (aggregateDataResult[1] < 0 || aggregateDataResult[2] < 0)
                    console.log(aggregateDataResult);
                return aggregateDataResult;
            }
            $scope.aggregateData = aggregateData;
            function getViewData(data, amountResults, chartType) {
                if (amountResults >= data.length + 1)
                    return data;
                if ((chartType === "PieChart" || chartType === "BarChart" && amountResults > 10)) {
                    var viewData = data.slice(amountResults - 10, data.length);
                    viewData = viewData.slice(0, 10);
                }
                else {
                    var viewData = data.slice(0, amountResults);
                }
                return viewData;
            }
            $scope.getViewData = getViewData;
            function getRestData(data, amountResults, chartType, selectParams) {
                if ((chartType === "PieChart" || chartType === "BarChart" && amountResults > 10)) {
                    var restData = data.slice(amountResults, data.length);
                }
                else {
                    var restData = data.slice(amountResults, data.length);
                }
                return restData;
            }
            $scope.getRestData = getRestData;
            function getRestDataTotal(data, amountResults, chartType, selectParams) {
                var restData = getRestData(data, amountResults, chartType, selectParams);
                var restTotal = $scope.aggregateData(restData, selectParams, "Rest");
                return restTotal;
            }
            $scope.getRestDataTotal = getRestDataTotal;
            $scope.setChart = function (chartType) {
                console.log(chartType);
                $scope.chartType = chartType;
                if ($scope.chartData != undefined) {
                    $scope.chartType = chartType;
                    $scope.chartData.type = chartType;
                }
                $scope.$broadcast('chartType: updated');
            };
            $scope.getChartType = function () {
                return $scope.chartType;
            };
            $scope.setZelfFilter = function (zf) {
                console.log("Zelf filter is: ", zf);
                $scope.config.zelfFilter = zf;
                $scope.$broadcast('filter: updated');
            };
            $scope.getZelfFilter = function () {
                if ($scope.config.zelfFilter === undefined) {
                    return false;
                }
                else {
                    return $scope.config.zelfFilter;
                }
            };
            $scope.$on('filter: updated', function () {
                $scope.filterKeyActive = FilterService.isPropertyKeyActive($scope.filterKey);
            });
        },
        link: function (scope, element, controller) { },
        template: "\n      <div class=\"content\">\n        <div class=\"options-container\" ng-mouseleave=\"config.transparent = true\" ng-mouseenter=\"config.transparent = false\" ng-class=\"{transparent: config.transparent}\">\n\n          <!--// set chart knop-->\n          <!-- Single button -->\n          <div class=\"btn-group btn-group-xs\" style=\"margin: 4px;\" uib-dropdown is-open=\"status.isopen\">\n            <button id=\"single-button\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n              Weergaves <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n              <li ng-repeat=\"weergave in chartTypes\" ng-click=\"setChart(weergave.chartType)\" class=\"weergave\" style=\"background-size: cover;\">\n                <img style=\"width: 32px; height: auto\" ng-src=\"assets/images/{{weergave.icon}}\"/>\n                {{weergave.name}}\n              </li>\n            </ul>\n          </div>\n\n          <div style=\"margin: 4px;\" class=\"btn-group btn-group-xs pull-right\">\n            <button\n              ng-click=\"incrementAmountResults(10)\"\n              uib-tooltip=\"Meer resultaten laden\"\n              tooltip-placement=\"bottom\"\n              tooltip-trigger=\"'mouseenter'\"\n              class=\"btn btn-default aria-hidden\"\n              >\n                Meer resultaten\n                <span class=\"glyphicon glyphicon-plus\"></span>\n              </button>\n            <button\n              ng-click=\"incrementAmountResults(-10)\"\n              uib-tooltip=\"Minder resultaten laden\"\n              tooltip-placement=\"bottom\"\n              tooltip-trigger=\"'mouseenter'\"\n              class=\"btn btn-default aria-hidden\"\n              ng-show=\"config.AmountResults > 10\"\n              >\n                Minder resultaten\n                <span class=\"glyphicon glyphicon-minus\"></span>\n              </button>\n            <button ng-if=\"filterKeyActive\" ng-click=\"FilterService.unsetFilterPropertyKey(config.FilterKey)\" class=\"btn btn-danger\" aria-hidden=\"false\">Verwijder filter <span class=\"glyphicon glyphicon-trash\"></span></button>\n          </div>\n\n        </div>\n\n        <div class=\"row-vision\">  <!--// row start-->\n          <div class=\"loading\" ng-if=\"loading === true\"><img src=\"assets/images/loading.gif\"></div>\n          <chart-google-directive ng-if=\"isGoogleChart(chartType)\"></chart-google-directive>\n          <chart-js-directive ng-if=\"isChartJs(chartType)\" ng-init=\"setProperty()\"></chart-js-directive>\n          <div class=\"kinderen\">\n            <div class=\"kind\" ng-repeat=\"kind in kinderen\" ng-click=\"addInzicht(kind)\" style=\"background-size: cover; background-image: url(assets/images/{{kind.icon}})\"></div>\n          </div>\n        </div>\n\n      </div> <!--// content-->\n    "
    };
});
