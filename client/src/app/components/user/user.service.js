'strict';
class UserService {
    constructor(AuthUser, Account, $state, $http) {
        'ngInject';
        this.AuthUser = AuthUser;
        this.Account = Account;
        this.$http = $http;
        this.accountsIOwn = {
          items: [],
          selected: null
        };

        this.myTeams = {
          items: []
        };

        this.$state = $state;
        this.currentUser = null;
        this.userId = null;
        this.tokenId = null;
    }

    /**
     * Logs out the user, set the current user to null and goes to login screen
     */
    logout() {
        this.AuthUser.logout().$promise.then(() => {
            this.currentUser = null;
            this.$state.go('login');
        });
    }
    updateUser(id, data) {
        return this.AuthUser.prototype$updateAttributes(id, data).$promise;
    }

    findById(id) {
        return this.AuthUser.findById(id).$promise;
    }

    deleteById(id) {
        return this.AuthUser.deleteById(id).$promise;
    }

    destroyAllDomains(id) {
      return this.AuthUser.domains.destroyAll(id).$promise;
    }

    requestResetPassword(params) {
      return this.AuthUser.resetPassword(params).$promise;
    }

    getMyAccounts() {
      return this.Account.find({filter:{where: {userId: this.AuthUser.getCurrentId()}}}).$promise;
    }

    createUserWithDomain(data) {
      return this.AuthUser.createUserWithDomain(data).$promise;
    }
}

export default UserService;
