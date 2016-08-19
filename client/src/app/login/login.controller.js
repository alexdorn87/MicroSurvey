'strict';
class LoginController {
  constructor($log, $location, $state, AuthUser, toastr, UserService) {
    'ngInject';

    this.$state = $state;
    this.AuthUser = AuthUser;
    this.toastr = toastr;
    this.UserService = UserService;
    this.$location = $location;
    this.$log = $log;

    this.activate();
  }

  activate() {
    this.$log.debug('Login Controller');
  }

  login(username, password) {
    this.rememberMe = this.rememberMe ? this.rememberMe : false;
    let credentials;
    const re = /\S+@\S+\.\S+/;
    var isEmail = re.test(username);
    if (!isEmail) {
      credentials = {username: username, password: password};
    } else {
      credentials = {email: username, password: password};
    }
    return this.AuthUser.login({rememberMe: this.rememberMe}, credentials)
      .$promise;
  }

  auth() {
    this.login(this.username, this.password)
      .then(response => {
        //user exists and logins succesfully
        var next = this.$location.nextAfterLogin || '/home';
        this.$location.nextAfterLogin = null;
        this.$location.path(next);
        if (response.id) { //id is the accessToken
          this.user = response.user;
          this.UserService.currentUser = response.user;
          this.UserService.userId = response.user.id;
          this.UserService.tokenId = response.id;
          this.toastr.info(`Logged in as <strong> ${response.user.username} </strong>`);
          this.$state.go('home');
        }
      })
    .catch(response => {
      //login failed
      if (response.data && response.data.error.code === 'LOGIN_FAILED') {
        this.toastr.error(`Login Failed`);
      }
    });
  }
}

export default LoginController;
