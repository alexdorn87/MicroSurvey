module.exports = function (shipit) {
  //require('shipit-deploy')(shipit);
  var path = require('path');

  shipit.initConfig({
    default: {
      workspace: './monitor',
      deployTo: '/home/ec2-user/workspace/deploy_to',
      repositoryUrl: 'https://diegofromero@bitbucket.org/dromero89/alexio.git',
      ignores: ['.git', 'node_modules', 'bower_components'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: './alex-io.pem',
      shallowClone: true
    },
    aws: {
      servers: 'ec2-user@ec2-54-172-237-227.compute-1.amazonaws.com'
    }
  });

  shipit.task('restart:production', function () {
    return shipit.remote('cd /home/ec2-user/workspace/alexio/ && export NODE_ENV=production && export pg_prod_pass=pass4now2015! && export mysql_prod_pass=pass4now2015! && pm2 start . --watch')
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
      });
  });

  shipit.task('restart:staging', function () {
    return shipit.remote('cd /home/ec2-user/workspace/alexio/ && export NODE_ENV=staging && export pg_staging_pass=pass4now2015! && export mysql_staging_pass=pass4now2015! && pm2 start . --watch')
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
      });
  });

  shipit.blTask('build:production', function () {
    return shipit.remote('cd /home/ec2-user/workspace/alexio/ && NODE_ENV=production && gulp clean && gulp build')
  });

  shipit.blTask('build:staging', function () {
    return shipit.remote('cd /home/ec2-user/workspace/alexio/ && NODE_ENV=staging && gulp clean && gulp build')
  });

  shipit.blTask('deploy:production', function () {
    deployToServer()
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
        shipit.start('restart:production');
      })
      .catch(function (res) {
        console.log(JSON.stringify(res));
      });
  });

  shipit.blTask('deploy:staging', function () {
    deployToServer()
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
        shipit.start('restart:staging');
      });
  });

  function deployToServer() {
    // git pull on remote
    //return shipit.remote('cd /home/ec2-user/workspace/alexio/ && git stash && git pull')
    //  .then(function (res) {
    //    console.log('stdout', res[0].stdout);
    //    console.log('stderr', res[0].stderr);

    // install deps
    return shipit.remote('cd /home/ec2-user/workspace/alexio/ && git stash && git pull && npm install && gulp clean')
      //})
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
        return shipit.remoteCopy(path.join(__dirname, 'client', 'dist'), '/home/ec2-user/workspace/alexio/client');
      })
      .then(function (res) {
        console.log('stdout', res[0].stdout);
        console.log('stderr', res[0].stderr);
        // update db fields in case of changes
        return shipit.remote('cd /home/ec2-user/workspace/alexio/server node bin/02b-autoupdate.js')
      })
  }
};
