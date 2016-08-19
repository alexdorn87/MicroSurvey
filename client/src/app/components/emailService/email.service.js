'strict';
class EmailService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  send(params) {
    return this.$http.post('http://localhost:3000/api/sendEmail', params);
  }

}

export default EmailService;
