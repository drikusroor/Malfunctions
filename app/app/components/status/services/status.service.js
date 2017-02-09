var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var StatusService = (function () {
        function StatusService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.getStatus = function (gebouwId) {
                var deferred = _this.$q.defer();
                var that = _this;
                _this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/' + gebouwId + '/status').then(function (response) {
                    console.log(response);
                    that.status = response.data;
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.resolve([]);
                });
                return deferred.promise;
            };
            this.status = [];
        }
        return StatusService;
    }());
    StatusService.$inject = ['$http', '$q'];
    StoringenApp.StatusService = StatusService;
    function service($http, $q) {
        return new StatusService($http, $q);
    }
    angular.module('StoringenApp').service('StatusService', service);
})(StoringenApp || (StoringenApp = {}));
