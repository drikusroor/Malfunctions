module StoringenApp {
  "use strict";

  export interface IGebouw {
    gebouwId: number;
    adres: string;
    vhenr: string;
    latitude: number;
    longitude: number
  }

  export class LocationService {
    currentLocation: any;

    static $inject = ['$q', '$window'];
    constructor(
      private $q,
      private $window
    )
    {
      this.getCurrentPosition();
    }

    public getCurrentPosition = ():any => {
        var deferred = this.$q.defer();
        var that = this;

        if (!this.$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            this.$window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    that.currentLocation = position;
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

  }
  function service($q, $window): LocationService {
    return new LocationService($q, $window);
  }
  angular.module('StoringenApp').service('LocationService', service);
}
