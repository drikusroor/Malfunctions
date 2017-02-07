module StoringenApp {
  "use strict";

  export class GebouwenDetailService {
    gebouw: IGebouw;

    static $inject = ['$http', 'GEBOUWEN', '$state'];
    constructor(
      private $http,
      private GEBOUWEN,
      private $state
    )
    {
      // this.getGebouwByParamsId();
    }

    public getGebouwById = (id):void => {
      this.gebouw = this.GEBOUWEN.find(g => g.gebouwId === id);
    }

    public getGebouwByParamsId = (): void => {
      var id = parseInt(this.$state.params.id);
      this.getGebouwById(id);
    }



  }
  function service($http, GEBOUWEN, $state): GebouwenDetailService {
    return new GebouwenDetailService($http, GEBOUWEN, $state);
  }
  angular.module('StoringenApp').service('GebouwenDetailService', service);
}
