'strict';
class SiteDetailController {
  constructor($scope, $log, $state, TrackerData, AuthUser, DomainService, $stateParams, toastr, $uibModal) {
    'ngInject';
    this.$log = $log;
    this.toastr = toastr;
    this.DomainService = DomainService;
    this.domains = DomainService.domains.items;
    this.$scope = $scope;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.activate(TrackerData, AuthUser, $stateParams);
  }

  activate(TrackerData, AuthUser, $stateParams) {
    this.$log.debug('Site Detail Controller', $stateParams.id);
    this.domain = this.domains.filter((domain) => {
      return domain.id == $stateParams.id;
    })[0];

    TrackerData.find({
      filter: {
        where: {
          domainId: $stateParams.id,
          authUserId: AuthUser.getCurrentId
        }
      }
    }).$promise
      .then((response) => {
        this.$log.debug(response[0].uuid);
        this.uuid = response[0].uuid;
        this.domain.uuid = this.uuid;
        this.snippet = `&#x3C;script type=&#x22;text/javascript&#x22; src=&#x22;//alex.io/lib/tracker/client.min.js&#x22;&#x3E;&#x3C;/script&#x3E;\n&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;\n window.alexioClient = new Tracker({uuid: '${this.uuid}'});\n&#x3C;/script&#x3E;`
      });

  }

  deleteDomain(domain) {
    this.DomainService.deleteDomain(domain.id)
      .then(response => {

        if (response.count === 1) {
          this.$scope.$emit('domains.deleted');
          this.toastr.success(`Domain ${domain.name} has been deleted.`);
        }

      })
      .catch(err => {
        this.$log.debug(err);
      });
  }

  openSendToDeveloper() {
    var modalInstance = this.$uibModal.open({
      animation: true,
      windowClass: 'alexio-modal',
      templateUrl: 'app/profile-sites-detail/send-developer-modal.html',
      controller: 'SendDeveloperModalInstanceController as vm'
    });

    modalInstance.result.then(() => {
      this.$log.debug('closed');
    });
  }

  verifyDomain(domain) {
    domain.$verify({},
      (response)=> {
        this.$log.debug(response);
        domain.isVerified = response.isVerified;
      },
      (response)=> {
        this.$log.debug(response);
        if (response.data.error.status == 500) {
          this.toastr.warning('Please verify the website address exists.');
        }
      });
  }
}

export default SiteDetailController;
