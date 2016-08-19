'strict';
export function deleteAccountRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state("home.profile.accountSettings.delete", {
      url: "/deleteAccount",
      onEnter: ($stateParams, $state, $uibModal) => {
        $uibModal.open({
          size: 'lg',
          templateUrl: "app/profile-account-settings/deleteAccount-modal.html",
          controller: 'DeleteAccountController as vm',
          windowClass: 'alexio-modal delete-account-modal'
        }).result.finally(() => {
          $state.go('home.profile.accountSettings');
        });
      }
    });
}
