'strict';
class DeleteAccountController {
  constructor($scope, $uibModalInstance, $log, toastr, UserService) {
    'ngInject';
    this.$scope = $scope;
    this.$log = $log;
    this.$uibModalInstance = $uibModalInstance;
    this.UserService = UserService;
    this.toastr = toastr;
    this.confirmEmail = "";

    this.activate();
  }

  activate() {
  }

  deleteAccount() {
    if (this.confirmEmail === this.UserService.currentUser.email) {
      this.UserService.findById({id: this.UserService.currentUser.id})
        .then((userFromDB)=> {
          if (this.confirmEmail === userFromDB.email) {
            //delete all domains related to this user
            return this.UserService.destroyAllDomains({id: this.UserService.currentUser.id})
          }
        })
        .then(()=> {
          return this.UserService.deleteById({id: this.UserService.currentUser.id})
        })
        .then(()=> {
          this.toastr.error(`Your Account has been deleted.`);
          this.UserService.logout();
          this.dismiss();
        });
    }
  }

  dismiss() {
    this.$uibModalInstance.dismiss();
  }
}

export default DeleteAccountController;
