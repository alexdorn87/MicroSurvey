'strict';
class ForgotPasswordController {

  constructor(AuthUser, UserService, DomainService, $state, $log) {
    'ngInject';

    this.$log = $log;
    this.AuthUser = AuthUser;
    this.DomainService = DomainService;
    this.UserService = UserService;
    this.$state = $state;

    this.errors = {};

    this.email = "";


    this.activate();
  }

  activate() {
    this.$log.debug('forgot pass...');
  }

  requestPassword() {
    this.UserService.requestResetPassword({email: this.email})
      .then((response) => {

        this.$log.debug('success');
        this.$log.debug(response);
        this.emailSent = true;
      })
      .catch((response) => {
        this.$log.debug('fail');
        this.$log.debug(response);
      })
  }


}

export default ForgotPasswordController;
