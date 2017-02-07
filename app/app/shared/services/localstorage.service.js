var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var $localStorage = (function () {
        function $localStorage($window) {
            this.window = $window;
            this.navigator = navigator;
        }
        $localStorage.prototype.store = function (key, value) {
            this.window.localStorage[key] = value;
        };
        ;
        $localStorage.prototype.get = function (key, defaultValue) {
            return this.window.localStorage[key] || defaultValue;
        };
        ;
        $localStorage.prototype.storeObject = function (key, value) {
            this.window.localStorage[key] = JSON.stringify(value);
        };
        ;
        $localStorage.prototype.getObject = function (key, defaultValue) {
            if (typeof localStorage[key] !== "undefined"
                && localStorage[key] !== "undefined" && localStorage[key] !== "null") {
                return JSON.parse(this.window.localStorage[key] || defaultValue);
            }
            else {
                return defaultValue;
            }
        };
        ;
        $localStorage.prototype.getUsage = function () {
            try {
                this.navigator.webkitTemporaryStorage.queryUsageAndQuota(function (current, left) {
                    console.log("current: ", current, "left: ", left);
                    current = current / 1024 / 1024;
                    left = left / 1024 / 1024;
                    console.log(current, left);
                }, function (errorCallback) {
                    console.log(errorCallback);
                });
            }
            catch (e) {
                console.log(e);
            }
            var allocated = 5;
            var total = 0;
            for (var x in localStorage) {
                var amount = (localStorage[x].length) / 1024 / 1024;
                total += amount;
            }
            var remaining = allocated - total;
            console.log("Used: " + total + " MB");
            console.log("Remaining: " + remaining + " MB");
            return total;
        };
        return $localStorage;
    }());
    $localStorage.$inject = ['$window'];
    StoringenApp.$localStorage = $localStorage;
    function service($window) {
        return new $localStorage($window);
    }
    angular.module('StoringenApp').service('$localStorage', service);
})(StoringenApp || (StoringenApp = {}));
