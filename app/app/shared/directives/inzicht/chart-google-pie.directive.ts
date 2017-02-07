angular.module('StoringenApp')
.directive('chartGooglePieDirective', function($compile) {
  'use strict';
  return {
    controller: function($scope, jsonToArray, buildChart, NULL_REPLACER, stripData) {

      // Stringifyen van labels en nulls replacen
      function cleanDataForGoogleAndVision(data) {
        // Nullwaardes van eerste kolom opheffen:
        for (var i = 0; i < data.length; i++) {
          if(data[i][0] === null || data[i][0] === '') data[i][0] = NULL_REPLACER;
        }

        // Alle eerste kolommen moeten strings zijn van google
        for (var i = 0; data.length > i; i++) {
          data[i][0] = String(data[i][0]);
        }
        return data;
      }

      function newCalculator() {
        var selectParams = $scope.config.SelectParams;
        var headers = $scope.config.dataset.headers;
        var total = $scope.config.dataset.total;


        if(selectParams[1].CalcType === 'COUNT') {
          var viewDataTotal = $scope.config.dataset.viewDataTotal;
          var restDataTotal = $scope.config.dataset.restDataTotal;
          var viewRestDataTotal = [viewDataTotal, restDataTotal];
          var canBeSeenData = $scope.aggregateData(viewRestDataTotal, selectParams, "Zichtbaar");
        } else {
          var viewData = $scope.config.dataset.viewData;
          var restData = $scope.config.dataset.restData;
          var viewRestData = viewData.concat(restData);
          var canBeSeenData = $scope.aggregateData(viewRestData, selectParams, "Zichtbaar");
        }

        var cannotBeSeenData: any = ["Niet zichtbaar"];
        for(var i = 1; i < total.length; i++) {
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

        // do the chartdata so the chart will render
        $scope.altChartData = buildChart(combiData, 'PieChart', $scope.columns, $scope.options);
      }

      // init
      // drawChart();

      $scope.$on('chart: rendered', function() {
        drawChart();
      });

    },
    template:`
    <div
      class="google-chart" id="google-chart"
      style="height: 100px; width: 250px;"
      google-chart chart="altChartData"
      agc-on-select="incrementAmountResults(-10)"
    >
    </div>
    `

  };
  });
