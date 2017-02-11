module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    location: any;
    gebouwen: IGebouw[];
    preFilteredGebouwen: IGebouw[];
    rayons: IGebied[];
    selectedGebouw: IGebouw;
    selectedTab: string;
    gebouwenFilter: any;
    viewPortCenter: any;

    static $inject = [
      '$scope',
      '$http',
      '$state',
      '$window',
      '$document',
      '$timeout',
      '$filter',
      'LocationService',
      'GebouwenService',
      'GebiedenService'
    ];
    constructor(
      private $scope,
      private $http,
      private $state,
      private $window,
      private $document,
      private $timeout,
      private $filter,
      private LocationService,
      private GebouwenService,
      private GebiedenService
    )
    {
      var that = this;

      GebiedenService.getGebieden().then(function(response) {
        that.rayons = response;
      })

      GebouwenService.getGebouwen().then(function(response) {
        that.gebouwen = response;
        that.preFilterGebouwen(that.gebouwen);

        $scope.$watch('gebouwenctrl.gebouwenFilter.generic', function(newValue, oldValue, scope) {
          var ctrl = scope.gebouwenctrl;
          if(oldValue || newValue) {
            ctrl.preFilterGebouwen(ctrl.gebouwen);
          }
        })

        $scope.$watch('gebouwenctrl.gebouwenFilter.Rayon_nieuw_BOG', function(newValue, oldValue, scope) {
          var ctrl = scope.gebouwenctrl;
          if(oldValue || newValue) {
            ctrl.preFilterGebouwen(ctrl.gebouwen);
          }
        })
      });

      //GebouwenService.getGebouwen();
      this.selectedTab = "map";
      LocationService.getCurrentPosition().then(this.storeLocation);

      this.gebouwenFilter = {};
      this.viewPortCenter = {};
    }

    public preFilterGebouwen = (gebouwen: IGebouw[]): void => {
      var ctrl = this;
      var preFilteredGebouwen = gebouwen;
      var gebouwenFilter = this.gebouwenFilter;

      if (gebouwenFilter.Rayon_nieuw_BOG !== undefined && gebouwenFilter.Rayon_nieuw_BOG !== null) {
        if(gebouwen[0].Rayon_nieuw_BOG !== undefined) {
          preFilteredGebouwen = preFilteredGebouwen.filter(g =>
            g.Rayon_nieuw_BOG === gebouwenFilter.Rayon_nieuw_BOG
          );
        }
      }
      if (gebouwenFilter.generic !== undefined && gebouwenFilter.generic !== null) {
        preFilteredGebouwen = this.$filter('filter')(preFilteredGebouwen, gebouwenFilter.generic);
      }
      ctrl.preFilteredGebouwen = preFilteredGebouwen;
    }

    public storeLocation = (loc):void => {
      console.log(loc);
      this.location = loc;
    }

    public setGebouwenFilter = (gebied): void => {
      var that = this;
      var x = (gebied.maxlat + gebied.minlat) / 2;
      var y = (gebied.maxlon + gebied.minlon) / 2;
      this.$scope.$apply(function() {
        that.gebouwenFilter.Rayon = gebied.Rayon;
        that.viewPortCenter = {x, y};
        console.log(that)
      })
    }

    public selectGebouw = (id: number): void => {
      console.log(id);
      var selectedGebouw = this.gebouwen.find(g => g.Object_ID === id);
      this.$scope.$apply(
        this.selectedGebouw = selectedGebouw
      );
      var that = this;
      this.$timeout(function() {
        that.panToGebouw();
      }, 100)
      console.log(this.selectedGebouw)
    }

    public panToGebouw = (): void => {
      this.$window.map.panTo({lat: this.selectedGebouw.BAG_lat, lng: this.selectedGebouw.BAG_lon});
    }

    public selectTab = (tabName: string) : void => {
      this.selectedTab = tabName;
      if (tabName === 'map') {
        // Dispatch 'resize' event so google maps will re-initialize
        this.$timeout(function() {
            var evt = $window.document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, $window, 0);
            $window.dispatchEvent(evt);
        });
      }
    }

  }
  function controller($scope, $http, $state, $window, $document, $timeout, $filter, LocationService, GebouwenService, GebiedenService): GebouwenCtrl {
    return new GebouwenCtrl($scope, $http, $state, $window, $document, $timeout, $filter, LocationService, GebouwenService, GebiedenService);
  }
  angular.module('StoringenApp').controller('GebouwenCtrl', controller);
}
