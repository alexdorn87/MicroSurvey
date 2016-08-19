(function() {
  'use strict';
  var $rootScope, $scope, $httpBackend, DomainService, SurveyService, UserService, SurveyResponseService;
  describe('Main Controller', function() {

    beforeEach(angular.mock.module('lbServices'));
    beforeEach(angular.mock.module('alexio'));
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _UserService_, _DomainService_, _SurveyService_, _SurveyResponseService_) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      //DomainService = _DomainService_;
      SurveyService = _SurveyService_;
      UserService = _UserService_;
      SurveyResponseService = _SurveyResponseService_;
      $scope = $rootScope.$new();
      $httpBackend.when('GET', /app\/main\/main.html/).respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/__anonymous__').respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/domains').respond(200, []);
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/Domains/1/surveys').respond(200, []);
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/SurveyResponses').respond(200, []);
    }));

    afterEach(function() {
      //$httpBackend.flush(); // You'll want to add this to confirm things are working
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('surveys should populate on controller activation', inject(function($controller) {
      //$scope, $log, DomainService, SurveyService, SurveyResponseService
      var vm = $controller('MainController', {
        $scope: $scope,
        DomainService: {
          domains: {
            selected: {
              id: 1
            },
            items: ['1', '2']
          }
        },
        SurveyService: SurveyService,
        SurveyResponseService: SurveyResponseService
      });
      $httpBackend.flush();
      expect(Array.isArray(vm.surveys));
    }));

    it('should toggle a survey.', $inject(function($controller) {
      var vm = $controller('MainController', {
        $scope: $scope,
        DomainService: {
          domains: {
            selected: {
              id: 1
            },
            items: ['1', '2']
          }
        },
        SurveyService: SurveyService,
        SurveyResponseService: SurveyResponseService
      });
      $httpBackend.flush();
      var testStatus = vm.surveys[0].status;
      vm.toggleSurvey(vm.surveys[0]);
      assert(vm.surveys[0].status, !testStatus);
    }));


  });
})();
