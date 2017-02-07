var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var LocationService = (function () {
        function LocationService($q, $window) {
            var _this = this;
            this.$q = $q;
            this.$window = $window;
            this.getCurrentPosition = function () {
                var deferred = _this.$q.defer();
                var that = _this;
                if (!_this.$window.navigator.geolocation) {
                    deferred.reject('Geolocation not supported.');
                }
                else {
                    _this.$window.navigator.geolocation.getCurrentPosition(function (position) {
                        that.currentLocation = position;
                        deferred.resolve(position);
                    }, function (err) {
                        deferred.reject(err);
                    });
                }
                return deferred.promise;
            };
            this.getCurrentPosition();
        }
        return LocationService;
    }());
    LocationService.$inject = ['$q', '$window'];
    StoringenApp.LocationService = LocationService;
    function service($q, $window) {
        return new LocationService($q, $window);
    }
    angular.module('StoringenApp').service('LocationService', service);
})(StoringenApp || (StoringenApp = {}));
