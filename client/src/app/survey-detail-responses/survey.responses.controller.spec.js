(function() {
  'use strict';
  var $rootScope, $scope, $httpBackend, DomainService, SurveyService, UserService;
  var vm;
  describe('Survey detail on responses controller.', function() {

    beforeEach(angular.mock.module('lbServices'));
    beforeEach(angular.mock.module('alexio'));
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _DomainService_, _SurveyService_) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      DomainService = _DomainService_;
      SurveyService = _SurveyService_;

      spyOn($rootScope, '$on');
      $httpBackend.when('GET', /app\/main\/main.html/).respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/__anonymous__').respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/domains').respond(200, []);
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/Domains/1/surveys').respond(200, []);
    }));

    afterEach(function() {
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
})();
