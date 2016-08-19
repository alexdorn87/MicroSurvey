var screenshot = require('node-screenshot-machine')({
  key: '526b03' // your screenshotmachine API key
});

exports.capture = capture;


function capture(req, res) {
  "use strict";
  screenshot.get({
      url: req.body.url,
      size: 'X',
      format: 'JPG'
    })
    .then(function(result) {
      // handle result
      if (result.statusCode == 200) {
        res.json({url: result.request.uri.href});
      } else {
        res.status(404).send(result);
      }
    })
    .catch(function(err) {
      // handle error
      res.status(404).send(err);
    });

}
