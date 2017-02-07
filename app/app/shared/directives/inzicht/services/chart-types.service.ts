module StoringenApp {
  "use strict";

  export interface IChartType {
    chartType: string;
    icon: string;
    name: string;
  }

  export class chartTypes {
    chartTypes: IChartType[];

    static $inject = [];
    constructor()
    {
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
      ]
    }

    public getAll = (): IChartType[] => {
      return this.chartTypes;
    }

    public getByName = (name: string): IChartType => {
      var chartType: IChartType = this.chartTypes.find(c => c.name === name);
      return chartType;
    }

    public getByChartType = (chartTypeName: string): IChartType => {
      var chartType: IChartType = this.chartTypes.find(c => c.chartType === chartTypeName);
      return chartType;
    }

    public getByCalcType = (calcType: string): IChartType[] => {
      var result: IChartType[] = [this.getByChartType('Table')];

      if(calcType === 'COUNT') {
        result.push(this.getByChartType('PieChart'));
        result.push(this.getByChartType('BarChart'));
      }
      if(calcType === 'AVG') {

      }
      if(calcType === '' || calcType === null || calcType === undefined ) {

      }

      return result;
    }
  }
  function service(): chartTypes {
    return new chartTypes();
  }
  angular.module('StoringenApp').service('chartTypes', service);
}
