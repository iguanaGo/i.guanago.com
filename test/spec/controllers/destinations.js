'use strict';

describe('Controller: DestinationsCtrl', function () {

  // load the controller's module
  beforeEach(module('iguanagoApp'));

  var DestinationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DestinationsCtrl = $controller('DestinationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
