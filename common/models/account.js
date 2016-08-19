module.exports = function(Account) {

  //Create a default team for a new created account.
  //Account.observe('after save', function filterProperties(ctx, next) {
  //  var app = Account.app;
  //  var Team = app.models.Team;
  //  console.log('account supports isNewInstance?', ctx.isNewInstance !== undefined);
  //  if (ctx.isNewInstance) {
  //    Team.create({
  //      accountId: ctx.instance.id,
  //      name: 'Default team'
  //    }, function(err, team) {
  //      if (err) return next(err);
  //      console.log('default team created', team);
  //      return next();
  //    });
  //  } else {
  //    return next();
  //  }
  //});

};
