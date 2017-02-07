module StoringenApp {
  "use strict";

  export interface Navigator {
    webkitTemporaryStorage: any,
    webkitPermanentStorage: any
  }

  export class $localStorage {
    window: ng.IWindowService;
    navigator: Navigator;

    static $inject = ['$window'];
    constructor($window)
    {
      this.window = $window;
      this.navigator = navigator;
    }

    store(key, value): void
    {
      this.window.localStorage[key] = value;
    };

    get(key, defaultValue): Object
    {
      return this.window.localStorage[key] || defaultValue;
    };

    storeObject(key, value): void
    {
      this.window.localStorage[key] = JSON.stringify(value);
    };

    getObject(key, defaultValue): Object
    {
      if (typeof localStorage[key] !== "undefined"
        && localStorage[key] !== "undefined" && localStorage[key] !== "null") {
        //console.log("Wel data? -> ", localStorage[key]);
        return JSON.parse(this.window.localStorage[key] || defaultValue);
      } else {
        return defaultValue;
      }
    };

    getUsage(): Number {
      // you could also use it from webkitPersistentStorage
      try {
        this.navigator.webkitTemporaryStorage.queryUsageAndQuota(
          function(current, left) {
            console.log("current: ", current, "left: ", left)
            current = current / 1024 / 1024;
            left = left / 1024 / 1024;
            console.log(current, left);
          },
          function(errorCallback) {
            console.log(errorCallback);
          }
        );
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
    }
  }
  function service($window): $localStorage {
    return new $localStorage($window);
  }
  angular.module('StoringenApp').service('$localStorage', service);
}
