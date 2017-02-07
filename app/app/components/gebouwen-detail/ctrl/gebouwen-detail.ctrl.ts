module StoringenApp {
  "use strict";

  export class GebouwenDetailCtrl {

    gebouwen: IGebouw[];

    static $inject = ['$scope', '$http', '$localStorage', 'GEBOUWEN'];
    constructor(
      private $scope,
      private $http, 
      private $localStorage,
      private GEBOUWEN
    )
    {
    }



  }
  function controller($scope, $http, $localStorage, GEBOUWEN): GebouwenDetailCtrl {
    return new GebouwenDetailCtrl($scope, $http, $localStorage, GEBOUWEN);
  }
  angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
}
