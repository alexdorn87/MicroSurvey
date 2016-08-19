(function() {
  'use strict';
  var $rootScope, $scope, $httpBackend, DomainService, SurveyService, toastr, $state, TrackerData, AuthUser;
  var vm, createController;
  describe('Survey Create Controller', function() {

    beforeEach(angular.mock.module('lbServices'));
    beforeEach(angular.mock.module('alexio'));
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _DomainService_, _SurveyService_, _toastr_, _$state_, _AuthUser_, _TrackerData_, $controller) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      DomainService = _DomainService_;
      SurveyService = _SurveyService_;
      toastr = _toastr_;
      $state = _$state_;
      AuthUser = _AuthUser_;
      TrackerData = _TrackerData_;
      $scope = $rootScope.$new();

      spyOn($rootScope, '$on');
      $httpBackend.when('GET', /app\/main\/main.html/).respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/__anonymous__').respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/domains').respond(200, []);
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/Domains/1/surveys').respond(200, []);
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/__anonymous__').respond(200, []);
      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/Domains/1/surveys').respond(200, JSON.parse('{"name":"Awesome survey title","status":"off","filters":[{}],"parameters":{},"questions":[{}],"buttons":[{}],"thankYouMessage":"Thanks for your submission","created":"2015-11-27T23:35:18.742Z","id": 2,"domainId":1}'));
      //$httpBackend.expectPOST('http://localhost:3000/api/Domains/1/surveys', function (postData) {
      //  return false;
      //});

      createController = function createController() {
        //$scope, toastr, $state, AuthUser, SurveyService, DomainService, TrackerData

        return $controller('SurveyCreateController', {
          $scope: $scope,
          toastr: toastr,
          DomainService: {
            domains: {
              selected: {
                id: 1
              }
            }
          },
          SurveyService: SurveyService,
          AuthUser: AuthUser,
          $state: $state,
          TrackerData: TrackerData
        });
      }

    }));

    afterEach(function() {
      //$httpBackend.flush(); // You'll want to add this to confirm things are working
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('add a new empty filter to survey', inject(function($controller) {
      vm = createController();
      $httpBackend.flush();
      expect(vm.survey.filters.length).toBe(1);
      var filter = {};
      vm.addFilter(filter);
      expect(vm.survey.filters.length).toBe(2);
      expect(filter.status).toBe('added');
    }));

    it('add a new empty question to survey', inject(function($controller) {
      vm = createController();
      $httpBackend.flush();
      expect(vm.survey.questions.length).toBe(1);
      vm.addQuestion();
      expect(vm.survey.questions.length).toBe(2);
    }));

    it('should update selectable filters options', inject(function($controller) {
      vm = createController();
      $httpBackend.flush();
      expect(vm.filterTypeOptions).toEqual(vm.deviceTypeOptions);
      vm.updateFilterOptions({code: 'SOURCE'}, {}, {});
      expect(vm.filterTypeOptions).toEqual(vm.sourceTypeOptions);
    }));

    it('should save a default survey successfully', function() {
      vm = createController();
      $httpBackend.flush();

      vm.SurveyService.createSurvey({id: vm.DomainService.domains.selected.id}, vm.survey)
        .then(function(response) {
          console.log(response);
          expect(new Date(response.created)).toBeDefined();
          expect(response.id).toBeDefined();
        });
      $httpBackend.flush();

    });

    it('should save a survey successfully', function() {
      vm = createController();
      $httpBackend.flush();
      var filter = { status: ''};
      vm.addFilter(filter);
      vm.addQuestion();
      vm.SurveyService.createSurvey({id: vm.DomainService.domains.selected.id}, vm.survey)
        .then(function(response) {
          console.log(response);
          expect(new Date(response.created)).toBeDefined();
          expect(response.id).toBeDefined();
        });
      $httpBackend.flush();

    });
  });
})();
