module StoringenApp {
  "use strict";

  export class GebouwenDetailService {
    gebouw: IGebouw;

    static $inject = [];
    constructor()
    {

    }

    static $inject = ['$http', 'GEBOUWEN'];
    constructor(
      private $http,
      private GEBOUWEN
    )
    {
      // this.gebouwen = GEBOUWEN;
    }

  }
  function service(): GebouwenDetailService {
    return new GebouwenDetailService();
  }
  angular.module('StoringenApp').service('GebouwenDetailService', service);
}
