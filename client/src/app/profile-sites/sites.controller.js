'strict';
class SitesController {
  constructor($scope, $log, $state, DomainService) {
    'ngInject';
    this.$log = $log;
    this.domains = DomainService.domains.items;
    this.activate();

    $scope.$on('domains.deleted', () => {
      $state.go('home.profile.sites.detail', {id: DomainService.domains.selected.id}, {reload: true});
    });
  }

  activate() {
    this.$log.debug('Sites Controller');
  }
}

export default SitesController;
