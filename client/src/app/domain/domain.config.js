'strict';
export function domainRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state("home.profile.sites.domain", {
      url: "/domain/add",
      onEnter: ($stateParams, $state, $uibModal) => {
        $uibModal.open({
          templateUrl: "app/domain/domain-modal.html",
          controller: 'DomainController as vm',
          windowClass: 'alexio-modal'
        }).result.finally(() => {
          $state.go('home.profile.sites');
        });
      }
    });
}

