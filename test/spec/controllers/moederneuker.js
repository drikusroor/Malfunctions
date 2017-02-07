'use strict';

describe('Controller: MoederneukerCtrl', function () {

  // load the controller's module
  beforeEach(module('dishesApp'));

  var MoederneukerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoederneukerCtrl = $controller('MoederneukerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoederneukerCtrl.awesomeThings.length).toBe(3);
  });
});
