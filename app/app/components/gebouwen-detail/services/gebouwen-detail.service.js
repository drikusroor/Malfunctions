var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenDetailService = (function () {
        function GebouwenDetailService() {
        }
        return GebouwenDetailService;
    }());
    GebouwenDetailService.$inject = [];
    GebouwenDetailService.$inject = ['$http', 'GEBOUWEN'];
    StoringenApp.GebouwenDetailService = GebouwenDetailService;
    function service() {
        return new GebouwenDetailService();
    }
    angular.module('StoringenApp').service('GebouwenDetailService', service);
})(StoringenApp || (StoringenApp = {}));
