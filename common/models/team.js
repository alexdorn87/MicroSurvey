var getUsers = require('../modelsLogic/team').getUsers;
var inviteUser = require('../modelsLogic/team').inviteUser;


module.exports = function (Team) {

  /**
   * Get Team users
   */
  Team.getUsers = getUsers;

  //Register Endpoint under Team model
  Team.remoteMethod(
    //method name `Team.getUsers`
    'getUsers',
    //method definition
    {
      description: 'get team users',
      accepts: {
        //Team id passed on the query
        arg: 'id',
        type: 'number',
        required: true,
        description: 'Team id to getUsers'
      },
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'get', path: '/:id/getUsers'}
    }
  );

  /**
   * Invite user to team
   */
  Team.inviteUser = inviteUser;

  //Register Endpoint under Team model
  Team.remoteMethod(
    //method name `Team.inviteUser`
    'inviteUser',
    //method definition
    {
      description: 'invite user by email to team',
      accepts: [
        {arg: 'data', type: 'object', http: {source: 'body'}},
        {
          //Team id passed on the query
          arg: 'id',
          type: 'number',
          required: true,
          description: 'Team id to getUsers'
        }
      ],
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'post', path: '/:id/inviteUser'}
    }
  );


  //Add user to its own team
  //Team.observe('after save', function filterProperties(ctx, next) {
  //  var app = Team.app;
  //  var AuthUser = app.models.AuthUser;
  //  var Account = app.models.Account;
  //  console.log('team supports isNewInstance?', ctx.isNewInstance !== undefined);
  //  if (ctx.isNewInstance) {
  //    Account.findById(ctx.instance.accountId, function (err, account) {
  //      if (err) return next(err);
  //      AuthUser.findById(account.userId, function (err, user) {
  //        if (err) return next(err);
  //        console.log(user);
  //        user.teams.add(ctx.instance, function (err, team) {
  //          if (err) return next(err);
  //          console.log('user added to team', team);
  //          console.log(team);
  //          return next();
  //        });
  //      });
  //    });
  //  } else {
  //    return next();
  //  }
  //});
};
