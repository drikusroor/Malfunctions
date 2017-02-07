module StoringenApp {
  "use strict";

  export class ConfigCtrl {


    static $inject = ['$scope', '$http', '$localStorage'];
    constructor(
      private $scope,
      private $http,
      private $localStorage,

    ) {
      this.$scope = $scope;
      this.$http = $http;
      this.$localStorage = $localStorage;

    }
  }
  function controller($scope, $http, $localStorage): ConfigCtrl {
    return new ConfigCtrl($scope, $http, $localStorage);
  }
  angular.module('StoringenApp').controller('ConfigCtrl', controller);
}
