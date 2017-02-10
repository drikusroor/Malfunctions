module StoringenApp {
  "use strict";

  export interface IGebouw {
    gebouwId: number;
    adres: string;
    vhenr: string;
    BAG_lat: number;
    BAG_lon: number
  }

  export class GebouwenService {
    gebouwen: IGebouw[];

    static $inject = ['$http', '$state', '$q'];
    constructor(
      private $http,
      private $state,
      private $q
    )
    {
      this.gebouwen = [];
    }

    public getGebouwen = (callback):any => {
      var deferred = this.$q.defer();
      var that = this;
      this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/benko').then(function(response) {
        console.log(response);
        that.gebouwen = response.data;
        deferred.resolve(response.data);
      },
      function(errorResponse) {
        console.log(errorResponse);
        deferred.resolve([]);
      })
      return deferred.promise;
    }

    public getGebouwById = (id):any => {
      var deferred = this.$q.defer();
      var that = this;
      this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/' + id).then(function(response) {
        console.log(response);
        deferred.resolve(response.data);
      },
      function(errorResponse) {
        console.log(errorResponse);
        deferred.resolve({});
      })
      return deferred.promise;
    }

  }
  function service($http, $state, $q): GebouwenService {
    return new GebouwenService($http, $state, $q);
  }
  angular.module('StoringenApp').service('GebouwenService', service);
}
