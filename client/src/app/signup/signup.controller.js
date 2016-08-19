'strict';
class SignUpController {

  constructor(AuthUser, UserService, DomainService, $state, $log) {
    'ngInject';

    this.$log = $log;
    this.AuthUser = AuthUser;
    this.DomainService = DomainService;
    this.UserService = UserService;
    this.$state = $state;

    this.registerUser = {};

    this.errors = {};

    this.registerUser.firstName = null;
    this.registerUser.lastName = null;
    this.registerUser.email = "";
    this.registerUser.password = "";
    this.registerUser.password2 = "";
    this.registerUser.domainName = "";
    this.registerUser.domainUrl = "";



    this.activate();
  }

  activate() {
    this.$log.debug('sign up...');
  }

  createAccount() {

  }

  matchPasswords(p1, p2) {
    return p1 == p2;
  }

  register() {
    if (!this.matchPasswords(this.registerUser.password, this.registerUser.password2)) {
      this.registerError = 'Passwords not match.';
      this.errors.password = 'has-error';
      this.errors.password2 = 'has-error';
      return false;
    } else {
      this.errors.password = '';
      this.errors.password2 = '';
    }

    //register the user
    this.UserService.createUserWithDomain({
      email: this.registerUser.email,
      //default username same as email
      username: this.registerUser.email,
      password: this.registerUser.password,
      domainName: this.registerUser.domainName,
      domainUrl: this.registerUser.domainUrl,
      active: true
    })
      .then((response) => {
        this.$log.debug(response);
        if (response.created) {
          return this.AuthUser.login({email: this.registerUser.email, password: this.registerUser.password})
            .$promise;
        }
      })
      .then((response)=> {
        this.$state.go('login');
      })
      .catch((response) => {
        this.$log.error(response);
      });
  }


}

export default SignUpController;
