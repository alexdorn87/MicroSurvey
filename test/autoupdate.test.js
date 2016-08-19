/**
 * Created by Allen on 12/31/2015.
 * */

var dataSourcePostgresql = app.dataSources.postgresql;
var dataSourceMysql = app.dataSources.responses;


describe('Test for updating models without errors or loss of data', function() {

  it('should run update all models on postgresql without errors', function(done) {

    dataSourcePostgresql.autoupdate(function(err, result) {
      assert(!err);
      dataSourcePostgresql.disconnect();
      done();
    });

  });

  it('should run update all models on mysql without errors', function(done) {

    dataSourceMysql.autoupdate(function(err, result) {
      assert(!err);
      dataSourceMysql.disconnect();
      done();
    });

  });

  it('should report errors for autoupdate', function() {
    dataSourcePostgresql.autoupdate('Mymodel', function(err) {
      assert(err);
    });
  });

});
