module StoringenApp {
  "use strict";

  export interface IBezoek {
    meldingId: string;
    BAG_VerblijfsobjectID: string;
    consternaties: string;
    opermerkingen : string;
    dateCreated: Date;
    dateEdited: Date;
  }

  export class StatusCtrl {
    gebouw: IGebouw;
    bezoeken: IBezoek[];

    static $inject = ['$scope', '$state', 'GebouwenService'];
    constructor(
      private $scope,
      private $state,
      private GebouwenService
    )
    {
      var that = this;

      var gebouwId = $state.params.id;

      GebouwenService.getGebouwById(gebouwId).then(function(response) {
        that.gebouw = response;
        that.bezoeken = response.bezoeken;
        that.storingen = that.bezoeken.filter(b => b.SoortBonOmschrijving !== "Periodiek onderhoud");
        that.periodiek = that.bezoeken.filter(b => b.SoortBonOmschrijving === "Periodiek onderhoud");
        console.log(that);
      });
    }

  }
  function controller($scope, $state, GebouwenService): StatusCtrl {
    return new StatusCtrl($scope, $state, GebouwenService);
  }
  angular.module('StoringenApp').controller('StatusCtrl', controller);
}
