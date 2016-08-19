'strict';
class DomainController {
  constructor($scope, $uibModalInstance, DomainService) {
    'ngInject';
    this.$scope = $scope;
    this.DomainService = DomainService;
    this.$uibModalInstance = $uibModalInstance;

    this.activate();
  }

  activate() {

  }

  save(domain) {
    this.DomainService.createDomain(domain)
    .then(() => {
      this.dismiss();
    })
    .catch(res => {
      this.errorMsg = res.data.error.message || res.data.error.details.messages.url[0];
    });

  }

  dismiss() {
    this.$uibModalInstance.dismiss();
  }
}

export default DomainController;
