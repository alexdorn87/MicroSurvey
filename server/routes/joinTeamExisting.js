var app = require('../server');
var Invitation = app.models.Invitation;
var Team = app.models.Team;
var sequelize = require('../dbtest');
var AuthuserTeam = sequelize.models.authuserteam;
var AuthUser = sequelize.models.authuser;

module.exports.index = index;

function index(req, res) {
  console.log(sequelize.models);
  var uuid = req.params.id;
  var message = "";
  console.log(uuid);
  Invitation.findOne({
      where: {
        uuid: uuid
      }
    },
    function (err, invitation) {
      if (err) return res.send(404, err);

      console.log(invitation);
      if (invitation) {
        if (!invitation.processed) {
          message = "Joined a new team.";
        } else {//already used
          message = "Link has been already used.";
        }
      } else {
        //invitation doesn't exists
        message = "Invalid link.";
      }

      req.session.redirectMesasage = message;
      console.log(message);
      //handle add user to team
      if (!invitation.processed) {
        console.log(invitation);
        Invitation.updateAll({
            id: invitation.id
          },
          {processed: true},
          function (err, result) {
            console.log(err, result);
            if (err) return res.redirect('/');
            if (result.count > 0) {
              Team.findById(invitation.teamId, function (err, team) {
                if (err) return res.redirect('/');
                console.log(team);
                console.log("========== find one before");
                AuthUser.findOne({
                    where: {
                      email: invitation.email
                    }
                  })
                  .then(function (user) {
                    console.log("========== find one after");
                    console.log(user);
                    console.log("========== create one before");
                    return AuthuserTeam.create({
                      authUserId: user.id,
                      teamId: invitation.teamId
                    }).then(function (authuserteam) {
                      console.log("========== create one after");
                      console.log(authuserteam);
                      return res.redirect('/');
                    });
                  })
                .catch(function (error) {
                  console.log("error");
                  console.log(error);
                  return res.redirect('/');
                });
              });
            } else {
              return res.redirect('/');
            }
          });
      } else {
        return res.redirect('/');
      }
    });
}
