module StoringenApp {
  "use strict";

  export class stripData {

    public stripHeaders(dataWithHeaders) {
      return dataWithHeaders.slice(1, dataWithHeaders.length);
    }

  }
  function service(): stripData {
    return new stripData();
  }
  angular.module('StoringenApp').service('stripData', service);
}
