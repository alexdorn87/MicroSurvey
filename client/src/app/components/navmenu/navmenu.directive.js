'strict';
class NavmenuDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/components/navmenu/navmenu.html',
            controller: NavmenuController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
}

class NavmenuController {
    constructor($scope, $log, $timeout, UserService, DomainService, TeamService, $state) {
        'ngInject';
        this.$log = $log;
        this.domains = DomainService.domains;
        this.teams = TeamService.teams;

        this.UserService = UserService;
        this.userId = UserService.userId;
        this.user = UserService.currentUser;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.$scope.$state = $state;

        this.profileMenuOptions = [
            {
                name: "Account Settings",
                url: "accountSettings"
            },
            {
                name: "My sites",
                url: "mySites"
            },
            {
                name: "Plan & Billing",
                url: "planAndBilling"
            },
            {
                name: "Notifications",
                url: "notifications"
            },
            {
                name: "Users",
                url: "users"
            }
        ];

        this.activate();
    }

    activate() {
        this.$log.debug('activating....');
    }

    changeDomain() {
      this.$log.debug(this.domains.selected);
      this.$scope.$broadcast('domains.change');
    }

    changeTeam(item, model) {
      this.$log.debug(item, model);
      this.$scope.$broadcast('teams.change');
    }

    /**
     * Logs out the user from the menu
     */
    logout() {
        this.UserService.logout();
    }

    toggled(open) {
    }
}

export default NavmenuDirective;
