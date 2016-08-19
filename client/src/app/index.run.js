/*eslint angular/on-watch: 0*/
'strict';
export function runBlock($rootScope, $state, UserService, AuthUser, AccountService) {
  'ngInject';

  const stateChangeStart = $rootScope.$on('$stateChangeStart', function(event, next) {
    // redirect to login page if not logged in
    let user = AuthUser.getCurrent();
    if (AuthUser.getCurrent()) {
      UserService.currentUser = user;
    }
    if (next.authenticate && !UserService.currentUser) {
      event.preventDefault(); //prevent current page from loading
      $state.go('login');
    }
  });
  $rootScope.$on('$stateChangeSuccess',
    function (/*event, toState, toParams, fromState, fromParams */) {
      $rootScope.isNavActive = false;
  });
  $rootScope.$on('destroy', function() {
    stateChangeStart();
  });
}
