module StoringenApp {
  "use strict";

  export class GebouwenDetailCtrl {
    gebouw: IGebouw;
    gebouwen: IGebouw[];
    service: GebouwenDetailService;

    static $inject = ['$scope', '$http', '$state', '$localStorage', 'GebouwenService'];
    constructor(
      private $scope,
      private $http,
      private $localStorage,
      private $state,
      private GebouwenService
    )
    {
      this.refreshGebouw();
      var that = this;
    }

    public refreshGebouw = ():void => {
      console.log(this.$state)
      const {id} = this.$state.params;
      this.GebouwenService.getGebouwById(id).then(function(response){
        that.gebouw = response;
        that.gebouwen = [response];
      })
    }

    public showScope = ():any => {
      console.log(this)
    }
  }
  function controller($scope, $http, $localStorage, $state, GebouwenService): GebouwenDetailCtrl {
    return new GebouwenDetailCtrl($scope, $http, $localStorage, $state, GebouwenService);
  }
  angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
}
