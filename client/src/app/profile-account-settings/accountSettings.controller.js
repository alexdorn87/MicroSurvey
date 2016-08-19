'strict';
class AccountSettingsController {
  constructor($scope, $log, $state, toastr, UserService) {
    'ngInject';
    this.$log = $log;
    this.$state = $state;
    this.UserService = UserService;

    $scope.$on('profile.save', () => {
      UserService.updateUser({ id: UserService.currentUser.id }, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone
      })
      .then(()=> {
        toastr.success('Your information has been updated.');
      });
    });

    this.activate(UserService);
  }

  activate(UserService) {
    this.$log.debug('AccountSettings Controller');
    this.user = UserService.currentUser;
  }

  deleteAccount() {
    this.$state.go('home.profile.accountSettings.delete');
  }
}

export default AccountSettingsController;
