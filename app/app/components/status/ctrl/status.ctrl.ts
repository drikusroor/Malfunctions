module StoringenApp {
  "use strict";

  export class StatusCtrl {
    status: IStatus[];

    static $inject = ['$scope', '$state', 'StatusService'];
    constructor(
      private $scope,
      private $state,
      private StatusService
    )
    {
      var that = this;

      var gebouwId = $state.params.id;

      StatusService.getStatus(gebouwId).then(function(response) {
        that.status = response;
      });
    }

  }
  function controller($scope, $state, StatusService): StatusCtrl {
    return new StatusCtrl($scope, $state, StatusService);
  }
  angular.module('StoringenApp').controller('StatusCtrl', controller);
}
