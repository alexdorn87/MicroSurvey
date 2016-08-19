'strict';
class DomainService {
  constructor(Domain, AuthUser) {
    'ngInject';

    this.AuthUser = AuthUser;
    this.Domain = Domain;
    this.domains = {
      items: [],
      selected: {}
    };
  }

  createDomain({name, url, id}) {
    if (!id) {
      id = this.AuthUser.getCurrentId();
    }
    return this.AuthUser.domains.create({id: id}, {
      name: name,
      url: url
    }).$promise;
  }

  deleteDomain(domainId) {
    return this.Domain.deleteById({id: domainId}).$promise;
  }

  getDomains() {
    return this.AuthUser.domains({id: this.AuthUser.getCurrentId()}).$promise;
  }

  getDomain(fk) {
    return this.AuthUser.domains.findById({id: this.AuthUser.getCurrentId(), fk}).$promise;
  }

  getCurrentDomain() {
    return this.domains.selected;
  }

}

export default DomainService;
