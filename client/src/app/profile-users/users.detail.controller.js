'strict';
class UsersDetailController {
  constructor($stateParams, TeamService, Team, DialogService, UserService) {
    'ngInject';

    console.log(Team);
    this.$stateParams = $stateParams;
    this.TeamService = TeamService;
    this.UserService = UserService;
    this.DialogService = DialogService;
    this.activate($stateParams);
    this.users = [];
  }

  activate($stateParams) {
    console.log($stateParams);
    this.TeamService.getTeamUsers($stateParams.teamId)
      .then((users) => {
        console.log(users);
        this.users = users;
      });
  }

  inviteUser() {

    if(this.UserService.currentUser.email === this.email){

      this.DialogService.open({
        showCancel: false,
        confirmText: "Ok",
        message: "Can't invite yourself to the team."
      })

    }else{
      this.TeamService.inviteUser(this.$stateParams.teamId, this.email)
        .then((data) => {
          console.log(data);
          this.DialogService.open({
            showCancel: false,
            confirmText: "Ok",
            message: "Invitation has been sent"
          })
        });
    }


  }
}

export default UsersDetailController;
