var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenService = (function () {
        function GebouwenService($http, $state, $q) {
            var _this = this;
            this.$http = $http;
            this.$state = $state;
            this.$q = $q;
            this.getGebouwen = function (callback) {
                var deferred = _this.$q.defer();
                var that = _this;
                _this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/benko').then(function (response) {
                    console.log(response);
                    that.gebouwen = response.data;
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.resolve([]);
                });
                return deferred.promise;
            };
            this.getGebouwById = function (id) {
                var deferred = _this.$q.defer();
                var that = _this;
                _this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/' + id).then(function (response) {
                    console.log(response);
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.resolve({});
                });
                return deferred.promise;
            };
            this.gebouwen = [];
        }
        return GebouwenService;
    }());
    GebouwenService.$inject = ['$http', '$state', '$q'];
    StoringenApp.GebouwenService = GebouwenService;
    function service($http, $state, $q) {
        return new GebouwenService($http, $state, $q);
    }
    angular.module('StoringenApp').service('GebouwenService', service);
})(StoringenApp || (StoringenApp = {}));
