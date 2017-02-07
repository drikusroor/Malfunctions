'use strict';

describe('Service: dishFactory', function () {

  // load the service's module
  beforeEach(module('dishesApp'));

  // instantiate service
  var dishFactory;
  beforeEach(inject(function (_dishFactory_) {
    dishFactory = _dishFactory_;
  }));

  it('should do something', function () {
    expect(!!dishFactory).toBe(true);
  });

});
