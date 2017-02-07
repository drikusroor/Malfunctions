var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var stripData = (function () {
        function stripData() {
        }
        stripData.prototype.stripHeaders = function (dataWithHeaders) {
            return dataWithHeaders.slice(1, dataWithHeaders.length);
        };
        return stripData;
    }());
    StoringenApp.stripData = stripData;
    function service() {
        return new stripData();
    }
    angular.module('StoringenApp').service('stripData', service);
})(StoringenApp || (StoringenApp = {}));
