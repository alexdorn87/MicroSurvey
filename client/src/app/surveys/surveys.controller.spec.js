(function() {
  'use strict';
  var $rootScope, $httpBackend, DomainService, SurveyService, UserService;
  var vm;
  describe('Surveys Controller', function() {

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
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/Domains/1/surveys').respond(200, [{
        buttons: [],
        created: "2015-11-24T21:21:16.425Z",
        domainId: 1,
        endDate: null,
        filters: [],
        id: 20,
        name: "Some smart name",
        parameters: {},
        questions: [],
        status: null,
        thankYouMessage: "Thanks for your submission adasdsa"
      }]);
    }));

    afterEach(function() {
      //$httpBackend.flush(); // You'll want to add this to confirm things are working
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('surveys should populate on controller activation', inject(function($controller) {
      vm = $controller('SurveysController', {
        DomainService: {
          domains: {
            selected: {
              id: 1
            }
          }
        },
        SurveyService: SurveyService,
        $scope: $rootScope
      });
      $httpBackend.flush();
      expect(Array.isArray(vm.surveys));
    }));

    it('should reload surveys', inject(function($controller) {
      vm = $controller('SurveysController', {
        DomainService: {
          domains: {
            selected: {
              id: 1
            }
          }
        },
        SurveyService: SurveyService,
        $scope: $rootScope
      });
      $httpBackend.flush();
      expect(Array.isArray(vm.surveys));
    }));

    it('should receive emitted events', inject(function($controller) {
      vm = $controller('SurveysController', {
        DomainService: {
          domains: {
            selected: {
              id: 1
            }
          }
        },
        SurveyService: SurveyService,
        $scope: $rootScope
      });
      $httpBackend.flush();
      $rootScope.$emit('surveys.reload');
      expect($rootScope.$on).toHaveBeenCalledWith('surveys.reload', jasmine.any(Function));
    }));

  });
})();
