module StoringenApp {
  "use strict";

  export class MeldingenService {


    static $inject = [];
    constructor()
    {

    }



  }
  function service(): MeldingenService {
    return new MeldingenService();
  }
  angular.module('StoringenApp').service('MeldingenService', service);
}
