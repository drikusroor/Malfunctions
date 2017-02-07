var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var MeldingenService = (function () {
        function MeldingenService() {
        }
        return MeldingenService;
    }());
    MeldingenService.$inject = [];
    StoringenApp.MeldingenService = MeldingenService;
    function service() {
        return new MeldingenService();
    }
    angular.module('StoringenApp').service('MeldingenService', service);
})(StoringenApp || (StoringenApp = {}));
