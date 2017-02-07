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

      var that = this;
      this.$document.ready(function() {
        that.initMap();
      })
    }

    public storeLocation = (loc):void => {
      console.log(loc)
      this.location = loc;
    }

    public selectGebouw = (id: number): void => {
      this.selectedGebouw = this.GEBOUWEN.find(g => g.gebouwId === id);
      console.log(this.selectedGebouw)
    }

    public selectTab = (tabName: string) : void => {
      this.selectedTab = tabName;
      if (tabName === 'map') {

        //this.$window.dispatchEvent(new Event('resize'));
        //google.maps.event.trigger(this.$window.map, "resize");
      }
    }

    public initMap = (): void => {

      var coordinates = {
        lat: 52.1646443,
        lng: 5.363390400000071
      }

      this.$window.map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 16
      });
    }

  }
  function controller($scope, $http, $state, $window, $document, GEBOUWEN, LocationService): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, $state, $window, $document, GEBOUWEN, LocationService);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
