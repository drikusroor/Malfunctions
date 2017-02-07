module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    gebouwen: IGebouw[];
    selectedTab: string;

    static $inject = ['$scope', '$http', 'GEBOUWEN'];
    constructor(
      private $scope,
      private $http,
      private GEBOUWEN
    )
    {
      this.gebouwen = GEBOUWEN;
      this.selectedTab = "map";
    }



  }
  function controller($scope, $http, GEBOUWEN): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, GEBOUWEN);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
