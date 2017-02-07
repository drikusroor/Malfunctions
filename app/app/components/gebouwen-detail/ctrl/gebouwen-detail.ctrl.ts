module StoringenApp {
  "use strict";

  export class GebouwenDetailCtrl {

    gebouwen: IGebouw[];
    service: GebouwenDetailService;

    static $inject = ['$scope', '$http', '$localStorage', 'GebouwenDetailService'];
    constructor(
      private $scope,
      private $http,
      private $localStorage,
      private GebouwenDetailService
    )
    {
      this.service = GebouwenDetailService
      this.service.getGebouwByParamsId();
    }
  }
  function controller($scope, $http, $localStorage, GebouwenDetailService): GebouwenDetailCtrl {
    return new GebouwenDetailCtrl($scope, $http, $localStorage, GebouwenDetailService);
  }
  angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
}
