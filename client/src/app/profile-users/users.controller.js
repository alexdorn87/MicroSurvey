'strict';
class UsersController {
  constructor(TeamService) {
    'ngInject';
    this.teams = TeamService.teams.items || []; //teams user created
    this.activate();
  }

  activate() {
  }
}

export default UsersController;
