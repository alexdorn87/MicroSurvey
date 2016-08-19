(function() {
  'use strict';
  var $rootScope, $httpBackend, $location, $state, AuthUser, toastr, UserService;
  describe('Login Controller', function() {

    beforeEach(angular.mock.module('lbServices'));
    beforeEach(angular.mock.module('alexio'));
    ////beforeEach(module('alexio'));
    //
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$location_, _$state_, _AuthUser_, _toastr_, _UserService_) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $state = _$state_;
      AuthUser = _AuthUser_;
      toastr = _toastr_;
      UserService = _UserService_;

      $httpBackend.when('GET', /app\/login\/login.html/).respond(200, '');
      $httpBackend.when('GET', /app\/main\/main.html/).respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/__anonymous__').respond(200, '');
      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/AuthUsers/domains').respond(200, []);
      $httpBackend.whenPOST('http://127.0.0.1:3000/api/AuthUsers/login?include=user', function(postData) {
          var credentials = JSON.parse(postData);
          expect(credentials.username).toBeTruthy();
          expect(credentials.password).toBeTruthy();
          return true;
        })
        .respond(200, {
          created: "2015-11-27T01:53:40.273Z",
          id: "dtzqozHkWxvJrUALXs4ezWU9sT7Q0y0rjF4w91XJyDO82VF76zDALkF2cag2Qu4I",
          ttl: 1209600,
          user: {
            accountTypeId: 1,
            challenges: null,
            created: null,
            credentials: null,
            email: "romero.pozo2012@gmail.com",
            emailVerified: null,
            firstName: "diego",
            id: 1,
            lastName: "romero",
            lastUpdated: null,
            phone: null,
            realm: null,
            status: null,
            superUser: null,
            username: "diegofromero",
            verificationToken: null
          }
        });
    }));

    afterEach(function() {
      //$httpBackend.flush(); // You'll want to add this to confirm things are working
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should login when correct credentials are passed', inject(function($controller) {
      var vm = $controller('LoginController', {
        $location: $location,
        $state: $state,
        AuthUser: AuthUser,
        toastr: toastr,
        UserService: UserService
      });
      $httpBackend.flush();

      vm.username = "diegofromero";
      vm.password = "diegofromero";

      vm.login(vm.username, vm.password)
        .then(function(response) {
          console.log(response);
          expect(response.id).toBeDefined();
          expect(response.user.id).toBeDefined();
        });
      $httpBackend.flush();
    }));
  });
})();
