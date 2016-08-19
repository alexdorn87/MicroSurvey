"use strict";
module.exports.updateMinimizeCount = updateMinimizeCount;

var app = require('../server');
var SurveyMinimize = app.models.SurveyMinimize;
var Survey = app.models.Survey;


function updateMinimizeCount(req, res) {
  var id = req.params.id;
  //var Survey = app.models.Survey;
  console.log('==================================');
  console.log('xupdateMinimizeCount');
  console.log('==================================');
  Survey.findById(id, function (err, survey) {
    if (err) return res.send(404, err);
    survey.minimizeCount = survey.minimizeCount || 0;
    survey.minimizeCount += 1;

    survey.save();
    console.log('survey minize');
    //create a view record for the graph
    SurveyMinimize.create({
      surveyId: survey.id,
      domainId: survey.domainId
    }, function (err, instance) {
      if (err) return res.send(404, err);

      console.log('==================================');
      console.log('updateMinimizeCount');
      console.log('==================================');
      return res.json(true);

    });
  });
}
