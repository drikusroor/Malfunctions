angular.module('StoringenApp')
    .directive('chartGoogleDirective', function ($compile) {
    'use strict';
    return {
        controller: function ($scope, $element, $injector, buildChart, FilterService, pivotTable, jsonToArray, NULL_REPLACER, stripData) {
            function isCrap(value) {
                if (value === undefined || value === null || value === '')
                    return true;
                return false;
            }
            $scope.selectItem = function (item) {
                console.log(item);
                var filterKey = item.type;
                var propertyKey;
                var propertyValue;
                var operator;
                var filterKeyType = typeof (filterKey);
                if (filterKeyType === "object") {
                    propertyKey = filterKey.PropertyKey;
                    operator = filterKey.operator;
                    if (isCrap(operator))
                        operator = '=';
                }
                else {
                    propertyKey = filterKey;
                    operator = '=';
                }
                var FilterKeyIndex;
                if (item.selectedItem !== undefined) {
                    if (propertyKey !== undefined) {
                        for (var i = 0; i < item.data[0].length; i++) {
                            if (item.data[0][i].toLowerCase() === propertyKey.toLowerCase()) {
                                FilterKeyIndex = i;
                            }
                        }
                        if (FilterKeyIndex === undefined || FilterKeyIndex === null) {
                            FilterKeyIndex = 0;
                        }
                        var selectedItem = item.selectedItem, row = selectedItem.row + 1, column = selectedItem.column, propertyValue = item.data[row][FilterKeyIndex], restValue = item.data[row][0];
                        if (propertyValue === "Rest" || restValue === "Rest") {
                            $scope.incrementAmountResults(10);
                        }
                        else if (propertyValue === "Totaal") {
                        }
                        else {
                            FilterService.setFilterProperty(propertyKey, propertyValue, operator);
                        }
                    }
                }
                else {
                    if (item.type !== undefined) {
                        FilterService.unsetFilterProperty(propertyKey);
                    }
                    else {
                        FilterService.setFilter({});
                    }
                }
            };
            function cleanDataForGoogle(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][0] === null || data[i][0] === '')
                        data[i][0] = NULL_REPLACER;
                }
                for (var i = 0; data.length > i; i++) {
                    data[i][0] = String(data[i][0]);
                }
                return data;
            }
            $scope.updateChart = function (data) {
                var chartType = $scope.getChartType();
                if (chartType === 'SuperPie')
                    chartType = 'PieChart';
                var queryData = jsonToArray(data);
                queryData = cleanDataForGoogle(queryData);
                var selectParams = $scope.config.SelectParams;
                var amountResults = $scope.config.AmountResults;
                if (amountResults === 0 || amountResults === undefined || amountResults === null)
                    amountResults = 10;
                var headersAndData = queryData;
                var headers = queryData[0];
                var dataAll = queryData.slice(1, queryData.length);
                $scope.config.headers = headers;
                var viewData = $scope.getViewData(dataAll, amountResults, chartType);
                var viewDataTotal = $scope.aggregateData(viewData, selectParams, "Totaal selectie");
                var restData = $scope.getRestData(dataAll, amountResults, chartType, selectParams);
                var restDataTotal = $scope.aggregateData(restData, selectParams, "Rest");
                var total = $scope.aggregateData(dataAll, selectParams, "Totaal");
                $scope.config.dataset = {
                    headers: headers,
                    dataAll: dataAll,
                    viewData: viewData,
                    viewDataTotal: viewDataTotal,
                    restData: restData,
                    restDataTotal: restDataTotal,
                    total: total
                };
                var primaryChartData = [];
                primaryChartData.push(headers);
                primaryChartData = primaryChartData.concat(viewData);
                if (restDataTotal[1] > 0)
                    primaryChartData.push(restDataTotal);
                if (chartType === "Table")
                    primaryChartData.push(total);
                $scope.chartData = buildChart(primaryChartData, chartType, $scope.columns, $scope.options);
                $scope.setLoading(false);
                $scope.$broadcast('chart: rendered');
            };
            $scope.$on('filter: updated', function () {
                $scope.getData(function (response) {
                    $scope.updateChart(response);
                });
            });
            $scope.$on('chartType: updated', function () {
                if ($scope.data !== undefined) {
                    $scope.updateChart($scope.data);
                }
            });
            $scope.getData(function (response) {
                $scope.updateChart(response);
            });
        },
        template: "\n    <chart-google-pie-directive ng-if=\"chartType !== 'Table'\"></chart-google-pie-directive>\n    <div class=\"google-chart\" ng-class=\"{'has-pie': chartType !== 'Table'}\" id=\"google-chart\" google-chart agc-on-select=\"selectItem({type: filterKey, selectedItem: selectedItem, data: chartData.data})\" chart=\"chartData\">\n    </div>\n    "
    };
});
