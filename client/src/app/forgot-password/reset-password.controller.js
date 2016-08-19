'strict';
class ResetPasswordController {

  constructor(AuthUser, UserService, DomainService, $state, $log, $http) {
    'ngInject';

    this.$log = $log;
    this.AuthUser = AuthUser;
    this.DomainService = DomainService;
    this.UserService = UserService;
    this.$state = $state;
    this.$http = $http;

    this.errors = {};

    this.email = "";


    this.activate();
  }

  activate() {
    this.$log.debug('change pass...');
  }

  changePassword() {
    this.$http.post('http://localhost:3000/reset-password?accessToken=' + location.hash.split("=")[1],
      {password: this.password, confirmation: this.confirmation,accessToken: location.hash.split("=")[1]}
    )
    .then((response)=> {
      this.$log.debug(response);
      if (response.status == 200) {
        //user found and pass updated
        this.$state.go('login');
      }

    })
      .catch((response)=> {
        this.$log.debug(response);
        if (response.status == 400) {
          //bad request
          this.errorMessage = "Check both passwords match";
        }
        if (response.status == 404) {
          //not found
          this.errorMessage = "Token has expired.";
        }
      })
  }


}

export default ResetPasswordController;
