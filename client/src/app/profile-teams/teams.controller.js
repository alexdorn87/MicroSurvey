'strict';
class TeamsController {
  constructor($log, $state, TeamService, DialogService) {
    'ngInject';
    this.$log = $log;
    this.$state = $state;
    this.TeamService = TeamService;
    this.DialogService = DialogService;
    this.teamsIOwn = TeamService.teams.items || [];
    this.teamsIBelong = [];
    this.newTeam = {};
    this.activate();
  }

  activate() {
    this.TeamService.getTeams()
      .then((teams) => {
        console.log(teams);
        this.teamsIBelong = teams;
      })
  }

  createTeam() {
    this.DialogService.open({
      message: 'test',
      title: 'title?',
      cancelText: 'close',
      confirmText: 'OK!!'

    })
    .then(() => {
      this.TeamService.createTeam(this.newTeam.name)
        .then(() => { this.$state.reload(); });
    }, () => {
      this.$log.debug('dismissed');
    })
  }
}

export default TeamsController;
