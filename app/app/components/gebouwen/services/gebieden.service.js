var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebiedenService = (function () {
        function GebiedenService($http, $state, $q) {
            var _this = this;
            this.$http = $http;
            this.$state = $state;
            this.$q = $q;
            this.getGebieden = function (callback) {
                var deferred = _this.$q.defer();
                var that = _this;
                _this.$http.get('https://development.prognotice.nl/storingen/api/api/rayons').then(function (response) {
                    console.log(response);
                    that.gebieden = response.data;
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.resolve([]);
                });
                return deferred.promise;
            };
            this.gebieden = [];
        }
        return GebiedenService;
    }());
    GebiedenService.$inject = ['$http', '$state', '$q'];
    StoringenApp.GebiedenService = GebiedenService;
    function service($http, $state, $q) {
        return new GebiedenService($http, $state, $q);
    }
    angular.module('StoringenApp').service('GebiedenService', service);
})(StoringenApp || (StoringenApp = {}));
