module StoringenApp {
  "use strict";

  export interface IMelding {
    meldingId: string;
    BAG_VerblijfsobjectID: string;
    consternaties: string;
    opermerkingen : string;
    dateCreated: Date;
    dateEdited: Date;
  }

  export class MeldingenCtrl {
    gebouw: IGebouw;
    meldingen: IMelding[];

    static $inject = ['$scope', '$http', '$state', '$window', '$document', 'GebouwenService'];
    constructor(
      private $scope,
      private $http,
      private $state,
      private $window,
      private $document,
      private GebouwenService
    )
    {
      var id: string = $state.params.id;
      GebouwenService.getGebouwById(id).then(function(data) {
        this.gebouw = data;
        this.meldingen = data.meldingen;
      })
    }
  }
  function controller($scope, $http, $state, $window, $document, GebouwenService): MeldingenCtrl {
    return new MeldingenCtrl($scope, $http, $state, $window, $document, GebouwenService);
  }
  angular.module('StoringenApp').controller('MeldingenCtrl', controller);
}
