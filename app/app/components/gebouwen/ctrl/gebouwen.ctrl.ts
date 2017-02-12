module StoringenApp {
  "use strict";

  export class GebouwenCtrl {
    location: any;
    gebouwen: IGebouw[];
    preFilteredGebouwen: IGebouw[];
    rayons: IGebied[];
    // selectedGebouw: IGebouw;
    selectedTab: string;
    gebouwenFilter: any;
    viewPortCenter: any;

    gebouwenLoading: boolean;
    rayonsLoading: boolean;

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

      this.gebouwenLoading = true;
      this.rayonsLoading = true;

      GebiedenService.getGebieden().then(function(response) {
        that.rayonsLoading = false;
        that.rayons = response;
      })

      GebouwenService.getGebouwen().then(function(response) {
        that.gebouwenLoading = false;
        that.gebouwen = response;
        that.preFilterGebouwen(that.gebouwen);

        $scope.$watch('gebouwenctrl.gebouwenFilter.generic', function(newValue, oldValue, scope) {
          var ctrl = scope.gebouwenctrl;
          if(oldValue || newValue) {
            ctrl.preFilterGebouwen(ctrl.gebouwen);
          }
        })

        $scope.$watch('gebouwenctrl.gebouwenFilter.Rayon', function(newValue, oldValue, scope) {
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

      if (gebouwenFilter.Rayon !== undefined && gebouwenFilter.Rayon !== null) {
        if(gebouwen[0].Rayon !== undefined) {
          preFilteredGebouwen = preFilteredGebouwen.filter(g =>
            g.Rayon === gebouwenFilter.Rayon
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

    public setRayonFilter = (rayon: string): void => {
      if (this.gebouwenFilter.Rayon !== rayon) {
        this.gebouwenFilter.Rayon = rayon;
      } else {
        this.gebouwenFilter.Rayon = undefined;
      }
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

    // public selectGebouw = (id: number): void => {
    //   console.log(id);
    //   var selectedGebouw = this.gebouwen.find(g => g.BAG_VerblijfsobjectID === id);
    //   this.selectedGebouw = selectedGebouw
    // }

    // public panToGebouw = (): void => {
    //   this.$window.map.panTo({lat: this.selectedGebouw.BAG_lat, lng: this.selectedGebouw.BAG_lon});
    // }

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
