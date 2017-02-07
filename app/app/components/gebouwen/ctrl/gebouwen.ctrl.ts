module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    location: any;
    gebouwen: IGebouw[];
    selectedGebouw: IGebouw;
    selectedTab: string;

    static $inject = ['$scope', '$http', '$state', '$window', '$document', 'GEBOUWEN', 'LocationService'];
    constructor(
      private $scope,
      private $http,
      private $state,
      private $window,
      private $document,
      private GEBOUWEN,
      private LocationService
    )
    {
      this.gebouwen = GEBOUWEN;
      this.selectedTab = "map";
      LocationService.getCurrentPosition().then(this.storeLocation);
    }

    public storeLocation = (loc):void => {
      console.log(loc);
      this.location = loc;
    }

    public selectGebouw = (id: number): void => {
      $scope.$apply(
        this.selectedGebouw = this.GEBOUWEN.find(g => g.gebouwId === id);
      );
      console.log(this.selectedGebouw)
    }

    public selectTab = (tabName: string) : void => {
      this.selectedTab = tabName;
      if (tabName === 'map') {
      }
    }

  }
  function controller($scope, $http, $state, $window, $document, GEBOUWEN, LocationService): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, $state, $window, $document, GEBOUWEN, LocationService);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
