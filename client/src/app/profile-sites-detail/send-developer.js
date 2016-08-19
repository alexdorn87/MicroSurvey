'strict';
class SendDeveloperModalInstanceController {
  constructor($uibModalInstance, EmailService) {
    'ngInject';
    this.EmailService = EmailService;
    this.$uibModalInstance = $uibModalInstance;
    this.emailConfig = {};
    this.activate();
  }

  activate() {
  }

  send() {
    this.EmailService.send(this.emailConfig)
      .then((response)=> {
        this.$log.debug(response);
      })
      .catch((response) => {
        this.$log.debug(response);
      });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default SendDeveloperModalInstanceController;
