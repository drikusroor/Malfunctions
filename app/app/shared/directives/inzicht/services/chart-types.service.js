var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var chartTypes = (function () {
        function chartTypes() {
            var _this = this;
            this.getAll = function () {
                return _this.chartTypes;
            };
            this.getByName = function (name) {
                var chartType = _this.chartTypes.find(function (c) { return c.name === name; });
                return chartType;
            };
            this.getByChartType = function (chartTypeName) {
                var chartType = _this.chartTypes.find(function (c) { return c.chartType === chartTypeName; });
                return chartType;
            };
            this.getByCalcType = function (calcType) {
                var result = [_this.getByChartType('Table')];
                if (calcType === 'COUNT') {
                    result.push(_this.getByChartType('PieChart'));
                    result.push(_this.getByChartType('BarChart'));
                }
                if (calcType === 'AVG') {
                }
                if (calcType === '' || calcType === null || calcType === undefined) {
                }
                return result;
            };
            this.chartTypes = [
                {
                    chartType: "Table",
                    icon: "Tabel.png",
                    name: "Tabel"
                },
                {
                    chartType: "SuperPie",
                    icon: "grafiektaart.png",
                    name: "Taartdiagram"
                },
                {
                    chartType: "PieChart",
                    icon: "grafiektaart.png",
                    name: "Taartdiagram"
                },
                {
                    chartType: "BarChart",
                    icon: "grafiekstaaf.png",
                    name: "Staafdiagram"
                },
                {
                    chartType: "line",
                    icon: "grafieklijn.png",
                    name: "Lijndiagram"
                }, {
                    chartType: "bubble",
                    icon: "grafieklijn.png",
                    name: "Bubbeldiagram"
                }, {
                    chartType: "radar",
                    icon: "grafiektaart.png",
                    name: "Radardiagram"
                },
            ];
        }
        return chartTypes;
    }());
    chartTypes.$inject = [];
    StoringenApp.chartTypes = chartTypes;
    function service() {
        return new chartTypes();
    }
    angular.module('StoringenApp').service('chartTypes', service);
})(StoringenApp || (StoringenApp = {}));
