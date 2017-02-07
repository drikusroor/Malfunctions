module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    gebouwen: IGebouw[];
    selectedGebouw: IGebouw;
    selectedTab: string;

    static $inject = ['$scope', '$http', '$state', '$window', '$document', 'GEBOUWEN'];
    constructor(
      private $scope,
      private $http,
      private $state,
      private $window,
      private $document,
      private GEBOUWEN
    )
    {
      this.gebouwen = GEBOUWEN;
      this.selectedTab = "map";


      var that = this;
      this.$document.ready(function() {
        that.initMap();
      })
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
  function controller($scope, $http, $state, $window, $document, GEBOUWEN): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, $state, $window, $document, GEBOUWEN);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
