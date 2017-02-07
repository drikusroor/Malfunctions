module StoringenApp {
  "use strict";

  export interface IGebouw {
    gebouwId: number;
    adres: string;
    vhenr: string;
    latitude: number;
    longitude: number
  }

  export class GebouwenService {
    gebouwen: IGebouw[];

    static $inject = ['$http', '$state', 'GEBOUWEN'];
    constructor(
      private $http,
      private $state,
      private GEBOUWEN
    )
    {
      this.gebouwen = GEBOUWEN;
    }

    public addGebouw = (gebouw: IGebouw):void => {
      this.gebouwen.push(gebouw);
    }

    public getGebouwen = ():IGebouw[] => {
      return this.gebouwen;
    }

  }
  function service($http, $state, GEBOUWEN): GebouwenService {
    return new GebouwenService($http, $state, GEBOUWEN);
  }
  angular.module('StoringenApp').service('GebouwenService', service);
}
