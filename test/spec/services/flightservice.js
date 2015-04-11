'use strict';

describe('Service: flightService', function () {

  // load the service's module
  beforeEach(module('iguanagoApp'));

  // instantiate service
  var flightService;
  beforeEach(inject(function (_flightService_) {
    flightService = _flightService_;
  }));

  it('should do something', function () {
    expect(!!flightService).toBe(true);
  });

});
