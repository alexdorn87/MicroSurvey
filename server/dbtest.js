var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:legolas@localhost:5433/alexiodb');

var Team = sequelize.define('team', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  accountId: {
    type: Sequelize.INTEGER,
    field: 'accountid'
  }
}, {
  freezeTableName: true,
  // I don't want createdAt
  createdAt: false,
  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
});


var AuthUser = sequelize.define('authuser', {
  superUser: {
    type: Sequelize.BOOLEAN,
    field: 'superuser'
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'firstname'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'lastname'
  },
  phone: {
    type: Sequelize.STRING,
    field: 'phone'
  },
  active: {
    type: Sequelize.BOOLEAN,
    field: 'active',
    defaultValue: true
  },
  notifications: {
    type: Sequelize.JSON,
    field: 'notifications'
  },
  realm: {
    type: Sequelize.STRING,
    field: 'realm'
  },
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  credentials: {
    type: Sequelize.JSON,
    field: 'credentials'
  },
  challenges: {
    type: Sequelize.JSON,
    field: 'challenges'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    field: 'emailverified',
    defaultValue: true
  },
  verificationToken: {
    type: Sequelize.STRING,
    field: 'verificationtoken'
  },
  status: {
    type: Sequelize.STRING,
    field: 'status'
  },
  created: {
    type: Sequelize.DATE,
    field: 'created'
  },
  lastUpdated: {
    type: Sequelize.DATE,
    field: 'lastupdated'
  },
  accountTypeId: {
    type: Sequelize.INTEGER,
    field: 'accounttypeid'
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'teamid'
  }
}, {
  freezeTableName: true,
  // I don't want createdAt
  createdAt: false,
  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
});

var AuthuserTeam = sequelize.define('authuserteam', {
  authUserId: {
    type: Sequelize.INTEGER,
    field: 'authuserid'
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'teamid'
  }
}, {
  freezeTableName: true,
  // I don't want createdAt
  createdAt: false,
  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
});

module.exports = sequelize;
