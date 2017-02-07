angular.module('StoringenApp')
.directive('chartJsDirective', function() {
  'use strict';
  return {
    controller: function($scope, FilterService, pivotTable, jsonToArray, NULL_REPLACER) {

      // $scope.chartJsOptions = {
      //   scales: {
      //       rAxes: [{
      //           type: 'logarithmic',
      //           position: 'bottom',
      //           ticks: {
      //               min: 1,
      //               max: 1000
      //           }
      //       }],
      //       xAxes: [{
      //           display: true
      //       }],
      //       yAxes: [{
      //           display: true
      //       }]
      //   }
      // }

      function stripToChartJS(data) {
        var labels = [],
            series = [],
            actor,
            chartData = [];
        data = jsonToArray(data);
        // Nullwaardes van eerste kolom opheffen:
        for (var i = 0; i < data.length; i++) {
          if(data[i][0] === null || data[i][0] === '') data[i][0] = NULL_REPLACER;
        }
        labels = data[0]; // dit zijn de labels
        actor = labels[0]; // dit is om wie of wat het gaat. de "per dit"
        labels.splice(0, 1); // haal de actor uit labels
        data = data.splice(1, data.length - 1);
        for (var i = 0; data[0].length > i; i++ ) {
          chartData.push([]);
        }
        var chartDataLength = chartData.length;
        for (var p = 0; data.length > p; p++ ) {
          for (var v = 0; chartDataLength > v; v++ ) {
            chartData[v].push(data[p][v]);
          }
        }
        series = chartData[0]; // dit zijn de series
        chartData = chartData.splice(1, chartDataLength - 1);
        var total = {
          labels: labels,
          series: series,
          actor: actor,
          chartData: chartData
        }
        return total;
      }

      function isCt(ct) {
        if ($scope.chartType === ct) {
          return true;
        } else {
          return false;
        }
      }

      function toBubble(total) {
        var newData = [];
        for (var i = 0; total.chartData[0].length > i; i++) {
          newData.push({
            x: total.chartData[0][i],
            y: total.chartData[1][i],
            r: total.chartData[2][i]
          })
        }
        total.chartData = newData;
        return total;
      }

      $scope.updateChart = function(data) {
        var ct = $scope.getChartType();
        var total = stripToChartJS(data);

        if(ct === 'bubble') {
          total = toBubble(total);
        }

        if(isCt('line') || isCt('bar')) {

          // Geen trend in de lijn bij een linechart voor elke serie
          $scope.datasetOverride = []
          for (var i=0; i < total.chartData.length; i++) {
            var override = {
              lineTension: 0,
              // label: total.labels[i]
              // steppedLine: true Deze maakt er meer een staafgrafiek van
            }
            $scope.datasetOverride.push(override)
            console.log(override);
          }

        }

        if(ct === 'radar') {
          total.chartData = pivotTable(total.chartData);
          var newLabels = total.series;
          total.series = total.labels;
          total.labels = newLabels;
        }

        $scope.chartData = total.chartData;
        $scope.series = total.labels;
        $scope.labels = total.series;
        // console.log(total);
      }

      $scope.$on('filter: updated', function() {
        $scope.getData(function(response) {
          $scope.updateChart(response);
        });
      });

      $scope.$on('chartType: updated', function() {
        if ($scope.data !== undefined) {
          $scope.updateChart($scope.data);
        }
      });

      $scope.onClick = function (points, evt) {
        var dsIndex = points[0]._datasetIndex;
        var index = points[0]._index;

        var filterKey = $scope.config.FilterKey;
        var filterKeyType: string = typeof(filterKey);

        if (filterKeyType === "object") {
          var propertyKey = filterKey.PropertyKey;
          var operator = filterKey.Operator;
          var propertyValue = $scope.labels[index];
          if(filterKey.Operator === undefined || filterKey.Operator === null || filterKey.Operator === '') operator = '=';
          FilterService.setFilterProperty(propertyKey, propertyValue, operator);
        } else {
          FilterService.setFilterProperty(filterKey, $scope.labels[index]);
        }
        console.log($scope.labels[index]);
      };

      // INIT
      $scope.getData(function(response) {
        $scope.updateChart(response);
        $scope.setLoading(false);
      });
    },
    template: `
      <canvas id="base"
        chart-click="onClick"
        ng-if="chartData"
        chart-options="chartJsOptions"
        chart-dataset-override="datasetOverride"
        class="chart chart-base"
        chart-data="chartData"
        chart-labels="labels"
        chart-series="series"
        chart-type="chartType"
        chart-click="onClick"
        chart-colors="chartColors"
      >
      </canvas>
    `
  };
})
