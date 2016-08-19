'strict';
class DialogService {
    constructor($q, $uibModal, $rootScope) {
      'ngInject';
      this.$uibModal = $uibModal;
      this.$q = $q;
      this.defaultOpts = {
        animation: true,
        windowClass: 'alexio-modal',
        templateUrl: 'app/components/dialog/dialog.html',
        controller: 'DialogController',
        controllerAs: 'vm',
        bindToController: true
      };

      this.$rootScope = $rootScope;
    }

    open(_scope) {
      let scope = this.$rootScope.$new(),
          defer = this.$q.defer(),
          modalInstance;

      scope = angular.extend(scope, _scope);
      let options = angular.extend({}, this.defaultOpts);
      options.scope = scope;

      modalInstance = this.$uibModal.open(options);

      modalInstance.result.then(
        (confirm) => {
        defer.resolve(confirm);
      },
        () => {
        defer.reject(false);
      });

      return defer.promise;
    }
}

class DialogController{
  constructor($uibModalInstance) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
  }

  confirm(answer = false) {
    this.$uibModalInstance.close(answer);
  }

  dismiss() {
    this.$uibModalInstance.dismiss(false);
  }
}

export {DialogService, DialogController};
