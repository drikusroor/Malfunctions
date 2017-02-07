module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    gebouwen: IGebouw[];
    selectedGebouw: IGebouw;
    selectedTab: string;

    static $inject = ['$scope', '$http', '$state', 'GEBOUWEN'];
    constructor(
      private $scope,
      private $http,
      private $state,
      private GEBOUWEN
    )
    {
      this.gebouwen = GEBOUWEN;
      this.selectedTab = "list";
    }

    public selectGebouw = (id: number): void => {
      this.selectedGebouw = this.GEBOUWEN.find(g => g.gebouwId === id);
      console.log(this.selectedGebouw)
    }


  }
  function controller($scope, $http, $state, GEBOUWEN): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, $state, GEBOUWEN);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
