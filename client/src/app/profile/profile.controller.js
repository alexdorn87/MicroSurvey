'strict';
class ProfileController {
  constructor($scope, $log) {
    'ngInject';
    this.$log = $log;
    this.$scope = $scope;
    this.activate();
  }

  activate() {
    this.$log.debug('Profile Controller');
  }

  save() {
    this.$scope.$broadcast('profile.save');
  }

}

export default ProfileController;
