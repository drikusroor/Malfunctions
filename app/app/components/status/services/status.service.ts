module StoringenApp {
  "use strict";

  export interface IStatus {
    statusId: string;

  }

  export class StatusService {
    status: IStatus[];

    static $inject = ['$http', '$q'];
    constructor(
      private $http,
      private $q
    )
    {
      this.status = [];
    }

    public getStatus = (gebouwId):any => {
      var deferred = this.$q.defer();
      var that = this;
      this.$http.get('https://development.prognotice.nl/storingen/api/api/gebouwen/' + gebouwId + '/status').then(function(response) {
        console.log(response);
        that.status = response.data;
        deferred.resolve(response.data);
      },
      function(errorResponse) {
        console.log(errorResponse);
        deferred.resolve([]);
      })
      return deferred.promise;
    }

  }
  function service($http, $q): StatusService {
    return new StatusService($http, $q);
  }
  angular.module('StoringenApp').service('StatusService', service);
}
