'strict';
class TeamService {
  constructor(Team, AuthUser,UserService, AccountService) {
    'ngInject';


    this.UserService = UserService;
    this.AccountService = AccountService;
    this.AuthUser = AuthUser;
    this.Team = Team;
    this.teams = {
      items: [],
      selected: {}
    };
  }

  createTeam(name) {
    return this.Team.create({name: name, accountId: this.AccountService.accountId}).$promise;
  }

  deleteTeam(domainId) {
    return this.Team.deleteById({id: domainId}).$promise;
  }

  getTeams() {
    return this.AuthUser.teams({id: this.AuthUser.getCurrentId()}).$promise;
  }

  getTeam(fk) {
    return this.AuthUser.domains.findById({id: this.AuthUser.getCurrentId(), fk}).$promise;
  }

  getTeamUsers(teamId) {
    teamId = Number(teamId);
    return this.Team.getUsers({id: teamId}).$promise
      .then((response) => {
        return response.data;
      });

  }

  inviteUser(teamId, email) {
    return this.Team
              .inviteUser({id: teamId, email: email, firstName: this.UserService.currentUser.firstName,
              lastName: this.UserService.currentUser.lastName, teamName: this.teams.selected.name})
              .$promise;
  }

  getCurrentTeam() {
    return this.domains.selected;
  }

}

export default TeamService;
