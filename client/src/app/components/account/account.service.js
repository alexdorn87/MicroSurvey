'strict';
class AccountService {
  constructor(Account, AuthUser) {
    'ngInject';

    this.AuthUser = AuthUser;
    this.Account = Account;
    this.acountId = null;
    this.accounts = {
      items: [],
      selected: {}
    };

    this.teamsIOwn = {
      items: []
    };
  }

  createAccount({name, url, id}) {
    if (!id) {
      id = this.AuthUser.getCurrentId();
    }
    return this.AuthUser.domains.create({id: id}, {
      name: name,
      url: url
    }).$promise;
  }

  deleteAccount(domainId) {
    return this.Account.deleteById({id: domainId}).$promise;
  }


  getAccounts() {
    return this.AuthUser.accounts({id: this.AuthUser.getCurrentId()}).$promise;
  }

  getAccount(fk) {
    return this.AuthUser.domains.findById({id: this.AuthUser.getCurrentId(), fk}).$promise;
  }

  getOwnedTeams() {
    return this.Account.teams({id: this.acountId}).$promise;
  }

  getCurrentAccount() {
    return this.domains.selected;
  }

}

export default AccountService;
