/**
 * Created by Allen on 1/2/2016.
 */
var ds = app.dataSources.postgresql;
var dsResponses = app.dataSources.responses;
var models = ['AccountType', 'AuthUser', 'Domain', 'Survey', 'TrackerData'];
var models2 = ['SurveyResponse'];


describe('Test auto-updates.js...', function() {

  it('should update without errors for postgresql.', function(done) {
    ds.autoupdate(models, function(err, result) {

      assert(!err);

      ds.disconnect();
      done();
    });
  });

  it('should update without errors for mysql.', function(done) {
    dsResponses.autoupdate(models2, function(err, result) {

      assert(!err);

      dsResponses.disconnect();
      done();
    });
  });

  it('should throw error for wrong model for postgresql.', function(done) {
    ds.autoupdate('blah blah', function(err, result) {

      assert(err);

      ds.disconnect();
      done();
    });
  });

  it('should throw error for wrong model for mysql.', function() {
    dsResponses.autoupdate('blah blah', function(err, result) {

      assert(err);

      dsResponses.disconnect();
      done();
    });
  });

});

