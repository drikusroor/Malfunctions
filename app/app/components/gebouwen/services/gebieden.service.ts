module StoringenApp {
  "use strict";

  export interface IGebied {
    Gebied2: number;
    maxlat: number;
    maxlon: number;
    minlat: number;
    minlon: number
  }

  export class GebiedenService {
    gebieden: IGebouw[];

    static $inject = ['$http', '$state', '$q'];
    constructor(
      private $http,
      private $state,
      private $q
    )
    {
      this.gebieden = [];
    }

    public getGebieden = (callback):any => {
      var deferred = this.$q.defer();
      var that = this;
      this.$http.get('https://development.prognotice.nl/storingen/api/api/gebieden').then(function(response) {
        console.log(response);
        that.gebieden = response.data;
        deferred.resolve(response.data);
      },
      function(errorResponse) {
        console.log(errorResponse);
        deferred.resolve([]);
      })
      return deferred.promise;
    }

  }
  function service($http, $state, $q): GebiedenService {
    return new GebiedenService($http, $state, $q);
  }
  angular.module('StoringenApp').service('GebiedenService', service);
}
